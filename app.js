// Initialize map centered on Berthoud Pass
const map = L.map('map').setView([39.7985, -105.7775], 13);

// Topographic basemap
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: '© OpenTopoMap contributors'
}).addTo(map);

// Optional hillshade overlay
L.tileLayer('https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
  opacity: 0.35
}).addTo(map);

// --------------------
// ROUTE DRAWING
// --------------------
let routeLine = null;
let drawing = false;
let routePoints = [];

document.getElementById('drawRouteBtn').onclick = () => {
  drawing = true;
  routePoints = [];
  if (routeLine) map.removeLayer(routeLine);
};

document.getElementById('clearRouteBtn').onclick = () => {
  drawing = false;
  routePoints = [];
  if (routeLine) map.removeLayer(routeLine);
  routeLine = null;
};

map.on('click', (e) => {
  if (!drawing) return;

  routePoints.push(e.latlng);

  if (routeLine) {
    routeLine.setLatLngs(routePoints);
  } else {
    routeLine = L.polyline(routePoints, { color: 'red', weight: 4 }).addTo(map);
  }
});

// --------------------
// TEST POLYGON (Slope) 
// --------------------
// Ensure this polygon is within map viewport
const testSlopePolygon = L.polygon([
  [39.7980, -105.7790],
  [39.7980, -105.7760],
  [39.8000, -105.7760],
  [39.8000, -105.7790]
], {
  color: 'green',
  fillOpacity: 0.4,
  weight: 2
}).addTo(map);

testSlopePolygon.bindPopup('Slope: 0-27°');
