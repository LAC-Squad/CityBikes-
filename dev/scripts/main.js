


//generates today's date //
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();

if(dd<10) {
   dd='0'+dd
}

if(mm<10) {
   mm='0'+mm
}

today = yyyy+mm+dd;
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

// This checks the citybikes API, puts in the city name argument from our google location request as the endpoint
citybikes.getBikeNetworksStations = function(city){
	console.log("CITY IS:",city)
	var bikeNetworksStations = $.ajax({
		// url:`http://api.citybik.es/v2/networks/${city}`,
		url:`http://api.citybik.es/v2/networks/toronto`,
		method:'GET',
		dataType: 'json',
		data:{
		}
	});
	$.when(bikeNetworksStations).done(function(result){
		console.log("RESULT",result);
	})
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
			citybikes.cityName1 = (bikedata[0].results[0].address_components[3].long_name);
			console.log("DATAS",bikedata, cafedata)
			console.log("CITY [3]?",bikedata[0].results[0].address_components[3].long_name)
			console.log("CITY [4]???",bikedata[0].results[0].address_components[4].long_name)


			// Get Bikes
			citybikes.bikeLat = bikedata[0].results[0].geometry.location.lat;
			citybikes.bikeLng = bikedata[0].results[0].geometry.location.lng;
			// Get City Name
			citybikes.cityName = bikedata[0].results[0].address_components[4].long_name;

			// Get Cafe
			citybikes.cafeLat = cafedata[0].results[0].geometry.location.lat;
			citybikes.cafeLng = cafedata[0].results[0].geometry.location.lng;

			citybikes.getBikeNetworksStations(citybikes.cityName1);

			//map thing
			// console.log("WORKS???",citybikes.bikeLat, citybikes.bikeLng,"|",citybikes.cafeLat, citybikes.cafeLng);
			// citybikes.getBikeNetworks(citybikes.bikeLat,citybikes.bikeLng);
			initMap();
			initDM();


			// console.log("WORKS???",citybikes.bikeLat, citybikes.bikeLng,"|",citybikes.cafeLat, citybikes.cafeLng);
			// citybikes.getBikeNetworks(citybikes.bikeLat,citybikes.bikeLng, citybikes.cityName);
		});
		// 
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

		// citybikes.cityName1 = bikedata[0].results[0].address_components[4].long_name;

		citybikes.bikeStations = data.networks;
		citybikes.stationLng = citybikes.bikeStations[0].location.longitude;
		citybikes.stationLat = citybikes.bikeStations[0].location.latitude;
		// console.log("bike stations", citybikes.bikeStations);

	})
};

citybikes.getCoffeeShops = function (lat,lng) {
	return $.ajax({
		url: 'https://api.foursquare.com/v2/venues/explore',
		method: 'GET',
		dataType: 'json',
		data: {
			ll: lat, lng,
			v: 20170310,
			client_id: 'HNQJUKZ0TNYSMRZ2N2CNAUZZFQFDJVIBBB0BZ3RG2XAJD43G',
			client_secret: 'HZKPB3D5EANIS5PHQK5ZYLRQFDVE04CQ5KBSUZTK5UCT3JH2',
			section: 'coffee'
		}
	});
};

citybikes.coffeeShops = citybikes.getCoffeeShops();


$.when(citybikes.coffeeShops).done(function(res){
// console.log("This is happening", res);
})

// citybikes.coffeeShops.response.groups["0"].items["0"].venue.location.lat
// citybikes.coffeeShops.response.groups["0"].items["0"].venue.location.lng

// .response.suggestedRadius

