var TicTacToe = (function() {
'use strict';

function TicTacToe() {
  this.turn = false;
  this.isComputer = true;
  this.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
}

/**
 * Sets opposite player as either a human or the computer
 *
 * @param {boolean} player either true = O or false = X
 */
TicTacToe.prototype.setOpponent = function(isComputer) {
  this.isComputer = isComputer;
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
  var horizontal = this.board.map((current, index, self) => {
    return getLineSum(this.board, index, 0, 0, 1);
  });

  // [sum, sum, sum]
  var vertical = this.board.map((current, index, self) => {
    return getLineSum(this.board, 0, 1, index, 0);
  });

  // returns single sum
  var diagonal1 = getLineSum(this.board, 0, 1, 0, 1);

  // returns single sum
  var diagonal2 = getLineSum(this.board, 0, 1, this.board.length - 1, -1);

  // [ hori1sum, hori2sum, hori3sum, vert1sum, vert2sum, vert3sum, dia1sum, dia2sum ]
  return horizontal.concat(vertical).concat(diagonal1).concat(diagonal2);
}


var getGoodMoves = function(checksumArray, best) {
  // find the best moves at this level of standards
  var goodMoves = checksumArray.map((sum, index) => [sum, index])
                               .filter(current => Math.abs(current[0]) == best);
  // If nothing looks like a good move, lower our standards
  if(goodMoves.length == 0 && best !== 0) {
    return getGoodMoves(checksumArray, best - 1);
  }

  // first priority : winning moves
  // second priority: blocking moves
  // third priority: meaningless moves
  if(Math.max(...goodMoves.map(item => item[0])) > 0) {
    // winning moves
    return goodMoves.filter(item => item[0] > 0);
  } else if (Math.max(...goodMoves.map(item => item[0])) < 0) {
    // blocking moves
    return goodMoves.filter(item => item[0] < 0);
  }
  // meaningless moves
  return goodMoves;
}

/**
 * Recursively gets the coordinates for a line
 * @example return [[y, x]] joins [[y, x]] joins [[y, x]];
 *
 * @param {Array} board either one or two dimensional square array
 * @param {Integer} x starting x coordinate
 * @param {Integer} xstep direction of movement (1 = positive, -1 = negative, 0 = stationary)
 * @param {Integer} y starting x coordinate
 * @param {Integer} ystep direction of movement (1 = positive, -1 = negative, 0 = stationary)
 * @returns {Array} CoordArray an array of all the coordinates in a line
 */
var getLineCoord = function(board, y, yStep, x, xStep) {
  var yEnd = (yStep !== 0) ?  (board.length > y + yStep) : true;
  var xEnd = (xStep !== 0) ?  (board.length > x + xStep) : true;
  return (yEnd && xEnd) ?
    [[y, x]].concat(getLineCoord(board, y + yStep, yStep, x + xStep, xStep)) :
    [[y, x]];
}

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
var getLineSum = function(board, y, yStep, x, xStep) {
  var yEnd = (yStep !== 0) ?  (board.length > y + yStep) : true;
  var xEnd = (xStep !== 0) ?  (board.length > x + xStep) : true;
  return (yEnd && xEnd) ?
    getSpace(board, y, x) + getLineSum(board, y + yStep, yStep, x + xStep, xStep) :
    getSpace(board, y, x);
}

// Make moves as O's
TicTacToe.prototype.getComputerMove = function() {
  // constants
  var ARRAY_MAX_INDEX = this.board.length - 1;
  var LINE_COUNT = (this.board.length * 2) + 2; // number of possible win scenrios
  var MODULO = (LINE_COUNT - 2) / 2; // splits the verticals from the horizontals

  // Always take center square if available
  // if(ARRAY_MAX_INDEX % 2 == 0 &&
  //   getSpace(this.board, ARRAY_MAX_INDEX / 2, ARRAY_MAX_INDEX / 2) == 0) {
  //     return [ARRAY_MAX_INDEX / 2, ARRAY_MAX_INDEX / 2];
  // }

  // Getting the line number we're going to move in
  var checksumArray = this.getSums(); // complete checksum array of all possible lines
  var goodMoves = getGoodMoves(checksumArray, ARRAY_MAX_INDEX); // Gets the best possible moves
  console.log(goodMoves);
  // var randomMove = Math.floor(Math.random() * goodMoves.length); // chooses a random best move

  for(var index = 0; index < goodMoves.length; index++) {
    var lineNumber = goodMoves[index][1]; // gets the line that best move is on

    // Getting the coordinate array for the line
    var line; // 7 and 8 - diagonals | 1 - 6 horizontals and verticals
    if(lineNumber == LINE_COUNT - 1) {
      line = getLineCoord(this.board, 0, 1, ARRAY_MAX_INDEX, -1); // dia2sum
    } else if (lineNumber == LINE_COUNT - 2) {
      line = getLineCoord(this.board, 0, 1, 0, 1); // dia1sum
    } else {
      var offset = lineNumber % MODULO; // offset for vert and hori lines
      if(lineNumber >= MODULO) {
        line = getLineCoord(this.board, 0, 1, offset, 0); // verticals
      } else {
        line = getLineCoord(this.board, offset, 0, 0, 1); // horizontals
      }
    }

    // return the coordinates of the first empty space in line
    var move = line.find(coord => getSpace(this.board, coord[0], coord[1]) == 0);
    console.log(move);

    if(move && getSpace(this.board, move[0], move[1]) == 0) {
      return move;
    }
  }

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
  // console.log([y, x], this.board[y][x]);
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
