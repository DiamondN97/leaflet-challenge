var geodata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

function EQcolors(d){
    if(d<10){
        return "#baffb2"
      } else if (d > 10 && d < 20 ){
        return "#fcf403"
      } else if (d > 20 && d < 50){
        return "#fe964c"
      } else if (d > 50 && d < 100){
        return "#fd763c"
      } else if (d > 100 && d < 200){
        return "#fc2a2a"
      } else if (d > 200 && d < 300){
        return "#f52f30"
      } else if (d > 300 && d < 450){
        return "#cf0000"
      } else {
        return "00dffc"
      };
    }

    var depth_colors = ["#baffb2", "#fcf403", "#fe964c", "#fd763c", "#fc2a2a", "#f52f30", "#cf0000", "00dffc" ]

    console.log(EQcolors);

    var depthMag = new L.LayerGroup(depthMag)

function mapStyle(feature)
{
    return {
        color: "#A9A9A9",
        fillColor: EQcolors(feature.geometry.coordinates[2]),
        fillOpacity: 0.75,
        radius: feature.properties.mag*5 
    }
    }
    
    d3.json(geodata, function(data){
    createFeatures(data.features);
    
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng)
        
        },
        style: mapStyle
    
    
    }).addTo(depthMag);
    
});
function createFeatures(geodata){
    var depth_array = [];
    
    var markers = L.markerClusterGroup();
    var magnitude = [];
    
    for (var i = 0; i < geodata.length; i++){
        var latlng = geodata[i].geometry.coordinates;
        
        var size = (geodata[i].properties.mag)*10000;
        
        depth_array.push(geodata[i].geometry.coordinates[2]);
        
    
        var m = L.marker([latlng[1], latlng[0]], {title: "test"});
        m.bindPopup("<h3>" + geodata[i].properties.place + "</h3><hr>" + "<h4> Magnitude: " + geodata[i].properties.mag + "</h4>")
        markers.addLayer(m)
    
    
    };



    var legend = L.control({position: "bottomright"});
    legend.onAdd = function(){
      var div = L.domUtil.create("div", "info legend");
      var depth_limits = depth_array;
      var colors = depth_colors;
      var labels = [];
    
      var legendInfo = "<h1>Median Income</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + depth_limits[0] + "</div>" +
          "<div class=\"max\">" + depth_limits[depth_limits.length - 1] + "</div>" +
        "</div>";
  
        div.innerHTML = legendInfo;
  
        depth_limits.forEach(function(depth, index){
          labels.push("<li style = \"background-color: " + colors[index] + "\"><li>");
        });
  
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div
    }
    console.log(legend);
 var leg = L.layerGroup(legend);
 var mag = L.layerGroup(magnitude);

   createMap(markers, mag, leg);
 
  };
 
 
 
  function createMap(earthquakes, leg){
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY
      });
    
  
      var baseMaps = {
        "Street View": streetmap,
        "Satellite View": satellite
      };
  
      
      var overlayMaps = {
        Earthquakes: earthquakes,
        "Depth and Magnitude" : depthMag
  
      };
      
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
  
    leg.addTo(myMap);
    
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

  }
  
  