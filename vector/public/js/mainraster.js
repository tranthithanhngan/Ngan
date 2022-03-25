var southWest = L.latLng(10.735164, 106.654587),
northEast = L.latLng(10.570172, 106.78299),
 bounds = L.latLngBounds(southWest, northEast);

//Giới hạn vùng zoom
var map = L.map('map', {
maxBounds: bounds,
maxZoom: 16,
minZoom: 12
}).setView([10.606957, 106.736641], 12);


    

var osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// osm.addTo(map);

var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
//watercolor.addTo(map);

var tonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});
//tonerLite.addTo(map);

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 19,
   
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
//googleSat.addTo(map);

// var singleMarker = L.marker([10.694451, 106.70821
//    ], {draggable: true});
// var popup = singleMarker.bindPopup('This is the Nepal' + singleMarker.getLatLng()).openPopup();
// popup.addTo(map);

// var secondMarker = L.marker([14.21685896582941,
//       1549.16124522686], {draggable: true});

      
// var pointData=L.geoJSON(pointJson).addTo(map)

// var lineStringData=L.geoJSON(lineJson).addTo(map)

// var polygonData=L.geoJSON(polygonJson).addTo(map)



var geojsonStyle = {
  fillColor:'#0097e6',
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8
};


//L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
var wmsLayer = L.tileLayer.betterWms("http://localhost:8080/geoserver/wms", {
  
layers: "cite:vuottuyen",
transparent: true,
 format: 'image/png'},
 {
//   onEachFeature: function (feature, layer) {
//         layer.bindPopup(feature.properties.tua_de);
//   },

  });
 wmsLayer.addTo(map);

 var popup= L.popup();
 function onMapClick(e)
 {
   popup
   .setLatLng(e.latlng)
   .setContent(e.latlng.toString())
   .openOn(map);
 }
 map.on('click',onMapClick);

var wmsLayer1 = L.tileLayer.betterWms("http://localhost:8080/geoserver/wms", {
  layers: "cite:tuyendtnd",
  transparent: true,
 format: 'image/png'},
 {
    // onEachFeature: onEachFeature1
  
  // style: {
  //   color: "red",
  //   fillOpacity: 0,
  //   opacity: 1,
  //   stockWidth: 0.5,
  // },
  // onEachFeature: function (feature, layer) {
  //       layer.bindPopup("Tựa đề:"  + feature.properties.tua_de);
  // }
}).addTo(map);

map.addLayer(wmsLayer1);




var baseMaps = {
    "Osm": osm,
    "Watercolor": watercolor,
    "TonerLite":tonerLite,
    "GooleStreets":googleStreets,
    "GoogleSat":googleSat
};
//ẩn hiện layer
var overlayMaps = {
    "Tuyến ĐTNĐ": wmsLayer1,
    "Vượt Tuyến": wmsLayer,   
}
L.Control.geocoder().addTo(map);
// map.removeLayer(osm);
L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);


map.setMaxBounds(map.getBounds());

