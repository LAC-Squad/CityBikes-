//function for background animations

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$.fn.randomOrder = function(animate) {
  this.each(function() {
    var image = $(this);
    var fadeSpeed = 100;
    
    // Viewport Dimensions
    var vpHeight = $('imgWrapper').height();
    var vpWidth = $('imgWrapper').width();
    
    // Image Position
    var xPos = getRandomInt(0, vpWidth - image.width());
    var yPos = getRandomInt(0, vpHeight - image.height());
    var zIndex = getRandomInt(0,13);
    
    // Animation Duration
    if(fadeIn) var dur = 500;
    else var dur = 0;
    
    image.animate{left: xPos, top: yPos, 'z-index': zIndex}, dur);
    image.animate({left: xPos, top: yPos, 'z-index': zIndex}, dur);
  });
  });

};
$('img').fadeIn(600, function() {


    



//Setup
$('img').randomOrder(false);
$('img').draggable({stack: "img"});

// Change after 10 Seconds
window.setInterval(function(){
  $('img').randomOrder(true);
},10000);

//
//fade in 
}

