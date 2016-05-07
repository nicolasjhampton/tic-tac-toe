var Game = (function($, Cartridge) {
  'use strict';

  /**
   * Helper Function
   * Clears game display of all moves and splash screens
   *
   */
  function resetDisplay() {
    $('.box').off();
    $('.screen').remove();
    $('.box').removeClass('box-over-1');
    $('.box').removeClass('box-over-2');
    $('.box-filled-1').removeClass('box-filled-1');
    $('.box-filled-2').removeClass('box-filled-2');
  }

  function setPlayerDisplay(game) {
    var startingPlayer = game.currentGame.turn ? "#player1" : "#player2";
    $('.players').removeClass('active');
    $(startingPlayer).addClass('active');
  }

  Game.prototype.setSplashScreen = function(state) {
    var that = this;

    resetDisplay();

    $('#board').after(that.createSplash(state));

    if(state == "begin") {

      $('.button').click(function(e){
        $('#start').remove();
      });

    } else {

      $('.button').click(function(e) {
        that.currentGame = new Cartridge();
        that.start();
      });

    }
  }



  function Game(Cartridge) {
    this.currentGame = new Cartridge();
  }

  Game.prototype.start = function() {
    var that = this;
    setPlayerDisplay(this);
    this.setSplashScreen("begin");
    this.setBoard(this);
  }

  Game.prototype.setBoard = function(game) {
    var that = this;

    $('.box').each(function(index) {

      var coord = that.currentGame.calcPosition(index);

      $(this).click(function() {
        that.clickSpace(this, coord);
      });

      $(this).hover(function() {
        that.setHoverOver(this);
      });
    });
  }

  Game.prototype.markSpace = function(box) {
    var markClass = this.currentGame.turn ? "box-filled-2" : "box-filled-1";
    $(box).off();
    $(box).addClass(markClass);
  }

  Game.prototype.clickSpace = function(space, coord) {
    var continueGame = this.currentGame.move(coord.x, coord.y);
    if(continueGame) {
      this.markSpace(space);
    } else if (!continueGame) {
      continueGame == null ? this.setSplashScreen("draw") : this.setSplashScreen("end");
    }
    this.currentGame.turn = !this.currentGame.turn;
    $('.players').toggleClass('active');
  }

  /**
   * Sets the hover event for our visual game spaces
   *
   * @param DOM element that represents a space on the game board
   *
   */
  Game.prototype.setHoverOver = function(space) {
    var player = this.currentGame.turn ? "2" : "1";
    $(space).toggleClass('box-over-' + player);
  }

  Game.prototype.createSplash = function(state) {

    var player;
    var winOrTie;
    if(state == "draw") {
      player = state;
      winOrTie = "It's a tie!";
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
