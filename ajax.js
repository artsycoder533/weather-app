
const btn = document.querySelector(".btn");
// const URL =
	"http://api.openweathermap.org/data/2.5/weather?q=Richmond&APPID=e3a62ee996e2dfe8059942823c005091&units=imperial";

function getWeather(e) {
    e.preventDefault();
    // get input from user
    const location = document.querySelector(".location").value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e3a62ee996e2dfe8059942823c005091&units=imperial`;
    const https = new XMLHttpRequest();
    https.open(
			"GET",
			url,
			true
		);
    https.onload = function() {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            let output = "";
            let weather = response.weather[0].main;
            let description = response.weather[0].description;
            let icon = response.weather[0].icon;
            let temp = Math.round(response.main.temp);
            let city = response.name;
            console.log(temp);
            let isrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            output += `
                <h2>Weather</h2>
                <p>${weather}</p>
                <p>${description}</p>
                <p>${temp}&deg;F</p>
                <p>${city}</p>
            `;
            document.querySelector(".weather").innerHTML = output;
            document.getElementById("logo").src = isrc;
        }
    }
    https.send();
}

btn.addEventListener("click", getWeather);