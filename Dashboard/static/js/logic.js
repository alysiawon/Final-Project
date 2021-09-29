// ---------- Gold Medal Prediction ----------//

// Build Table References 
d3.select("#filter-btn-tokyo").on("click", calcMedeals);

var tbodyTokyo = d3.select("#tokyo-table-body");

function buildTokyoTable(data) {
  tbodyTokyo.html("");
  data.forEach((dataRow) => {
    let row = tbodyTokyo.append("tr");
    Object.entries(dataRow).forEach(([key, val]) => {
        let cell = row.append("td");
        cell.text(val);
    });
    if (dataRow["country_name"] == "Your Country") {
      row.classed("highlight", true)
    }
  });
}

// Machine Learning

function mergeToTokyo(data, calculated){
  return Object.assign(data, calculated);
}

function calcMedeals()
{
  var gdp = parseInt(d3.select("#gdp").property("value"));
  var population = parseInt(d3.select("#population").property("value"));
  var medals = parseInt(1.91822104*Math.pow(10, -12)*gdp + 1.01431335*Math.pow(10, -8)*population + 8.534067417575553).toFixed();

  d3.json("/api/v1.0/tokyo/" + medals).then((filteredData) => {
      filteredData = filteredData.sort((a, b) => a.rank - b.rank);
  buildTokyoTable(filteredData);
  })
}

// ---------- Olympic History----------//

// Dropdown Menu
function init() {
  var selector = d3.select("#year");

  d3.json("/api/v1.0/medals/").then((years) => {
    years.forEach((year) => {
      selector
        .append("option")
        .text(year)
        .property("value", year);
    });
  })
}

init();

// Build Table References 
var tbody = d3.select("#history-table-body");

function buildHistoryTable(data) {
  tbody.html("");
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.entries(dataRow).forEach(([key, val]) => {
      if ((key != "latitude") & (key != "longitude")) {
        let cell = row.append("td");
        cell.text(val);
      }
    });
  });
}

// Filtering & Sorting
var filters = {}
function updateFilters() {
  var year = parseInt(d3.select("#year").property("value"));
  d3.json(`/api/v1.0/medals/` + year).then((filteredData) => {
  buildHistoryTable(filteredData);
  buildMap(filteredData);
  })

  var year = parseInt(d3.select("#year").property("value"));
  d3.json(`/api/v1.0/graph/` + year).then((filteredData) => {
  filterChart(filteredData);
  })
}

// Attach Event To Listen To Data
d3.select("#filter-btn-medals").on("click", updateFilters);

// ---------- Graphs ----------//

function filterChart(filteredData) {
  var reverseMedals = filteredData.map(d => d.gold_medals).reverse()
  var reverseCountry = filteredData.map(d => d.country_name).reverse()

  var filteredMedals = filteredData.map(d => d.gold_medals)
  var filteredCountry = filteredData.map(d => d.country_name)
  var filteredPopulation = filteredData.map(d => d.population)
  var filteredGDP = filteredData.map(d => d.gdp)

  // Bar Graph
  var trace = {
    x: reverseMedals,
    y: reverseCountry,
    type: 'bar',
    orientation: 'h'
  };

  var chartData = [trace];

  var layout = {
    title: "Top Medals By Country in Year",
    xaxis: {title: "Gold Medals"},
  }

  Plotly.newPlot("bar-plot", chartData, layout)

  // Bubble Chart

  var bubbleData = [{
    x: filteredPopulation,
    y: filteredGDP,
    text: filteredCountry,
    mode: "markers",
     marker: {
       size: filteredMedals,
       color: filteredMedals,
       colorscale: "Portland" 
     }
  }];

  var bubbleLayout = {
    title: "Medals Per Population and GDP",
    xaxis: {title: "Population"},
    yaxis: {title: "GDP"},
    automargin: true,
    hovermode: "closest"
  };
  
  Plotly.newPlot("bubble", bubbleData, bubbleLayout)
}

// ---------- Map ----------//
function buildMap(data) {
  // --- Map Set Up --- //

  // Street Layer
  let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
  });

  // Initalize Map
  let map = L.map('mapid', {
    center: [0, 0],
    zoom: 2,
    layers: [streets]
  });

  // Plot Coordinates
  for (var i = 0; i < data.length; i++) {
    var countryName = data.map(d => d.country_name);
    var goldMedal = data.map(d => d.gold_medals);
    var gdp = data.map(d => d.gdp);
    var population = data.map(d => d.population);
    var latlng = data.map(d => [d.latitude, d.longitude]);

    var marker = L.marker(latlng[i]).addTo(map)
    marker.bindPopup(
      "<b>Country Name: </b>" + countryName[i] +
      "<br><b>Number of Gold Medals: </b>" + goldMedal[i] +
      "<br><b>Population: </b>" + population[i] +
      "<br><b>GDP: </b>" + gdp[i]);
  }
}