function getLocation(closure) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(closure);
    } else { 
        alert('Geolocation is not supported by this browser.');
    }
}

function toArray(position){
	return [position.coords.latitude, position.coords.longitude];
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
		succes: function(){ alert('things apparently went right')},
		contentType: 'application/json'
	});
	
	map.setView(new L.LatLng(aLocation[0], aLocation[1]),9);
}

function getAllLocations(){
	alert('show all locations.');
}