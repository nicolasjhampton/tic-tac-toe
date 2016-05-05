

// Test cases
// [
//   [1, 1, 1],
//   [0, 0, 0],
//   [0, 0, 0]
// ];
//
// [
//   [1, 0, 0],
//   [0, 1, 0],
//   [0, 0, 1]
// ];
//
// [
//   [1, 0, 0],
//   [1, 0, 0],
//   [1, 0, 0]
// ];

// this.board[0].includes(1) === -1
// this.board[1].includes(1) === -1
// this.board[2].includes(1) === -1
// this.board[0][0] === this.board[1][0] === this.board[2][0] === playerMark
// this.board[0][1] === this.board[1][1] === this.board[2][1] === playerMark
// this.board[0][2] === this.board[1][2] === this.board[2][2] === playerMark

// // check diagonal wins
// if(that.board[0][0] == playerMark &&
//    that.board[1][1] == playerMark &&
//    that.board[2][2] == playerMark) {
//   win = true;
// };
//
// if(that.board[2][0] == playerMark &&
//    that.board[1][1] == playerMark &&
//    that.board[0][2] == playerMark) {
//   win = true
// }
//
// console.log({
//   "name": "horizontal",
//   "index": index,
//   "outcome": (yRow.includes(-playerMark)),
//   "yRow": yRow,
//   "playerMark": playerMark
// });
//
// console.log({
//   "name": "vertical",
//   "index": index,
//   "outcome": (self[index] == playerMark &&
//      that.board[1][index] == playerMark &&
//      that.board[2][index] == playerMark),
//   "first": self[index],
//   "second": that.board[1][index],
//   "third": that.board[2][index],
//   "mark": playerMark,
//   "this": that
// });
//
// console.log({
//   "name": "diagonal 1",
//   "outcome": (that.board[0][0] == playerMark &&
//               that.board[1][1] == playerMark &&
//               that.board[2][2] == playerMark),
//   "first": that.board[0][0],
//   "second": that.board[1][1],
//   "third": that.board[2][2],
//   "mark": playerMark,
//   "this": that
// });
//
// console.log({
//   "name": "diagonal 2",
//   "outcome": (that.board[2][0] == playerMark &&
//               that.board[1][1] == playerMark &&
//               that.board[0][2] == playerMark),
//   "first": that.board[2][0],
//   "second": that.board[1][1],
//   "third": that.board[0][2],
//   "mark": playerMark,
//   "this": that
// });

function TicTacToe(starter) {
  // (0,0) | (1,0) | (2,0)
  // (0,1) | (1,1) | (2,1)
  // (0,2) | (1,2) | (2,2)
  this.turn = starter;
  this.board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
}

TicTacToe.prototype.checkWin = function() {
  var playerMark = this.turn ? 1 : -1;
  var win = false;
  this.board.map(function(yRow, index) { // check horizontal wins
    if (!yRow.includes(-playerMark) && !yRow.includes(0)) { // If none of opponents marks are present
      win = true;
      return false; // mark a win and break the map
    }
  });

  // Check vertical wins
  var that = this;
  this.board[0].map(function(throwAway, index, self){
    if(self[index] == playerMark &&
       that.board[1][index] == playerMark &&
       that.board[2][index] == playerMark) {
      win = true;
      return false;// mark a win and break the map
    }
  });

  var diagonal1 = true;
  for(var index = 0; index < that.board.length; index++) {
    diagonal1 = (that.board[index][index] == playerMark && diagonal1);
  }

  var diagonal2 = true;
  for(var index = 0; index < that.board.length; index++) {
    var xedni = that.board.length - index - 1;
    diagonal2 = (that.board[index][xedni] == playerMark && diagonal2);
  }

  if (diagonal1 || diagonal2) {
    win = true;
  }

  return win;
}

TicTacToe.prototype.mark = function(x, y) {
  // X = -1 = false, O = 1 = true
  this.board[y][x] = this.turn ? 1 : -1;
  this.turn = !this.turn;
  return this.turn;
}
