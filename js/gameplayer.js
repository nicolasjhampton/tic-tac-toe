var Game = (function($, window, document) {
  'use strict';


  /**
   * Constructor function
   *
   *
   * @implements @properties: turn
   *                          board
   *             @methods: calcPosition
   *                       checkWin
   *                       move
   *
   */
  function Game() {

  }

  /**
   * Set Cartridge for game initialization
   *
   * @param Cartridge class object
   *
   * @returns Game object
   *
   */
  Game.prototype.setCartridge = function(Cartridge) {
    this.Cartridge = Cartridge;
    this.currentGame = new this.Cartridge();
    return this;
  };

   /**
    * Set Display for game initialization
    *
    * @param View class object
    *
    * @returns Game object
    *
    */
   Game.prototype.setDisplay = function(Display) {
     this.Display = Display;
     this.view = new this.Display();
     return this;
   };

  /**
   * The start button for the game player
   *
   * @returns Game object
   *
   */
  Game.prototype.start = function() {
    this.view.resetDisplay();
    this.setSplashScreen(true)
        .setBoard();

    return this;
  };


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
      this.currentGame.turn = !this.currentGame.turn;
      this.view.setPlayerDisplay();
    } else {
      this.setSplashScreen(continueGame);
    }
  };


  /**
   * Highlights the correct player
   *
   * @param state: Boolean - true = "begin", false = "end", null = "draw"
   *
   * @returns Game object
   *
   */
  Game.prototype.setSplashScreen = function(state) {
    var that = this;

    $('#' + this.view.host.board.id)
      .after(this.view.createSplash(state, this.currentGame.turn));

    if(state) {
      $('.' + this.view.host.button.class).click(function(e){
        $('#start').remove();
      });
    } else {
      $('.' + this.view.host.button.class).click(function(e) {
        that.currentGame = new that.Cartridge();
        that.start();
      });
    }
    return this;
  };


  /**
   * Sets the event listeners for the game board
   *
   * @returns Game object
   *
   */
  Game.prototype.setBoard = function() {
    var that = this;
    $('.' + this.view.host.space.class).each(function(index) {
      var coord = that.currentGame.calcPosition(index);
      $(this).click(function() {
        that.clickSpace(this, coord);
      });
      $(this).hover(function() {
        that.view.setHoverOver(this, that.currentGame.turn);
      });
    });
    return this;
  };

  return Game;

})(jQuery, window, document);
