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
  var coordinates = data.map(d => [d.latitude, d.longitude])

  let mapboxLink = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";

  // Satellite Layer
  let satellite = L.tileLayer(mapboxLink, {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  })

  // Light Layer
  let light = L.tileLayer(mapboxLink, {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  })

  // Dark Layer
  let dark = L.tileLayer(mapboxLink, {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  })

  // Initiatlize Map
  let map = L.map("mapid", {
    center: [25,5],
    zoom:2,
    layer: [satellite],
  })

  // Layers
  let baseMaps = {
    "Satellite": satellite,
    "Light": light,
    "Dark": dark
    };

  // Add Second Layer
  let medalsData = new L.LayerGroup();
  // let gdpData = new L.LayerGroup();
  // let populationData = new L.LayerGroup();

  let overlays = {
    "Medals": medalsData,
    // "GDP": gdpData,
    // "Population": populationData
  };

  L.control.layers(baseMaps, overlays).addTo(map);

  // Drop Points

  // Create Pop Up
  // L.control.layers() {
  // pointToLayer: function(feature, latlng) {
  //   console.log(data);
  //   return L.circleMarker(latlng);
  // },

  // onEachFeature: function(feature, layer) {
  //   layer.bindPopup("Country Name: " + feature.properties.country_name + "<br>Number of Medals: " + feature.properties.gold_medals);
  // }
}

// buildMap(countryData);
