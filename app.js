// Initialize map centered on Berthoud Pass
const map = L.map('map').setView([39.7985, -105.7775], 13);

// Topographic basemap
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: '© OpenTopoMap contributors'
}).addTo(map);

// Placeholder hillshade overlay
L.tileLayer('https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
  opacity: 0.35
}).addTo(map);

// Load slope overlay
fetch('slopes.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({
        color: feature.properties.color,
        weight: 1,
        fillOpacity: 0.35
      }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`Slope: ${feature.properties.slope}°`);
      }
    }).addTo(map);
  })
  .catch(err => console.error('Error loading slope overlay:', err));

// Route drawing
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
