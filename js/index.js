async function serch(a) {
    let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3d804920bf2e477d9df140929231802&q=${a}&days=3`);

    if (weather.ok && 400 != weather.status) {
        let a = await weather.json();
        displayCurrent(a.location, a.current), displayAnother(a.forecast.forecastday)
    }

}

document.getElementById("search").addEventListener("keyup", a => { serch(a.target.value) });

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(location, current) {
    if (current != null) {
        var date = new Date(current.last_updated.replace(" " , "T"));
        // console.log(date.getDay())
        let cartona = `    <div class=" today  col-4 card text-white  p-0">
        <div class=" card-header d-flex justify-content-between py-2">
            <div >${days[date.getDay()]}</div>
            <div >${date.getDate() + monthNames[date.getMonth()]}</div>
        </div>

        <div class=" card-body" >
            <div >${location.name}</div>
            <div >
                <div class="num">${current.temp_c}<sup>o</sup>C</div>
                <div >
                    <img src="https:${current.condition.icon}" alt="" width=90>
                </div>
            </div>
            <div class="my-3 text-info">${current.condition.text}</div>
            <span class="me-3"><img class="me-1" src="img/icon-umberella.png" alt="">20%</span>
            <span class="me-3"><img class="me-1" src="img/icon-wind.png" alt="">18km/h</span>
            <span class="me-3"><img class="me-1" src="img/icon-compass.png" alt="">East</span>
        </div>
    </div>`;
        document.getElementById("forecast").innerHTML = cartona
    }
} function displayAnother(forecastday) {
    let cartona = "";
    for (let i = 1; i < forecastday.length; i++)
    cartona += `<div class="forecast col-4 bg-secondary card text-white bg-dark p-0">
         <div class="card-header">
             <div class="day">${days[new Date(forecastday[i].date.replace(" ")).getDay()]}</div>
         </div> 
         <div class="card-body d-flex justify-content-center align-items-center flex-column">
             <div>
                 <img src="https:${forecastday[i].day.condition.icon}" alt="" width=48>
             </div>
             <div class="mt-3 fs-4">${forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
             <small class="mb-3 fs-4 text-secondary">${forecastday[i].day.mintemp_c}<sup>o</sup></small>
             <div class="text-info">${forecastday[i].day.condition.text}</div>
         </div>
         </div>
         `;
    document.getElementById("forecast").innerHTML += cartona
}
serch("Kafr Ash Shaykh");