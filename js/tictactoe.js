var TicTacToe = (function() {
'use strict';

function TicTacToe() {
  this.turn = true;
  this.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
}


/**
 * Tests a space for the presence of a player
 *
 * @param player: Integer - either 1 = O or -1 = X
 *        board: Array - either one or two dimensional square array
 *        coordinates: Integers - (y, x)
 *
 * @returns boolean: Is the player in the space?
 *
 */
var testSpace = function(player, board, y, x) {
  return player == board[y][x];
};


/**
 * Recursively tests a line that runs across arrays for a win
 *
 * @param board: Array - either one or two dimensional square array
 *        player: Integer - either 1 = O or -1 = X
 *        y and x: Integers - starting y and x coordinates
 *        ystep: Integer - direction of movement
 *               (1 = positive, -1 = negative, 0 = stationary)
 *
 * @returns boolean: true = win, false = noWin
 *
 */
var testLine = function(board, player, y, yStep, x, xStep) {
  return (board.length > y + 1) ?
    testSpace(player, board, y, x) && testLine(board, player, y + yStep, yStep, x + xStep, xStep) :
    testSpace(player, board, y, x);
};


/**
 * Tests the game for win status
 *
 * @returns boolean: Does the game continue? Returns
 *                   false for a win. Null is draw.
 *
 */
TicTacToe.prototype.checkWin = function() {
  var that = this;
  var noWin = true;
  var playerMark = that.turn ? 1 : -1;

  // returns true if no win found
  var horizontal = that.board.every(function(current) {
    return (current.includes(-playerMark) || current.includes(0));
  });

  // returns true if no win found
  var vertical = that.board.every(function(current, index, self) {
    return !testLine(self, playerMark, 0, 1, index, 0);
  });

  // returns true if no win found
  var diagonal1 = !testLine(that.board, playerMark, 0, 1, 0, 1);

  // returns true if no win found
  var diagonal2 = !testLine(that.board, playerMark, 0, 1, that.board.length - 1, -1);

  // returns true if there's a draw
  var draw = that.board.every(function(current, index) {
    return (!current.includes(0));
  });

  noWin = draw ? null : (horizontal && vertical && diagonal1 && diagonal2);

  return noWin;
};


/**
 * Makes a game move
 *
 * @param  x: Integer - X coordinate in grid system
 *         y: Integer - Y coordinate in grid system
 *
 * @returns Boolean: Is another move allowed?
 *          False returned for win, null for a draw
 *
 */
TicTacToe.prototype.move = function(x, y) {
  // X = -1 = false, O = 1 = true
  this.board[y][x] = this.turn ? 1 : -1;
  return this.checkWin();
};


/**
 * Translates the DOM element's index in the jquery array
 * into a coordinate position in the game logic
 *
 * @param Integer index of jquery's spaces array
 *
 * @returns coordinate object { x, y }
 *
 */
 TicTacToe.prototype.calcPosition = function(index) {
   var x = index % this.board.length;
   var y = Math.floor(index / this.board.length);
   return { "x": x, "y": y };
 };

 return TicTacToe;

 })();
