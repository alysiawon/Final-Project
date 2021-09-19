// The Data From medals.js
let countryData = countryTest;

// ---------- Table For History ----------//

// Build Table References 
var tbody = d3.select("tbody");

function buildTable(data) {
  tbody.html("");
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);

    });
  });
}

// ---------- Filter & Sorting ----------//

// Create Filter
var filters = {}
function updateFilters() {
  // Save the element, value and id of the changed value
    var element = d3.select(this);
    var elementvalue = element.property("value");
    var elementid = element.attr("id");

    // If Statement for year to be an integer
    if (elementid = "year") {
      elementvalue = parseInt(elementvalue)
    }

    // If Statement to add value to list or ignore 
    if (elementvalue) {
      filters[elementid] = elementvalue;
    }
    else {
      delete filters[elementid]
    }

    var filteredData = countryData;

    Object.entries(filters)
    .forEach(([key, value]) => {filteredData = filteredData.filter(row => row[key] === value)
    .filter(medals => medals.gold_medals >= 1)
    .sort((a,b) => b.gold_medals - a.gold_medals);})

    buildTable(filteredData);
    filterChart(filteredData);
    buildMap(filteredData);
  }

// Attach Event To Listen To Data
d3.selectAll("input").on("change", updateFilters)

// Build New Table
buildTable(countryData);

// ---------- Bar Graph ----------//

// Build Bar Graph with Filtered Data
function filterChart(filteredData){
  var filteredMedals =filteredData.map(d => d.gold_medals)
  var filteredCountry =filteredData.map(d => d.country_name)

  // Bar Graph
  var trace = {
    x: filteredMedals,
    y: filteredCountry,
    type: 'bar',
    orientation: 'h'
  };

  var chartData = [trace];

  var layout = {
  title: "Top Medals By Country in Year"
  }

  Plotly.newPlot("bar-plot", chartData, layout)
}  

// ---------- Map ----------//
function buildMap(data){
  // --- Map Set Up --- //

  // Street Layer
  let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
  });

  // Satellite Layer
  let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
  });

  // Dark Layer
  let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });

  // Initalize Map
  let map = L.map('mapid', {
    center: [0, 0],
    zoom: 2,
    layers: [streets]
  });

  // Base Map
  let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Dark": dark
  };

  // Layer
  let mapMedals = new L.LayerGroup();
  let overlays = {
    "Medals": mapMedals
  };

  // Show Map
  L.control.layers(baseMaps, overlays).addTo(map);

  // Legend


  // --- Map Set Up --- //

  // Plot Coordinates
  for (var i=0; i<data.length;i++){

    var countryName = data.map(d => d.country_name);
    var goldMedal = data.map(d => d.gold_medals);
    var gdp = data.map(d => d.gdp);
    var population = data.map(d => d.population);
    var latlng = data.map(d => [d.latitude, d.longitude]);
    
    var marker = L.marker(latlng[i]).addTo(mapMedals)
    marker.bindPopup(
      "<b>Country Name: </b>" + countryName[i]+
      "<br><b>Number of Gold Medals: </b>" + goldMedal[i] + 
      "<br><b>Population: </b>" + population[i] +
      "<br><b>GDP: </b>" + gdp[i]).openPopup();

    // var circle = L.circle(latlng[i], {
    //   color: "red",
    //   fillColor: "#f03",
    //   fillOpacity: 0.5,
    //   radius: 1600,
    // }).addTo(mapMedals);
  }





  
}


