var Game = (function($, window, document) {
  'use strict';


  /**
   * Constructor function
   *
   * @param Cartridge: constructor function for a game model
   *
   * @implements @properties: turn
   *                          board
   *             @methods: calcPosition
   *                       checkWin
   *                       move
   *
   */
  function Game(Cartridge, View) {
    this.Cartridge = Cartridge;
    this.currentGame = new Cartridge();
    this.view = new View();
  }


  /**
   * The start button for the game player
   *
   * @returns Game object
   *
   */
  Game.prototype.start = function() {
    this.view.resetDisplay();
    this.setSplashScreen("begin")
        .setBoard();

    return this;
  }


  /**
   * The click event for our game spaces
   *
   * @param space: DOM element - represents a space on the game board
   *
   */
  Game.prototype.clickSpace = function(space, coord) {
    var continueGame = this.currentGame.move(coord.x, coord.y);
    if(continueGame) {
      this.view.markSpace(space, this.currentGame.turn);
    } else if (!continueGame) {
      continueGame == null ? this.setSplashScreen("draw") : this.setSplashScreen("end");
    }
    this.currentGame.turn = !this.currentGame.turn;
    this.view.setPlayerDisplay();
  }


  /**
   * Highlights the correct player
   *
   * @param state: String - "begin", "end", or "draw"
   *
   * @returns Game object
   *
   */
  Game.prototype.setSplashScreen = function(state) {
    var that = this;

    $('#board').after(this.view.createSplash(state, this.currentGame.turn));

    if(state == "begin") {
      $('.button').click(function(e){
        $('#start').remove();
      });
    } else {
      $('.button').click(function(e) {
        that.currentGame = new that.Cartridge();
        that.start();
      });
    }
    return this;
  }


  /**
   * Sets the event listeners for the game board
   *
   * @returns Game object
   *
   */
  Game.prototype.setBoard = function() {
    var that = this;
    $('.box').each(function(index) {
      var coord = that.currentGame.calcPosition(index);
      $(this).click(function() {
        that.clickSpace(this, coord);
      });
      $(this).hover(function() {
        that.view.setHoverOver(this, that.currentGame.turn);
      });
    });
    return this;
  }

  return Game;

})(jQuery, window, document);
