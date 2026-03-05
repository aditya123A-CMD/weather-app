const apiKey = "94aaa1e0423141ee83f151159260503"

let chart
let map

async function getWeather(){

let city=document.getElementById("locationInput").value

if(city===""){
alert("Please enter a city name")
return
}

let url=`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`

let response=await fetch(url)

let data=await response.json()

document.getElementById("city").innerText=data.location.name

document.getElementById("temp").innerText=data.current.temp_c+"°C"

document.getElementById("condition").innerText=data.current.condition.text

document.getElementById("icon").src=data.current.condition.icon

createChart(data.forecast.forecastday)

createMap(data.location.lat,data.location.lon)

}

function createChart(days){

let labels=[]
let temps=[]

days.forEach(day=>{
labels.push(day.date)
temps.push(day.day.avgtemp_c)
})

if(chart) chart.destroy()

chart=new Chart(document.getElementById("chart"),{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Temperature °C",
data:temps,
borderColor:"#00aaff",
backgroundColor:"rgba(0,170,255,0.2)",
tension:0.4,
fill:true
}]
},

options:{
plugins:{
legend:{labels:{color:"white"}}
},
scales:{
x:{ticks:{color:"white"}},
y:{ticks:{color:"white"}}
}
}

})

}

function createMap(lat,lon){

if(map){
map.remove()
}

map=L.map("map").setView([lat,lon],7)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

L.marker([lat,lon]).addTo(map)

}