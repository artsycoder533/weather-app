const URL =
	"http://api.openweathermap.org/data/2.5/weather?q=Richmond&APPID=e3a62ee996e2dfe8059942823c005091&units=imperial";

window.addEventListener("DOMContentLoaded", () => {
    showWeather(URL);
})

const showWeather = async (url) => {
    //const data = await fetchWeather(url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const { temp_max: high, temp_low: low} = data.main;
        console.log(low, high)
        return data;
    } catch (error) {
        console.log(error);
    }
}