let citybikes = {};

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





$(function(){
	citybikes.init();
});
