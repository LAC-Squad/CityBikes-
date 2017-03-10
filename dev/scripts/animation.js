

// function citybikes(){
  
// citybikes.setBackground = () => { // Used to randomly generate images in the background
//     let numberofImages = 5;
//       citybikes.backgroundImageArray = ["assets/bean.png", "assets/bike.png", "assets/coffeesleeve.png", "assets/happycup.png", "assets/pin.png"]

//     const maxWindowWidth = (Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) - 140; // Calculates max window width to put images in
//     const maxWindowHeight = (Math.max(document.documentElement.clientHeight, window.innerHeight || 0))-140; // Calculates max window height to put images in
    

//     for(let i = 0; i <= numberofImages; i++) { // runs a loop to randomly generate 5 images into the background
//         let randomPositionX = Math.floor((Math.random() * maxWindowWidth) + 1);
//         let randomPositionY = Math.floor((Math.random() * maxWindowHeight) + 1);
//         let randomImage = Math.floor((Math.random() * 151) + 1);
//         let randomImageSize = Math.floor((Math.random() * 120) + 100);

//         $("backgroundImages").append(`<img src="${backgroundImageArray}.png" class="images" "image${i}">`);
//         $(`.image${i}`).height(randomImageSize).width(randomImageSize).css("position","fixed").css("top",randomPositionY).css("left",randomPositionX).css("z-index",-100);

//     } 
//   }  //End of for loop
// };



function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$.fn.randomOrder = function(animate) {
  this.each(function() {
    var image = $(this);
    
    // Viewport Dimensions
    var vpHeight = $(window).height();
    var vpWidth = $(window).width();
    
    // Image Position
    var xPos = getRandomInt(0, vpWidth - image.width());
    var yPos = getRandomInt(0, vpHeight - image.height());
    var zIndex = getRandomInt(0,13);
    
    // Animation Duration
    if(animate) var dur = 500;
    else var dur = 0;
    
    image.animate({left: xPos, top: yPos, 'z-index': zIndex}, dur);
  });
};

//Setup
$('img').randomOrder(false);
$('img').draggable({stack: "img"});

// Change after 10 Seconds
window.setInterval(function(){
  $('img').randomOrder(true);
},10000);


