var T3view = (function($, window, document) {

    function T3view() {

    }

    /**
     * Sets the hover event for our visual game spaces
     *
     * @param space: DOM element - represents a space on the game board
     *        turn: Boolean - true = Player1, false = Player2
     *
     */
    T3view.prototype.setHoverOver = function(space, turn) {
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
    T3view.prototype.markSpace = function(space, turn) {
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
    T3view.prototype.createSplash = function(state, turn) {
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
    T3view.prototype.setPlayerDisplay = function() {
      $('.players').toggleClass('active');
    }


    /**
     * Helper Function
     * Clears game display of all moves and splash screens
     *
     */
    T3view.prototype.resetDisplay = function() {
      $('.box').off();
      $('.screen').remove();
      $('.players').removeClass('active');
      $('#player2').addClass('active');
      $('.box').removeClass('box-over-1');
      $('.box').removeClass('box-over-2');
      $('.box-filled-1').removeClass('box-filled-1');
      $('.box-filled-2').removeClass('box-filled-2');
    }

    return T3view;

})(jQuery, window, document);
