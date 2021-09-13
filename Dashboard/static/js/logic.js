// The Data From medals.js
let countryData = countryFile;

// ---------- INPUT BOX ----------//

var tbody = d3.select("tbody");
function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  countryData.forEach((dataRow) => {
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

// ---------- Table For History ----------//

// 1. Create a variable to keep track of all the filters as an object.
var filters = {}
// 3. Use this function to update the filters. 
function updateFilters() {
    // Save the element that was changed as a variable.
    var element = d3.select(this);
    // Save the value that was changed as a variable.
    var elementvalue = element.property("value");
    // Save the id of the filter that was changed as a variable.
    var elementid = element.attr("id");
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementvalue) {
      filters[elementid] = elementvalue;
    }
    else {
      delete filters[elementid]
    }
    // Call function to apply all filters and rebuild the table
    filterTable();
  }
  // Use this function to filter the table when data is entered.
  function filterTable() {
    // Set the filtered data to the tableData.
    var filteredData = countryData;
    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    })
    // Finally, rebuild the table using the filtered data
    buildTable(countryData)
  }
  // Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters)
  // Build the table when the page loads
  buildTable(countryData);

// ---------- Bar Graph Ranking Winning Country By Medals ----------//

// X Variable - Organize Data from Top Medals to Bottom Medals
var filteredMedals = countryData.filter(medals => medals.gold_medals >= 1);
var sortedMedals = countryData.sort((a,b) => b.gold_medals - a.gold_medals);
var slicedMedals = sortedMedals.slice(0,50);
var reverseMedals = slicedMedals.reverse();
var finalMedals = reverseMedals.map(obj => obj.gold_medals)

// Y Variable - Country Names
var countryName = reverseMedals.map(obj => obj.country_name);

// Bar Graph
var trace = {
  x: finalMedals,
  y: countryName,
  type: 'bar',
  orientation: 'h'
};

var data = [trace];

var layout = {
  title: "Top Medals By Country in Year"
}

console.log('creating plot')
Plotly.newPlot("bar-plot", data, layout)

// ---------- MAP ----------//


// ---------- BASEMAP LAYER ----------//

let mapboxLink = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";

// Satellite Layer
let satellite = L.tileLayer(mapboxLink, {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-v9",
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
	zoom:1.5,
	layer: [satellite],
})

// Layers
let baseMaps = {
	Satellite: satellite,
	Light: light,
	Dark: dark
  };

// 1. Add a 2nd layer group for the tectonic plate data.
let medalsData = new L.LayerGroup();
let gdpData = new L.LayerGroup();
let populationData = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Medals": medalsData,
  "GDP": gdpData,
  "Population": populationData
};

// var medalsLayer, gdpLayer, populationLayer;

L.control.layers(baseMaps, overlays).addTo(map);

// ---------- MAP LAYER ----------//

function olympicsSize(m) {
  return m > 1000 ? m*150 :
      m > 500 ? m*250 :
      m > 100 ? m*500 :
      m*1000
}

function olympicsColor(m) {
  return m > 800 ? '#FBB32E' :
      m > 400 ? '#0186C3' :
      m > 200 ? '#158C39' :
      '#EE304D'
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

// L.geoJson(countryData, {style: style}).addTo(map);
