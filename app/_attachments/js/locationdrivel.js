function getLocation(){
	console.log('location');
}

function shareLocation(){
	var sName = $('#studentname').val();
	console.log('location of ' + sName);
	
	var oData = {
			'person' : sName,
			'location' : {}
	}
	
	$.ajax({
		type: 'POST',
		url: 'http://127.0.0.1:5984/sharealocation',
		data: JSON.stringify(oData),
		error: function(){ alert('things went wrong')},
		succes: function(){ alert('things apparently went right')},
		contentType: 'application/json'
	});
}