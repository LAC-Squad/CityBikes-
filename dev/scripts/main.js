


//generates today's date //
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
   dd='0'+dd
}

if(mm<10) {
   mm='0'+mm
}

today = yyyy+mm+dd;
console.log(today);
let citybikes = {};
// citybikes.client_ID = "HNQJUKZ0TNYSMRZ2N2CNAUZZFQFDJVIBBB0BZ3RG2XAJD43G;"
// citybikes.client_secret = "HZKPB3D5EANIS5PHQK5ZYLRQFDVE04CQ5KBSUZTK5UCT3JH2";
// citybikes.version = 20170307;
// citybikes.url = "https://api.foursquare.com/v2/venues/explore"

citybikes.googleMapsKey = "AIzaSyCrXerr7xHcFxr4OW7EmOdDnNBaHgLzXIQ";

citybikes.init = function(){
	citybikes.getBikeNetworks();
	citybikes.getUserLocation();
}

citybikes.getUserLocation = function(res) {
	$('#searchForm').submit(function(event){
		event.preventDefault();
		//userInput = "Toronto";
		citybikes.userInput = $('#getBike').val();
		console.log(citybikes.userInput);
		citybikes.userLocation = $.ajax({
			url: 'http://proxy.hackeryou.com',
			method: 'GET',
			dataType: 'json',
			data: {
				reqUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
				params: {
					key: citybikes.googleMapsKey,
					address: citybikes.userInput
				}
			}
		}).then(function(data){
			// citybikes.getUserLocation(data);
			console.log(data);
			citybikes.bikeLat = data.results[0].geometry.location.lat;
			citybikes.bikeLng = data.results[0].geometry.location.lng;
			// console.log(data);
			console.log(citybikes.bikeLat, citybikes.bikeLng);
			citybikes.getBikeNetworks();
		});
	});	
};

citybikes.getBikeNetworks = function(){
	var bikeNetworks = $.ajax({
		url:'http://api.citybik.es/v2/networks',
		method:'GET',
		dataType: 'json',
		data:{
		}
	});
	$.when(bikeNetworks).done(function(data){
	console.log(data);
	// data.filter()
	})
};

citybikes.getCoffeeShops = function (getCoffeeShops) {
	return $.ajax({
		url: 'https://api.foursquare.com/v2/venues/explore',
		method: 'GET',
		dataType: 'json',
		data: {
			ll: '43.6,-79.3978587',
			v: 20170307,
			client_id: 'HNQJUKZ0TNYSMRZ2N2CNAUZZFQFDJVIBBB0BZ3RG2XAJD43G',
			client_secret: 'HZKPB3D5EANIS5PHQK5ZYLRQFDVE04CQ5KBSUZTK5UCT3JH2',
			section: 'coffee'
		}
	});
};

var coffeeShops = citybikes.getCoffeeShops();


$.when(coffeeShops).done(function(res){
console.log(res);
})









$(function(){
	citybikes.init();
});

}

