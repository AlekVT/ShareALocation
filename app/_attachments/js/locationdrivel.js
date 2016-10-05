function getLocation(closure) {
	cleanMap();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(closure);
    } else { 
        alert('Geolocation is not supported by this browser.');
    }
}

function toArray(position){
	return [position.coords.latitude, position.coords.longitude];
}

function currentLocation(position){
	map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude),9); 
	addMarker([position.coords.latitude, position.coords.longitude], null, "U bent hier");
}

function logLocation(aLocation){
	var sName = $('#studentname').val();
	
	if (sName == null || sName == '' || sName == ' '){
		alert('U moet uw naam ingeven');
		return;
	}
	
	var oData = {
			'person' : sName,
			'location' : aLocation
	}
	
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5984/sharealocation',
		data: JSON.stringify(oData),
		error: function(){ alert('things went wrong')},
		success: function(){ console.log('things apparently went right')},
		contentType: 'application/json'
	});
	
	map.setView(new L.LatLng(aLocation[0], aLocation[1]),9);
}

function getAllLocations(){
	cleanMap();
	
	$.getJSON(
		'http://127.0.0.1:5984/sharealocation/_design/all/_view/view_all',
		function (data) {
			var aData = data['rows'];
			var length = aData.length;
			for (var i = 0; i < length; i++) {
				setPosition(aData[i].value);
			}
		}
	);
	
	console.log('show all locations.');
}

function setPosition(aData){
	var name = aData['person'];
	var location = aData['location'];
	if (typeof(location[0]) !== 'undefined' && location) {
		addMarker([location[0], location[1]], name);
	}
}

function addMarker(position, name = null, message = null){
	var marker = L.marker(position).addTo(map);
	if (message !== null){
		marker.bindPopup(message).openPopup();
	} else if (name !== null){
		marker.bindPopup("<b>" + name + "</b><br>was hier.").openPopup();
	}
}