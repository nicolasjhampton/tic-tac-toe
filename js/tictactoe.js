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
 * @param {Integer} player either 1 = O or -1 = X
 * @param {Array} board either one or two dimensional square array
 * @param {Integer} y y coordinate (y, x)
 * @param {Integer} x x coordinate (y, x)
 * @returns {boolean} hasWon Is the player in the space?
 */
var getSpace = function(board, y, x) {
  return board[y][x];
};

/**
 * Tests a space for the presence of a player
 *
 * @param {Integer} player either 1 = O or -1 = X
 * @param {Array} board either one or two dimensional square array
 * @param {Integer} y y coordinate (y, x)
 * @param {Integer} x x coordinate (y, x)
 * @returns {boolean} hasWon Is the player in the space?
 */
var testSpace = function(player, board, y, x) {
  return player == getSpace(board, y, x);
};


/**
 * Recursively adds a line that runs across arrays for a checksum
 * Basically, we're lining up each getSpace call in a line of sumation getSpace
 *
 * @example return getSpace(first) + getSpace(second) + getSpace(third);
 *
 * @param {Array} board either one or two dimensional square array
 * @param {Integer} x starting x coordinate
 * @param {Integer} xstep direction of movement (1 = positive, -1 = negative, 0 = stationary)
 * @param {Integer} y starting x coordinate
 * @param {Integer} ystep direction of movement (1 = positive, -1 = negative, 0 = stationary)
 * @returns {boolean} isWon true = win, false = noWin
 */
var getLine = function(board, y, yStep, x, xStep) {
  return (board.length > y + 1) ?
    getSpace(board, y, x) + getLine(board, y + yStep, yStep, x + xStep, xStep) :
    getSpace(board, y, x);
}


/**
 * Recursively tests a line that runs across arrays for a win
 * Basically, we're lining up each testSpace call in a line of boolean testSpace
 *
 * @example return testSpace(first) && testSpace(second) && testSpace(third);
 *
 * @param {Array} board either one or two dimensional square array
 * @param {Integer} player 1 = O or -1 = X
 * @param {Integer} x starting x coordinate
 * @param {Integer} xstep direction of movement (1 = positive, -1 = negative, 0 = stationary)
 * @param {Integer} y starting x coordinate
 * @param {Integer} ystep direction of movement (1 = positive, -1 = negative, 0 = stationary)
 * @returns {boolean} isWon true = win, false = noWin
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
 * @returns {Boolean} hasWon Does the game continue? Null is draw.
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
 * Gets the checksum array for a minimax calculation
 *
 * @returns {Array} checksumArray Does the game continue? Null is draw.
 */
TicTacToe.prototype.getSums = function() {

  // [sum, sum, sum]
  var horizontal = this.board.map(function(current, index, self) {
    return getLine(self, index, 0, 0, 1);
  });

  // [sum, sum, sum]
  var vertical = this.board.map(function(current, index, self) {
    return getLine(self, 0, 1, index, 0);
  });

  // returns single sum
  var diagonal1 = getLine(this.board, 0, 1, 0, 1);

  // returns single sum
  var diagonal2 = getLine(this.board, 0, 1, this.board.length - 1, -1);

  return horizontal.concat(vertical).concat(diagonal1).concat(diagonal2);
}


/**
 * Makes a game move
 *
 * @param {Integer} x X coordinate in grid system
 * @param {Integer} y Y coordinate in grid system
 *
 * @returns {Boolean} isWon Is another move allowed? null for a draw
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
 * @param {Integer} Integer index of jquery's spaces array
 *
 * @returns {Object} coordinate object { x, y }
 *
 */
 TicTacToe.prototype.calcPosition = function(index) {
   var x = index % this.board.length;
   var y = Math.floor(index / this.board.length);
   return { "x": x, "y": y };
 };

 return TicTacToe;

 })();
