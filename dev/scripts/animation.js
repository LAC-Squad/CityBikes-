

    $('#begin').click(function () {
    $('#legend #start').slideToggle({
      direction: "down"
    }, 100);
    $(this).toggleClass('clientsClose');
  });




$('.tweetMe').on('click', function(){

  var customMessage = "New to town? Visiting? Rent a bike and find a local coffee shop at http://www.bikesandbean.website %23crushedit";
  window.open("http://twitter.com/intent/tweet?text=" + customMessage, "twitterwindow", "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");

  console.log(customMessage);
});



// $('#share).click( function() 
// {
//     var shareurl = $(this).data('shareurl');
//     window.open('https://www.facebook.com/sharer/sharer.php?u='+escape(shareurl)+'&t='+document.title, '', 
//     'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
//     return false;
// });