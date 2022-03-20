//making a map and tiles
const mymap = L.map('map').setView([0,0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">Open Street Map</a> contributors'
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileURL,{attribution})
tiles.addTo(mymap)

//making a marker 
const marker = L.marker([0,0]).addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
let firstTime = true

async function getISS(){
    const response = await fetch(api_url)
    const data = await response.json()

    const {latitude,longitude} = data
    marker.setLatLng([latitude,longitude])
    if(firstTime){
        mymap.setView([latitude,longitude],5)
        firstTime=false 
    }
    document.getElementById('lati').textContent = latitude.toFixed(2)
    document.getElementById('longi').textContent = longitude.toFixed(2)
}
getISS()
setInterval(getISS,1000)