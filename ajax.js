const btn = document.querySelector(".btn");

function getLocation() {
    const loc = document.querySelector(".location").value;
    return loc;
}

function getWeatherFahrenheit() {

	const unitType = "imperial";
	const location = getLocation();

	const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e3a62ee996e2dfe8059942823c005091&units=${unitType}`;
	const https = new XMLHttpRequest();
	https.open("GET", url, true);
	https.onload = function () {
		if (this.status === 200) {
			const response = JSON.parse(this.responseText);
			let output = "";
			let description = response.weather[0].description;
			let icon = response.weather[0].icon;
			let temp = Math.round(response.main.temp);
			let city = response.name;
			let date = new Date();
			console.log(temp);
			let isrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
			output += `
                <div class="buttons">
                    <button class="deg active" id="fahrenheit">F&deg;</button>
                    <button class="deg" id="celcius">C&deg;</button>
                </div>
                <h2>Weather <small>as of ${date.toLocaleTimeString()}</small></h2>
                <p class="description">${description}</p>
                <p class="temp">${temp}&deg;F</p>
                <p>${city}</p>
            `;
			document.querySelector(".weather").innerHTML = output;
			document.getElementById("logo").src = isrc;
			const fahrenheit = document.getElementById("fahrenheit");
			const celcius = document.getElementById("celcius");
			fahrenheit.addEventListener("click", getWeatherFahrenheit);
			celcius.addEventListener("click", getWeatherCelcius);
		} else if (this.status === 404) {
			document.querySelector(".weather").textContent =
				"Unable to get weather for this location, please try another location!";
			document.querySelector(".location").value = "";
		}
        //reset input
        // document.querySelector(".location").value = "";
	};
	https.send();
}

function getWeatherCelcius() {
    fahrenheit.classList.remove("active");
	celcius.classList.add("active");

    const unitType = "metric";
    const location = getLocation();

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e3a62ee996e2dfe8059942823c005091&units=${unitType}`;
		const https = new XMLHttpRequest();
		https.open("GET", url, true);
		https.onload = function () {
			if (this.status === 200) {
				const response = JSON.parse(this.responseText);
				let output = "";
				let description = response.weather[0].description;
				let icon = response.weather[0].icon;
				let temp = Math.round(response.main.temp);
				let city = response.name;
				let date = new Date();
				console.log(temp);
				let isrc = `http://openweathermap.org/img/wn/${icon}@2x.png`;
				output += `
                <div class="buttons">
                    <button class="deg" id="fahrenheit">F&deg;</button>
                    <button class="deg" id="celcius">C&deg;</button>
                </div>
                <h2>Weather <small>as of ${date.toLocaleTimeString()}</small></h2>
                <p class="description">${description}</p>
                <p class="temp">${temp}&deg;C</p>
                <p>${city}</p>
            `;
				document.querySelector(".weather").innerHTML = output;
				document.getElementById("logo").src = isrc;
				const fahrenheit = document.getElementById("fahrenheit");
				const celcius = document.getElementById("celcius");
				celcius.classList.add("active");
				fahrenheit.classList.remove("active");
				fahrenheit.addEventListener("click", getWeatherFahrenheit);
				celcius.addEventListener("click", getWeatherCelcius);
			} else if (this.status === 404) {
				document.querySelector(".weather").textContent =
					"Unable to get weather for this location!";
				document.querySelector(".location").value = "";
			}
			//reset input
			// document.querySelector(".location").value = "";
		};
		https.send();
}

btn.addEventListener("click", getWeatherFahrenheit);
