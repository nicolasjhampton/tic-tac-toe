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
  function Game(Cartridge) {
    this.currentGame = new Cartridge();
    this.Cartridge = Cartridge;
  }


  /**
   * The start button for the game player
   *
   * @returns Game object
   *
   */
  Game.prototype.start = function() {
    resetDisplay();
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
      markSpace(space, this.currentGame.turn);
    } else if (!continueGame) {
      continueGame == null ? this.setSplashScreen("draw") : this.setSplashScreen("end");
    }
    this.currentGame.turn = !this.currentGame.turn;
    setPlayerDisplay();
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

    $('#board').after(createSplash(state, this.currentGame.turn));

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
        setHoverOver(this, that.currentGame.turn);
      });
    });
    return this;
  }

  /**
   * Sets the hover event for our visual game spaces
   *
   * @param space: DOM element - represents a space on the game board
   *        turn: Boolean - true = Player1, false = Player2
   *
   */
  var setHoverOver = function(space, turn) {
    var player = turn ? "2" : "1";
    $(space).toggleClass('box-over-' + player);
  }


  /**
   * Visually marks the game space on the DOM
   *
   * @param space: DOM element - represents a space on the game board
   *        turn: Boolean - true = Player1, false = Player2
   *
   */
  var markSpace = function(space, turn) {
    var markClass = turn ? "box-filled-2" : "box-filled-1";
    $(space).off();
    $(space).addClass(markClass);
  }


  /**
   * Factory method for beginning and ending splash screens
   *
   * @param state: String - "begin", "end", or "draw"
   *        turn: Boolean - true = Player1, false = Player 2
   *
   * @returns DOM element
   *
   */
  var createSplash = function(state, turn) {
    var winOrTie = state == "draw" ? "It's a tie!" : "Winner";
    var player = turn ? "one" : "two";
    if(state == "draw") { player = "draw"; }

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


  /**
   * Highlights the correct player on display
   *
   */
  var setPlayerDisplay = function() {
    $('.players').toggleClass('active');
  }


  /**
   * Helper Function
   * Clears game display of all moves and splash screens
   *
   */
  function resetDisplay() {
    $('.box').off();
    $('.screen').remove();
    var startingPlayer = "#player2";
    $('.players').removeClass('active');
    $(startingPlayer).addClass('active');
    $('.box').removeClass('box-over-1');
    $('.box').removeClass('box-over-2');
    $('.box-filled-1').removeClass('box-filled-1');
    $('.box-filled-2').removeClass('box-filled-2');
  }

  return Game;

})(jQuery, window, document);