var map;
function initMap() {
    // console.log('initmap');
    citybikes.myLatLong = {lat: citybikes.bikeLat, lng: citybikes.bikeLng};
    citybikes.cafeLatLong = {lat: citybikes.cafeLat, lng: citybikes.cafeLng};

 //    var centerLat = (citybikes.bikeLat - (citybikes.bikeLat % citybikes.cafeLat));
 //    var centerLong = (citybikes.bikeLng - (citybikes.bikeLng % citybikes.cafeLng));
 //    var centerLatLong = {lat: centerLat, lng: centerLong};
 //    console.log("Hello", centerLat, centerLong);
 //    console.log("HELLOOOO", centerLatLong);
 //    map = new google.maps.Map(document.getElementById('map'), {
	//     center: centerLatLong,
	//     zoom: 14
	// });
 //    var marker = new google.maps.Marker({
 //        position: myLatLong,
 //        map: map,
 //        title: citybikes.userInputBike
 //    });
	// Two Maps Attempt
	//Bike Map
	var twoZoom = 18;
	mapBike = new google.maps.Map(document.getElementById('mapBike'), {
	    center: citybikes.myLatLong,
	    zoom: twoZoom
	});
	// console.log(citybikes.bikeStations);
	    var markerOne = new google.maps.Marker({
		    position: citybikes.myLatLong,
		    map: mapBike,
		    title: citybikes.userInputBike,
		    icon: 'icons/bikeMarker.svg'
	    })
	
	citybikes.bikeStations.forEach(function(item){

		// console.log("????", item);
	    var marker = new google.maps.Marker({
	    	
	        position: {
	        	lat:item.location.latitude,
	        	lng:item.location.longitude
	        },
	        map: mapBike,
	        title: citybikes.userInputBike,
	        icon: 'icons/bikeMarker.svg'
	    });
	});

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
    })


};



// DISTANCE MATRIX
// function initDM() {
//        var bounds = new google.maps.LatLngBounds;
//        var markersArray = [];

//        var origin1 = citybikes.myLatLong;
//        var origin2 = citybikes.cafeLatLong;
//        var destinationA = citybikes.bikeStations;
//        var destinationB = [];

//        var destinationIcon = 'https://chart.googleapis.com/chart?' +
//            'chst=d_map_pin_letter&chld=D|FF0000|000000';
//        var originIcon = 'https://chart.googleapis.com/chart?' +
//            'chst=d_map_pin_letter&chld=O|FFFF00|000000';
//        var map = new google.maps.Map(document.getElementById('map'), {
//          center: {lat: 55.53, lng: 9.4},
//          zoom: 10
//        });
//        var geocoder = new google.maps.Geocoder;

//        var service = new google.maps.DistanceMatrixService;
//        service.getDistanceMatrix({
//          origins: [origin1, origin2],
//          destinations: [destinationA, destinationB],
//          travelMode: 'DRIVING',
//          unitSystem: google.maps.UnitSystem.METRIC,
//          avoidHighways: false,
//          avoidTolls: false
//        }, function(response, status) {
//          if (status !== 'OK') {
//            alert('Error was: ' + status);
//          } else {
//            var originList = response.originAddresses;
//            var destinationList = response.destinationAddresses;
//            var outputDiv = document.getElementById('output');
//            outputDiv.innerHTML = '';
//            deleteMarkers(markersArray);

//            var showGeocodedAddressOnMap = function(asDestination) {
//              var icon = asDestination ? destinationIcon : originIcon;
//              return function(results, status) {
//                if (status === 'OK') {
//                  map.fitBounds(bounds.extend(results[0].geometry.location));
//                  markersArray.push(new google.maps.Marker({
//                    map: mapBike,
//                    position: results[0].geometry.location,
//                    icon: icon
//                  }));
//                } else {
//                  alert('Geocode was not successful due to: ' + status);
//                }
//              };
//            };

//            for (var i = 0; i < originList.length; i++) {
//              var results = response.rows[i].elements;
//              geocoder.geocode({'address': originList[i]},
//                  showGeocodedAddressOnMap(false));
//              for (var j = 0; j < results.length; j++) {
//                geocoder.geocode({'address': destinationList[j]},
//                    showGeocodedAddressOnMap(true));
//                outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
//                    ': ' + results[j].distance.text + ' in ' +
//                    results[j].duration.text + '<br>';
//              }
//            }
//          }
//        });
//      }

//      function deleteMarkers(markersArray) {
//        for (var i = 0; i < markersArray.length; i++) {
//          markersArray[i].setMap(null);
//        }
//        markersArray = [];
//      }



$(function(){
	citybikes.init();
});



