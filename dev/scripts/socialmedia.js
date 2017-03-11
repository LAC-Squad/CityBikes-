$('.tweetMe').on('click', function(){
	// var poseName = $('.poseTitle').text(); //we could put variable info in here
	// var benefitName = $('.benefits').text();
	var customMessage = "Want to explore a city, and discover some local cafés? Check out Cruisin'!";
	window.open("http://twitter.com/intent/tweet?text=" + customMessage, "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");
});

$( document ).ready(function(){

   $( ".socialMediaIcons ul a" ).hover(
     function() {
       $( this ).addClass( "fa-spin" );
     }, function() {
       $( this ).removeClass( "fa-spin" );
     }
  );

})
