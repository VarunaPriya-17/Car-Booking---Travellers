// Initialize map
let map = L.map('map').setView([11.3410, 77.7172], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Icons
const greenIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const redIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

let pickupMarker, dropMarker;
let pickupLatLng = null;
let dropLatLng = null;
let selecting = "pickup";

// Reverse Geocode
async function reverseGeocode(latlng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`
  );
  const data = await res.json();
  return data.display_name || "";
}

// Map click
map.on("click", async e => {
  if (selecting === "pickup") {
    if (pickupMarker) map.removeLayer(pickupMarker);
    pickupLatLng = e.latlng;
    pickupMarker = L.marker(e.latlng, { icon: greenIcon }).addTo(map);
    document.getElementById("pickup").value = await reverseGeocode(e.latlng);
  } else {
    if (dropMarker) map.removeLayer(dropMarker);
    dropLatLng = e.latlng;
    dropMarker = L.marker(e.latlng, { icon: redIcon }).addTo(map);
    document.getElementById("drop").value = await reverseGeocode(e.latlng);
  }
  calculateAndShowDistance();
});

// Search by typing
async function searchLocation(query, type) {
  if (!query) return;
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );
  const data = await res.json();
  if (!data.length) return;

  const latlng = L.latLng(data[0].lat, data[0].lon);
  map.setView(latlng, 13);

  if (type === "pickup") {
    if (pickupMarker) map.removeLayer(pickupMarker);
    pickupLatLng = latlng;
    pickupMarker = L.marker(latlng, { icon: greenIcon }).addTo(map);
  } else {
    if (dropMarker) map.removeLayer(dropMarker);
    dropLatLng = latlng;
    dropMarker = L.marker(latlng, { icon: redIcon }).addTo(map);
  }
  calculateAndShowDistance();
}

pickup.addEventListener("blur", () => searchLocation(pickup.value, "pickup"));
drop.addEventListener("blur", () => searchLocation(drop.value, "drop"));

// Distance
function calculateDistance(a, b, c, d) {
  const R = 6371;
  const dLat = (c - a) * Math.PI / 180;
  const dLon = (d - b) * Math.PI / 180;
  const x =
    Math.sin(dLat/2)**2 +
    Math.cos(a*Math.PI/180) *
    Math.cos(c*Math.PI/180) *
    Math.sin(dLon/2)**2;
  return (R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x))).toFixed(2);
}

function calculateAndShowDistance() {
  if (!pickupLatLng || !dropLatLng) return;
  const dist = calculateDistance(
    pickupLatLng.lat, pickupLatLng.lng,
    dropLatLng.lat, dropLatLng.lng
  );
  distance.innerText = dist;
}

// Globe icons
document.querySelector(".fa-globe.text-success").onclick = () => selecting = "pickup";
document.querySelector(".fa-globe.text-danger").onclick = () => selecting = "drop";

// SEARCH CABS
searchCabs.onclick = () => {
  if (!pickupLatLng || !dropLatLng) {
    alert("Select pickup & drop");
    return;
  }

  localStorage.setItem("pickup", pickup.value);
  localStorage.setItem("drop", drop.value);
  localStorage.setItem("date", date.value);
  localStorage.setItem("time", time.value);
  localStorage.setItem("distance", distance.innerText);

  window.location.href = "cars.html";
};
