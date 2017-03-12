

    $('#begin').click(function () {
    $('#legend #start').slideToggle({
      direction: "down"
    }, 100);
    $(this).toggleClass('clientsClose');
  }); // end click

//  $(function(){
// //Functions to get random coordinates for background icons
//   getRandomArray = function(array){
//     var randomArrayItem = Math.floor(Math.random() * array.length);
//     return array[randomArrayItem];
//   }

//   function randomNumber (n) {
//       return Math.floor(Math.random() * n);
//     };

//   function randomStyle(element){
//     var cssOne = randomNumber(100);
//     var cssTwo = randomNumber(100);
//     var styles = {left: cssOne + "%", top: cssTwo + "%"};
     
//      element.css(styles);
      
    

//   };

//   var divImageArray = $('.background > div.imgContain');

// divImageArray.each(function(){
//   randomStyle($(this));

// });
//  });

// $(function() {
//   var moveLeft = 20;
//   var moveDown = 10;

//   $('#trigger').hover(function(e) {
//     $('#pop-up').show();
//       .css('top', e.pageY + moveDown)
//       .css('left', e.pageX + moveLeft)
//       .appendTo('body');
//   }, function() {
//     $('#pop-up').hide();
//   });

//   $('#trigger').mousemove(function(e) {
//     $("div#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
//   });

// });
// //  $('#legend').on('click', function(){
//   // var poseName = $('.poseTitle').text(); //we could put variable info in here
//   // var benefitName = $('.benefits').text();
//   var customMessage = "Want to explore a city, and discover some local cafés? Check out Cruisin'!";
//   window.open("Instructions");
// });

// $("#go").val('');

// //function for background animations

// function getRandomInt (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// $.fn.randomOrder = function(animate) {
//   this.each(function() {
//     var image = $(this);
//     var fadeSpeed = 100;
    
//     // Viewport Dimensions
//     var vpHeight = $('imgWrapper').height();
//     var vpWidth = $('imgWrapper').width();
    
//     // Image Position
//     var xPos = getRandomInt(0, vpWidth - image.width());
//     var yPos = getRandomInt(0, vpHeight - image.height());
//     var zIndex = getRandomInt(0,13);
    
//     // Animation Duration
//     if(fadeIn) var dur = 500;
//     else var dur = 0;
    
//     image.animate{left: xPos, top: yPos, 'z-index': zIndex}, dur);
    
//   });
//   });

// };


    



// //Setup
// $('img').randomOrder(false);
// $('img').draggable({stack: "img"});

// // Change after 10 Seconds
// window.setInterval(function(){
//   $('img').randomOrder(true);
// },10000);

// //
// //fade in 
// }
//function for background animations

// function getRandomInt (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// $.fn.randomOrder = function(animate) {
//   this.each(function() {
//     var image = $(this);
   
    
//     // Viewport Dimensions
//     var vpHeight = $('imgWrapper').height();
//     var vpWidth = $('imgWrapper').width();
    
//     // Image Position
//     var xPos = getRandomInt(0, vpWidth - image.width());
//     var yPos = getRandomInt(0, vpHeight - image.height());
//     var zIndex = getRandomInt(0,13);
    
//     // Animation Duration
//     if(animate) var dur = 500;
//     else var dur = 0;


//   image.animate({left: xPos, top: yPos, 'z-index': zIndex}, dur);
//   });
// };

// //Setup
// $('img').randomOrder(false);
// $('img').draggable({stack: "img"});

// // Change after 10 Seconds
// window.setInterval(function(){
//   $('img').randomOrder(true);
// }, 10000);

