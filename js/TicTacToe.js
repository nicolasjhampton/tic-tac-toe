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
 *        coordinates: Integers - either (x) or (y, x)
 *
 * @returns boolean: Is the player in the space?
 *
 */
var testSpace = function(player, board, coordinates) {
  if(arguments.length == 3) {
    return (arguments[0] == arguments[1][arguments[2]]);
  } else {
    return (arguments[0] == arguments[1][arguments[2]][arguments[3]]);
  }
}


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
  var horizontal = (that.board.every(function(yRow) {
    return (yRow.includes(-playerMark) || yRow.includes(0));
  }));

  // returns true if no win found
  var vertical = that.board.every(function(current, index, self) {
    return !(self.every(function(current2, index2, self2) {
      return testSpace(playerMark, self2, index2, index); // (self2[index2][index] == playerMark);
    }));
  });

  // returns true if no win found
  var diagonal1 = !(that.board.every(function(current, index, self) {
    return testSpace(playerMark, current, index); //(current[index] == playerMark);
  }));

  // returns true if no win found
  var diagonal2 = !(that.board.every(function(current, index, self) {
    var xedni = current.length - index - 1;
    return testSpace(playerMark, current, xedni); //(current[xedni] == playerMark);
  }));

  noWin = (horizontal && vertical && diagonal1 && diagonal2);

  if (noWin) {

    var draw = that.board.every(function(current, index) {
      return (current.indexOf(0) == -1);
    });

    noWin = draw ? null : noWin;
  }

  return noWin;
}


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
}


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
 }

 return TicTacToe;

 })();
