let citybikes = {};

citybikes.googleMapsKey = "AIzaSyCrXerr7xHcFxr4OW7EmOdDnNBaHgLzXIQ";

citybikes.init = function(){
	// citybikes.getBikeNetworks();
	citybikes.getUserLocation();
}

citybikes.getUserLocation = function(res) {
	$('#searchForm').submit(function(event){
		event.preventDefault();
		//userInput = "Toronto";
		citybikes.userInputBike = $('#getBike').val();
		citybikes.userInputCafe = $('#getCafe').val();
		// console.log(citybikes.userInputBike, citybikes.userInputCafe);
		citybikes.bikeLocation = $.ajax({
			url: 'http://proxy.hackeryou.com',
			method: 'GET',
			dataType: 'json',
			data: {
				reqUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
				params: {
					key: citybikes.googleMapsKey,
					address: citybikes.userInputBike
				}
			}
		})
		citybikes.cafeLocation = $.ajax({
			url: 'http://proxy.hackeryou.com',
			method: 'GET',
			dataType: 'json',
			data: {
				reqUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
				params: {
					key: citybikes.googleMapsKey,
					address: citybikes.userInputCafe
				}
			}
		})

		$.when(citybikes.bikeLocation,citybikes.cafeLocation)
		.then(function(bikedata,cafedata){
			// console.log("DATAS",bikedata, cafedata)
			// console.log("CITY?",bikedata[0].results[0].address_components[3].long_name)

			console.log("DATAS",bikedata, cafedata)
			console.log("CITY [3]?",bikedata[0].results[0].address_components[3].long_name)
			console.log("CITY [4]???",bikedata[0].results[0].address_components[4].long_name)

			// Get City Name
			citybikes.cityName1 = (bikedata[0].results[0].address_components[3].long_name).toLowerCase();
			citybikes.cityName1B = (bikedata[0].results[0].address_components[4].long_name).toLowerCase();

			// Get Bike
			citybikes.bikeLat = bikedata[0].results[0].geometry.location.lat;
			citybikes.bikeLng = bikedata[0].results[0].geometry.location.lng;
			// Get Cafe
			citybikes.cafeLat = cafedata[0].results[0].geometry.location.lat;
			citybikes.cafeLng = cafedata[0].results[0].geometry.location.lng;
			// citybikes.cityName2 = (cafedata[0].results[0].address_components[3].long_name).toLowerCase();
			// citybikes.cityName2B = (cafedata[0].results[0].address_components[4].long_name).toLowerCase();
			citybikes.cafeString = [citybikes.cafeLat, citybikes.cafeLng].toString();
			// citybikes.cafeString = (citybikes.cafeLat + "," + citybikes.cafeLng);
			console.log("Coffee String", citybikes.cafeString);
			
			citybikes.getBikeNetworksStations(citybikes.cityName1);
			citybikes.getBikeNetworksStations(citybikes.cityName1B);
			citybikes.getCoffeeShops();
			// citybikes.getCafesNearby(citybikes.cityName2);
			// citybikes.getCafesNearby(citybikes.cityName2);
			// citybikes.getCoffeeShops(citybikes.cityName1);
			// citybikes.getCafeCity = [citybikes.cafeLat, cafe.Lng];
			// citybikes.getCafeCityJSON = JSON.stringify(arr);

			//map thing
			// console.log("WORKS???",citybikes.bikeLat, citybikes.bikeLng,"|",citybikes.cafeLat, citybikes.cafeLng);
			// citybikes.getBikeNetworks(citybikes.bikeLat,citybikes.bikeLng);



			// console.log("WORKS???",citybikes.bikeLat, citybikes.bikeLng,"|",citybikes.cafeLat, citybikes.cafeLng);
			// citybikes.getBikeNetworks(citybikes.bikeLat,citybikes.bikeLng, citybikes.cityName);
		});
		// 
	});	
};
// This checks the citybikes API, puts in the city name argument from our google location request as the endpoint
citybikes.getBikeNetworksStations = function(city){
	console.log("CITY IS:",city)
	var bikeNetworksStations = $.ajax({
		url:`http://api.citybik.es/v2/networks/${city}`,
		// url:`http://api.citybik.es/v2/networks/toronto`,
		method:'GET',
		dataType: 'json',
		data:{
		}
	});
	$.when(bikeNetworksStations).done(function(result){
		console.log("RESULT",result);
		citybikes.bikeStations = result.network.stations; //latitude and longitude are accessible from this point
		console.log(citybikes.bikeStations);
		initMap();
	})
};

citybikes.getCoffeeShops = function(coffee) {
	citybikes.getCoffeeLocations = $.ajax({
		url: 'http://proxy.hackeryou.com',
		method: 'GET',
		dataType: 'json',
		data: {
			reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
			params: {
				key: 'AIzaSyB0nAY9VpAN-y391bAkKEaVLiNEFUay0nw',
				location: citybikes.cafeString,
				// location: '43.6425662,-79.3870568',
				radius: 500,
				type: 'cafe'
			}
		}
	}).then(function(coffeeShops){
		console.log("coffee",coffeeShops)
	});
};

var map;
function initMap() {
    // console.log('initmap');
    citybikes.myLatLong = {lat: citybikes.bikeLat, lng: citybikes.bikeLng};
    citybikes.cafeLatLong = {lat: citybikes.cafeLat, lng: citybikes.cafeLng};
	// Two Maps Attempt
	//Bike Map
	var twoZoom =16;

    // Cafe Map
    mapCafe = new google.maps.Map(document.getElementById('mapCafe'), {
	    center: citybikes.cafeLatLong,
	    zoom: twoZoom
	});
    var markerTwo = new google.maps.Marker({
	    position: citybikes.cafeLatLong,
	    map: mapCafe,
	    title: citybikes.userInputCafe,
	    icon: 'icons/coffeeMarker.svg'
    });
	// Bike Map
	mapBike = new google.maps.Map(document.getElementById('mapBike'), {
	    center: citybikes.myLatLong,
	    zoom: twoZoom
	});
	console.log(citybikes.bikeStations);
    var markerOne = new google.maps.Marker({
	    position: citybikes.myLatLong,
	    map: mapBike,
	    title: citybikes.userInputBike,
	    // icon: 'icons/bikeMarker.svg'
    })
	// For each bike station, place a marker
	citybikes.bikeStations.forEach(function(item){
		console.log("ITEM:", item);
	    var marker = new google.maps.Marker({	
	        position: {
	        	lat:item.latitude,
	        	lng:item.longitude
	        },
	        map: mapBike,
	        title: item.name,
	        icon: 'icons/bikeMarker.svg'

	    });
	});
};

$(function(){
	citybikes.init();
});



