const btn = document.querySelector(".btn");
const weekdays = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];

const currentWeather = async (loc) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=e3a62ee996e2dfe8059942823c005091&units=imperial`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const { temp } = data.main;
        const { main, icon } = data.weather[0];
        const { name } = data;
        let date = new Date();
        const weekday = weekdays[date.getDay()];
        const month = months[date.getMonth()];
        const day = date.getDate();
        let output = "";
        output += `
            <h1 class="city">${name}</h1>
            <small>Weather as of ${date.toLocaleTimeString()}</small>
            <p class="description">${main}</p>
            <p class="temp">${Math.round(temp)}&deg;F</p>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>
            <p>${weekday}, ${month} ${day}</p>
        `;
        document.querySelector(".current").innerHTML = output;
    } catch (error) {
        document.querySelector(".current").innerHTML =
            "Unable to get weather for this location, please try another location!";
        document.querySelector(".weather").innerHTML = "";
    }
    document.querySelector(".location").value = "";
}

const showWeather = async (url) => {
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        let output = "";
        for (let i = 5; i <data.list.length; i+=8){
            const { temp } = data.list[i].main;
            const { main, icon } = data.list[i].weather[0];
            const { name } = data.city;
            const { dt_txt } = data.list[i];
            const date = new Date(dt_txt);
            const weekday = weekdays[date.getDay()];
            const month = months[date.getMonth()];
            const day = date.getDate();
            output += `
            <div class="card">
                <p class="description">${main}</p>
                <p class="temp">${Math.round(temp)}&deg;F</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img>
                <p>${weekday}, ${month} ${day}</p>
            </div>
            `;
            
        }
        document.querySelector(".weather").innerHTML = output;
    } catch (error) {
        document.querySelector(".current").innerHTML = "Unable to get weather for this location, please try another location!";
        document.querySelector(".weather").innerHTML = "";
    }
    document.querySelector(".location").value = "";
}

btn.addEventListener("click", () => {
    const loc = document.querySelector(".location").value;
    const error = document.querySelector(".error");
    const regex = /[^$|\d|\s{2}*]/ig;
    if (loc.match(/^$/) || loc.match(/\d/) || loc.match(/\s{2,}/)) {
        error.textContent = "Enter a valid city!";
        setTimeout(() => {
            error.textContent = "";
        }, 3000);
        return;
        
    }
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=e3a62ee996e2dfe8059942823c005091&units=imperial`;
    
    showWeather(url);
    currentWeather(loc);
});
