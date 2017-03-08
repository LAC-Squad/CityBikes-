let citybikes = {};
// citybikes.client_ID = "HNQJUKZ0TNYSMRZ2N2CNAUZZFQFDJVIBBB0BZ3RG2XAJD43G;"
// citybikes.client_secret = "HZKPB3D5EANIS5PHQK5ZYLRQFDVE04CQ5KBSUZTK5UCT3JH2";
// citybikes.version = 20170307;
// citybikes.url = "https://api.foursquare.com/v2/venues/explore"
citybikes.init = function(){
	citybikes.getBikeNetworks();
}

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
// $.when(coffeeShops).done(function(data){
	
// 	})
// };











$(function(){
	citybikes.init();
});
