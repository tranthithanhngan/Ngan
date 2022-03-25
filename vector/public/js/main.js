// khoa map
var southWest = L.latLng(10.735164, 106.654587),//taybac
northEast = L.latLng(10.570172, 106.78299),//dongnam
 bounds = L.latLngBounds(southWest, northEast);

//Giới hạn vùng zoom  khoa map
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


// onclick map
var popup= L.popup();
function onMapClick(e)
{
  popup
  .setLatLng(e.latlng)
  .setContent(e.latlng.toString())
  .openOn(map);

  vectorTuyendtnd.resetStyle();
  vectorVuottuyen.resetStyle();
}
map.on('click',onMapClick);
//thay doi map



// map.setMaxBounds(map.getBounds());

//searchMap
var search = L.Control.geocoder().addTo(map);
// var searchcontroloption={position: 'topleft'};
// L.Control.geocoder(searchcontroloption).on('markgeocode', function(e) {
//     var searchTxt = document.getElementsByClassName("mapdiv")[0]
//     .childNodes[0].value;
// }).addTo(map);

var geojsonStyle = {
    fillColor: "#f8c291",
    color:"#c23616",
    weight: 2.5,
    opacity: 1,
    fillOpacity: 0.8,
  };

  var geojsonStyle1 = {
    fillColor:'#0097e6',
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8
  };



//Highlight polygon
let vectorTuyendtnd=L.layerGroup().addTo(map)
function highlightFeature(e) {
    vectorTuyendtnd.resetStyle();
  
    vectorVuottuyen.resetStyle();
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: 'red',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

	}

	
	function resetHighlight(e) {
		vectorTuyendtnd.resetStyle(e.target);
	}

//show polygon
 function showTuyendtnd (feature, layer)
{
    
    layer.bindPopup( `<h2>Tuyến ĐTNĐ<h2>
     <p> <h3 >Tựa đề:</h3> <span> ${feature.properties.tua_de}</span></p>
     <p> <h3>Vị trí thượng lưu:</h3><span>  ${feature.properties.vitrithuongluu}</span></p>
     <p> <h3>Loại quản lý:</h3><span>  ${feature.properties.loaiquanli}</span></p>`);
  
     layer.on({
               click: highlightFeature
    });
  
    vectorTuyendtnd.addLayer(layer);
};

async function fetchMoviesJSON1() {
    const response = await fetch('http://127.0.0.1:8000/tuyendtnd');
    const movies = await response.json();
    return movies;
}

fetchMoviesJSON1().then(movies => {
    var tes=movies; //fetched movies
    vectorTuyendtnd =   L.geoJSON(JSON.parse(tes[0].jsonb_build_object), {
            onEachFeature:showTuyendtnd,
            style: geojsonStyle,
        }).addTo(map);
        var tuyendtnd_id = L.stamp(vectorTuyendtnd);
        console.log(tuyendtnd_id)

});
// show thong tin linestring và highlight
 
 let vectorVuottuyen=L.layerGroup().addTo(map)
function highlightFeature1(e) {
    vectorVuottuyen.resetStyle();
    
    vectorTuyendtnd.resetStyle();
		var layer = e.target;

		layer.setStyle({
			weight: 3,
            fillColor: "#f0932b",
			color: '#f0932b',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

	}

	
	function resetHighlight1(e) {
		vectorVuottuyen.resetStyle(e.target);
	}

function showVuottuyen (feature, layer)
{
    
    layer.bindPopup( `<h2>Vượt Tuyến<h2> 
    <p> <h3>Tựa đề:</h3><span>  ${feature.properties.tua_de}</span></p>
    <p> <h3>Nội Dung:</h3><span>  ${feature.properties.noidung}</span></p> 
    <p> <h3>Mô tả báo hiệu:</h3><span>  ${feature.properties.motabaohieu}</span></p> `);
    
    layer.on({
        click: highlightFeature1,
        
});
vectorVuottuyen .addLayer(layer)
};
async function fetchMoviesJSON() {
    const response = await fetch('http://127.0.0.1:8000/vuottuyen');
    const movies = await response.json();
    return movies;
}

fetchMoviesJSON().then(movies => {
    var tes=movies; //fetched movies
    
      vectorVuottuyen =   L.geoJSON(JSON.parse(tes[0].jsonb_build_object), {
            onEachFeature:showVuottuyen,
            style: geojsonStyle1,
        })
        .addTo(map);
       

});

let vectorVuottuyenjson=L.layerGroup().addTo(map)
function showVuottuyenjson (feature, layer)
{
    // console.log(feature.properties.st_distance);
    
    // layer.bindPopup( `<h2>Vượt Tuyến<h2> 
    // <p> <h3>Tọa độ:</h3><span>  ${feature.properties.ts}</span></p>`);
    // if(feature.properties.st_distance<10000000000)
layer.on({
    click: highlightFeature1,
});
vectorVuottuyenjson.addLayer(layer)
};

//toa do diem click vong tron
let circle;
map.on('click', function(ev){
    if(circle){
        map.removeLayer(circle);
        
    }   
    var latlng = map.mouseEventToLatLng(ev.originalEvent);
     circle = L.circle([latlng.lat, latlng.lng], {
        color: "#f03",
        fillColor: "#f03",
        fillOpacity: 0.3,
        radius: 100,
      });
      setTimeout(() => {
        map.removeLayer(circle)
      },100)
    circle.addTo(map);
    
    fetchMoviesJSONsearch(latlng).then(movies => {
        
        var tes=movies; //fetched movies

        // console.log(JSON.parse(tes[0].jsonb_build_object))
          vectorVuottuyenjson =   L.geoJSON(JSON.parse(tes[0].jsonb_build_object), {
                onEachFeature:showVuottuyenjson,
                // style: geojsonStyle1,
            })
            .addTo(map);
           
    });
    // console.log(latlng.lat + ', ' + latlng.lng);
  });
  
async function fetchMoviesJSONsearch(e) {
    // console.log(e);
    jQuery.support.cors = true;
   let a = document.querySelectorAll('[name="csrf-token"]');
  
    const response = await fetch('http://127.0.0.1:8000/vuottuyenjson', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
           'X-CSRF-TOKEN': a[0].content,
        },
        body: JSON.stringify({lat: e.lat, lng: e.lng})});
        
        
    const movies = await response.json();
    return movies;
}

//ẩn hiện layer

var baseMaps = {
    "Osm": osm,
    "Watercolor": watercolor,
    // "TonerLite":tonerLite,
    "GooleStreets":googleStreets,
    "GoogleSat":googleSat
};
var overlayMaps = {
    "Tuyến ĐTNĐ": vectorTuyendtnd,
    "Vượt Tuyến": vectorVuottuyen,   
    // "layer":featuresLayer
}

// map.removeLayer(osm);
L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);

 