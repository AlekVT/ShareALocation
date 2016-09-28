/**var map = L.map('map',{
    center: [51.215798, 4.411097],
    zoom: 15
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);**/
    
    var map;
    var ajaxRequest;
    var plotlist;
    var plotlayers=[];

    function initmap() {
    	// set up the map
    	map = new L.Map('map');

    	// create the tile layer with correct attribution
    	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});		

    	// start the map in Antwerp
    	map.setView(new L.LatLng(51.215798, 4.411097),9);
    	map.addLayer(osm);
    }