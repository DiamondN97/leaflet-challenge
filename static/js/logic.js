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