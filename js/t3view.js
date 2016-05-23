var T3view = (function($, window, document) {
  'use strict';
  
    var defaultSettings = {
      "space": {
        "class": "box" },
      "hover": "-over-",
      "marked": "-filled-",
      "board": {
        "id": "board" },
      "begin": {
        "id": "start",
        "class": "screen-start"},
      "end": {
        "id": "finish"},
      "win": {
        "message": "Winner",
        "class": "screen-win-" },
      "draw": {
        "message": "It's a tie!",
        "class": "draw" },
      "message" : {
        "startTag": "<p class='message'>",
        "endTag": "</p>" },
      "button": {
        "class": "button",
        "start": "Start game",
        "new": "New game",
        "startTag": "<a href='#' class='button'>",
        "endTag": "</a>" },
      "splash": {
        "container": "div",
        "textbox": "header",
        "class": "screen" },
      "title": {
        "element": "h1",
        "text": "Tic Tac Toe" },
      "players": {
        "class": "players",
        "ids": [
          "#player1",
          "#player2"
        ]
      }
    };

    /**
     * Helper function for current player class suffix
     *
     * @param turn: Boolean - true = Player1, false = Player2
     *
     *
     *
     */
    var getPlayer = function(turn) {
      return turn ? 1 : 2;
    };


    function T3view(config) {
      if(!config) { config = {}; }
      this.host = $.extend({}, defaultSettings, config);
    }


    /**
     * Factory method for beginning and ending splash screens
     *
     * @param state: Boolean - true = "begin", false = "end", null = "draw"
     *        turn: Boolean - true = Player1, false = Player 2
     *
     * @returns DOM element
     *
     */
    T3view.prototype.createSplash = function(state, turn) {

      var winOrTie = state === null ? this.host.draw.message : this.host.win.message;

      var player = state === null ? this.host.draw.class : getPlayer(turn);
      var className = state ? this.host.begin.class : this.host.win.class + player;
      var id = state ? this.host.begin.id : this.host.end.id;
      var message = state ? "" : this.host.message.startTag + winOrTie + this.host.message.endTag;
      var button = state ? this.host.button.start : this.host.button.new;

      var splash = $('<' + this.host.splash.container + '></'+ this.host.splash.container + '>')
                    .attr({"class": this.host.splash.class + " " + className, "id": id})
                    .html('<' + this.host.splash.textbox + '></'+ this.host.splash.textbox + '>');
      splash.children(this.host.splash.textbox)
            .append('<' + this.host.title.element + '>' +
                          this.host.title.text +
                    '</' + this.host.title.element + '>')
            .append(message)
            .append(this.host.button.startTag + button + this.host.button.endTag);

      return splash;
    };


    /**
     * Sets the hover event for our visual game spaces
     *
     * @param space: DOM element - represents a space on the game board
     *        turn: Boolean - true = Player1, false = Player2
     *
     */
    T3view.prototype.setHoverOver = function(space, turn) {
      var player = getPlayer(turn);
      $(space).toggleClass(this.host.space.class + this.host.hover + player);
    };


    /**
     * Visually marks the game space on the DOM
     *
     * @param space: DOM element - represents a space on the game board
     *        turn: Boolean - true = Player1, false = Player2
     *
     */
    T3view.prototype.markSpace = function(space, turn) {
      var player = getPlayer(turn);
      $(space).off();
      $(space).addClass(this.host.space.class + this.host.marked + player);
    };


    /**
     * Highlights the correct player on display
     *
     */
    T3view.prototype.setPlayerDisplay = function() {
      $('.' + this.host.players.class).toggleClass('active');
    };


    /**
     * Clears game display of all moves and splash screens
     *
     */
    T3view.prototype.resetDisplay = function() {
      $('.' + this.host.space.class).off();
      $('.' + this.host.splash.class).remove();
      $('.' + this.host.players.class).removeClass('active');
      $(this.host.players.ids[0]).addClass('active');
      $('.' + this.host.space.class)
        .removeClass(this.host.space.class + this.host.hover + getPlayer(true));
      $('.' + this.host.space.class)
        .removeClass(this.host.space.class + this.host.hover + getPlayer(false));
      $('.' + this.host.space.class) // + this.host.marked + getPlayer(true))
        .removeClass(this.host.space.class + this.host.marked + getPlayer(true));
      $('.' + this.host.space.class) // + this.host.marked + getPlayer(false))
        .removeClass(this.host.space.class + this.host.marked + getPlayer(false));
    };

    return T3view;

})(jQuery, window, document);
