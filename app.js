
const btn = document.querySelector(".btn");


const URL =
	"http://api.openweathermap.org/data/2.5/weather?q=Richmond&APPID=e3a62ee996e2dfe8059942823c005091&units=imperial";

// window.addEventListener("DOMContentLoaded", () => {
//     showWeather(URL);
// })

const showWeather = async (URL) => {
    // const data = await fetchWeather(url);
    const img = document.getElementById("logo");
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log(data);
        const { temp, temp_max: max, temp_min: min } = data.main;
        //const { icon } = data.weather;
        console.log(data.weather[0].icon, temp, max, min);
        //img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        console.log(img.src);
        return data;
    } catch (error) {
        console.log(error);
    }
}

btn.addEventListener("click", showWeather);