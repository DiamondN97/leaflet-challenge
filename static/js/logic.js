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
    
    //loop through data to make markers for each earthquake & collapse into marker clusters
    for (var i = 0; i < geodata.length; i++){
        var latlng = geodata[i].geometry.coordinates;
        
        var size = (geodata[i].properties.mag)*10000;
        
        depth_array.push(geodata[i].geometry.coordinates[2]);
        
    
        //this adds a marker and builds a marker cluster group for each earthquake
        var m = L.marker([latlng[1], latlng[0]], {title: "test"});
        m.bindPopup("<h3>" + geodata[i].properties.place + "</h3><hr>" + "<h4> Magnitude: " + geodata[i].properties.mag + "</h4>")
        markers.addLayer(m)
    
    
    }};

