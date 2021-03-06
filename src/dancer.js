// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps) {
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');

  this.step();

  this.timeBetweenSteps = timeBetweenSteps;
  this.top = top;
  this.left = left;
  this.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.movesArr = [];
  this.setPosition(top, left);
  this.specialMove();
  this.myMoves();
};

makeDancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var step = this.step.bind(this);
  setTimeout(step, this.timeBetweenSteps);
};

makeDancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

makeDancer.prototype.electricSlide = function() {
  this.$node.addClass('electricSlide');
  this.movesArr.push('electricSlide');
};

makeDancer.prototype.sway = function() {
  this.$node.addClass('sway');
  this.movesArr.push('sway');
};

makeDancer.prototype.twirl = function() {
  this.$node.addClass('twirl');
  this.movesArr.push('twirl');
};

//couple dance animation
makeDancer.prototype.couple = function() {
  this.$node.addClass('couple');
  this.movesArr.push('couple');
};

// Unique move for the dancer
makeDancer.prototype.specialMove = function() {
};

// List of moves the dancer will perform
makeDancer.prototype.myMoves = function() {

};

// Remove the current moves applied to the dancer's class from the dancer
makeDancer.prototype.removeMoves = function() {
  var that = this;
  this.movesArr.forEach(function(item, index) {
    that.$node.removeClass(item);
  });
  this.movesArr = [];
};

// Line up dancer to the same position on the dance floor
makeDancer.prototype.lineUp = function(newTopPosition, newLeftPosition) {
  //
};

// animates partner to move to current dancer and set animation for dancing together
makeDancer.prototype.getPartner = function(partner) {
  var newTopPosition = this.$node.position().top + 'px'; 
  var newLeftPosition = this.$node.position().left + 50 + 'px';
  var oldPosition = partner.$node.position();
  //call animate on partner with current dancer's dancer with offset to right
  partner.$node.animate({
    top: newTopPosition,
    left: newLeftPosition
  });
  //remove moves 
  this.removeMoves();
  partner.removeMoves();
  //add partner moves 
  this.couple();
  partner.couple();

  //after 5 seconds of couple dancing, partner returns to old position
  //both resume old moves
  var that = this;
  setTimeout(function() {
    partner.$node.animate({
      top: oldPosition.top + 'px',
      left: oldPosition.left + 'px'
    });
    //remove couple moves and return to old moves
    that.removeMoves();
    that.myMoves();
    partner.removeMoves();
    partner.myMoves();
  }, 5000);
};
