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

    if (!win) {
      var draw = true;
      for(var index = 0; index < that.board.length; index++) {
        draw = (that.board[index].indexOf(0) == -1 && draw);
      }

      if(draw) { win = null; }
    }

    return win;
  }

  TicTacToe.prototype.mark = function(x, y) {
    // X = -1 = false, O = 1 = true
    this.board[y][x] = this.turn ? 1 : -1;
    return this.checkWin();
  }

  function setPlayerDisplay() {
    var startingPlayer = this.currentGame.turn ? "#player1" : "#player2";
    $('.players').removeClass('active');
    $(startingPlayer).addClass('active');
  }

  function setSplashScreen(thisGame, state) {

    //var winnerClass = thisGame.currentGame.turn ? "screen-win-one" : "screen-win-two";
    $('.box').off();
    $('.screen').remove();
    $('#board').after(thisGame.createSplash(state));

    if(state == "begin") {

      $('.button').click(function(e){
        e.preventDefault();
        $('#start').remove();
      });

    } else {

      $('.button').click(function(e) {
        e.preventDefault();
        var game = new Game();
        game.start();
      });

    }
  }

  function clickSpace(game, space, x, y) {
    var win = game.currentGame.mark(x,y);
    console.log(win); // win can be null for a draw, needs functionality
    win ? setSplashScreen(game, "end") : game.markDisplayBox(space);
    if(win == null) { setSplashScreen(game, "draw"); }
    game.currentGame.turn = !game.currentGame.turn;
    $('.players').toggleClass('active');
  }

  function setBoard(game) {

    // Clear
    $('.box-filled-1').removeClass('box-filled-1');
    $('.box-filled-2').removeClass('box-filled-2');
    $('#finish').remove();

    // set
    $('.box').each(function(index) {
      var x = index % game.currentGame.board.length;
      var y = Math.floor(index / game.currentGame.board.length);
      $(this).click(function() {
        clickSpace(game, this, x, y);
      });
    });

  }

  function Game() {
    this.currentGame = new TicTacToe(false);
  }

  Game.prototype.start = function() {
    var that = this;
    setPlayerDisplay.call(this, true);
    setSplashScreen(this, "begin");
    setBoard(this);
  }

  Game.prototype.markDisplayBox = function(box) {
    var markClass = this.currentGame.turn ? "box-filled-2" : "box-filled-1";
    $(box).off();
    $(box).addClass(markClass);
  }

  Game.prototype.createSplash = function(state) {

    var player;
    var winOrTie;
    if(state == "draw") {
      player = state;
      winOrTie = "Draw";
    } else {
      player = this.currentGame.turn ? "one" : "two";
      winOrTie = "Winner";
    }

    var className = (state == "begin") ? "screen-start" : "screen-win-" + player;
    var id = (state == "begin") ? "start" : "finish";
    var message = (state == "begin") ? "" : "<p class='message'>" + winOrTie + "</p>";
    var button = (state == "begin") ? "Start game" : "New game";

    var splash = $('<div></div>').attr({"class": "screen " + className, "id": id})
                                 .html('<header></header>');
    splash.children('header')
          .append('<h1>Tic Tac Toe</h1>')
          .append(message)
          .append('<a href="#" class="button">' + button + '</a>');

    return splash;
  }

  return Game;

})(jQuery);
