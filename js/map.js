export var mymap = L.map('map').setView([28.45596, -16.28273], 19);

// Toke pk.eyJ1IjoicHJ1ZWJhanMxMjMiLCJhIjoiY2trZ3ZubzR3MTc1NDJ4cXRnNHR4ZG50ayJ9.pP8zO6X_U0ZYsFXULfPdpw

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicHJ1ZWJhanMxMjMiLCJhIjoiY2trZ3ZubzR3MTc1NDJ4cXRnNHR4ZG50ayJ9.pP8zO6X_U0ZYsFXULfPdpw'
}).addTo(mymap);

export var marker = L.marker([28.45596, -16.28273]).addTo(mymap);
marker.bindPopup('CIFP César Manrique').openPopup();