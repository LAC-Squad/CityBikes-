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

			// Get City Name
			citybikes.cityName1 = (bikedata[0].results[0].address_components[3].long_name).toLowerCase();
			citybikes.cityName1B = (bikedata[0].results[0].address_components[4].long_name).toLowerCase();

			// Get Bike
			citybikes.bikeLat = bikedata[0].results[0].geometry.location.lat;
			citybikes.bikeLng = bikedata[0].results[0].geometry.location.lng;
			// Get Cafe
			citybikes.cafeLat = cafedata[0].results[0].geometry.location.lat;
			citybikes.cafeLng = cafedata[0].results[0].geometry.location.lng;

			// turn cafe lat and long into a string for google places ajax call
			citybikes.cafeString = [citybikes.cafeLat, citybikes.cafeLng].toString();

			//Filter then pass filter into argument
			citybikes.findBikes(citybikes.cityName1);
			citybikes.findBikes(citybikes.cityName1B);

			// display coffee shops
			citybikes.getCoffeeShops();
		});
	});	
};

//filter citybikes api, get href based on google city info || CREDITS TO BIKE BUDS!
citybikes.findBikes = function(cityName) {
    $.ajax({
        url: 'http://api.citybik.es/v2/networks',
        dataType: 'JSON',
        method: 'GET',
    }).then(function(thisCity){
        var thisArray = thisCity.networks;
        for(var i = 0; i < thisArray.length; i++){
            //if the location has a state or province..
            if(thisArray[i].location.city.indexOf(',') > -1){
                //cut off the comma and get the first part 
                var finalCityName = (thisArray[i].location.city.split(',')[0]).toLowerCase();
                //condition statement, if these match we grab the href, else, this app won't work
                //maybe add, no bikes nearby?               
                if(citybikes.cityName1 === finalCityName || citybikes.cityName1B === finalCityName){
                    cityHref = thisArray[i].href;
                    citybikes.getBikeNetworksStations(cityHref)
                }
            }
        }
    });
}

// This checks the citybikes API, puts in the city name argument from our google location request as the endpoint
citybikes.getBikeNetworksStations = function(city){
	var bikeNetworksStations = $.ajax({
		url:`http://api.citybik.es/${city}`,
		// url example:`http://api.citybik.es/v2/networks/toronto`,
		method:'GET',
		dataType: 'json',
		data:{
		}
	});
	$.when(bikeNetworksStations).done(function(result){
		citybikes.bikeStations = result.network.stations; //latitude and longitude are accessible from this point
		citybikes.initMap();
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
				// example location: '43.6425662,-79.3870568',
				radius: 500,
				type: 'cafe'
			}
		}
	}).then(function(coffeeShops){
		citybikes.cafeLocations = coffeeShops.results;
	});
};

citybikes.initMap = function() {
	var map;
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
	    // icon: 'icons/coffeeMarker.svg'
    });
    // for each cafe, place a marker
    citybikes.cafeLocations.forEach(function(item){
        var marker = new google.maps.Marker({	
            position: {
            	lat:item.geometry.location.lat,
            	lng:item.geometry.location.lng
            },
            map: mapCafe,
            title: item.name,
            icon:'icons/coffeeMarker.svg'
        });
    });
	// Bike Map
	mapBike = new google.maps.Map(document.getElementById('mapBike'), {
	    center: citybikes.myLatLong,
	    zoom: twoZoom
	});
    var markerOne = new google.maps.Marker({
	    position: citybikes.myLatLong,
	    map: mapBike,
	    title: citybikes.userInputBike,
	    // icon: 'icons/bikeMarker.svg'
    })
	// For each bike station, place a marker
	citybikes.bikeStations.forEach(function(item){
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



