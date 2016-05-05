// <div class="screen screen-start" id="start">
//   <header>
//     <h1>Tic Tac Toe</h1>
//     <a href="#" class="button">Start game</a>
//   </header>
// </div>
//
// <div class="screen screen-win" id="finish">
//   <header>
//     <h1>Tic Tac Toe</h1>
//     <p class="message">Winner</p>
//     <a href="#" class="button">New game</a>
//   </header>
// </div>
//
// style="background: green url(img/x.svg) no-repeat center; background-size: 25%;"

var Game = (function($) {
  'use strict';

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
    var that = this;
    var win = false;
    var playerMark = that.turn ? 1 : -1;

    that.board.map(function(yRow, index) { // check horizontal wins
      if (!yRow.includes(-playerMark) && !yRow.includes(0)) { // If none of opponents marks are present
        win = true;
        return false; // mark a win and break the map
      }
    });

    that.board[0].map(function(throwAway, index, self) { // Check vertical wins
      if(self[index] == playerMark &&
         that.board[1][index] == playerMark &&
         that.board[2][index] == playerMark) {
        win = true;
        return false; // mark a win and break the map
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
    console.log(x);
    console.log(y);
    console.log(this);
    this.board[y][x] = this.turn ? 1 : -1;
    if(this.checkWin()) {
      console.log('Win: ' + this.turn);
      return true;
    } else {
      console.log("It's player " + !this.turn + " turn!");
      return false;
    }
  }

  function createSplash(truthy) {
    var className;
    var id;
    var message;
    var button;
    if(truthy) {
      className = "screen-start";
      id = "start";
      message = "";
      button = "Start game";
    } else {
      className = "screen-win";
      id = "finish";
      message = "<p class='message'>Winner</p>";
      button = "New game";
    }
    // var classes = ;
    var splash = $('<div></div>').attr({"class": "screen " + className, "id": id})
                                 .html('<header></header>');
    splash.children('header')
          .append('<h1>Tic Tac Toe</h1>')
          .append(message)
          .append('<a href="#" class="button">' + button + '</a>');

    return splash;
  }

  function Game() {
    this.currentGame = new TicTacToe(false);
  }

  Game.prototype.start = function() {
    var that = this;
    var startingPlayer = that.currentGame.turn ? "#player1" : "#player2";
    $(startingPlayer).addClass('active');
    $('#board').after(createSplash(true));
    $('.button').click(function(e){
      e.preventDefault();
      $('#start').remove();
    });
    $('.box').each(function(index) {
      var x = index % 3;
      var y = Math.floor(index / 3);
      $(this).click(function() {
        var markBoxClass = that.currentGame.turn ? "box-filled-2" : "box-filled-1";
        var win = that.currentGame.mark(x,y);
        $(this).addClass(markBoxClass);
        $(this).off();
        if(win) {
          $('.box').off();
          $('#board').after(createSplash(false));
          var winner = that.currentGame.turn ? "owin.svg" : "xwin.svg";
          var color = that.currentGame.turn ? "#FFA000" : "#3688C3";
          $('#finish').css({"background": color + " url(img/" + winner + ") no-repeat center 50%"})
          $('#finish .button').click(function(e) {
            e.preventDefault();
            $('.box-filled-1').removeClass('box-filled-1');
            $('.box-filled-2').removeClass('box-filled-2');
            $('#finish').remove();
            var game = new Game();
            game.start();
          })
        } else {
          that.currentGame.turn = !that.currentGame.turn;
          $('.players').toggleClass('active');
        }
      });
    });
  }

  return Game;

})(jQuery);
