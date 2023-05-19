function getWheatherAPI(location) {
  if (location == "") return;
  fetch(
    "http://api.weatherapi.com/v1/forecast.json?key=0a8883f531c0472c811161549231605&q=" +
      location +
      "&days=3&aqi=no&alerts=no",
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      //console.log(response.location.name);
      //console.log(response.location.region);
      //console.log(response.location.country);
      //console.log(response.current.temp_c + "°C");
      setWeatherOfToday(response, 0);
      setWeatherOfTomorrow(response, 1);
      setWeatherOfTomorrow(response, 2);
      //setWeatherDay(response, 2);
      //setWeatherHourly(response, 2);
    })
    .catch(() => {
      console.log("Can't find location");
    });
}
function setWeatherOfToday(file, day) {
  const location = document.querySelector(".location");
  const date = document.querySelector(".date");
  const temp = document.querySelector(".temperature");
  const wind = document.querySelector(".wind");
  const icon = document.querySelector("#icon");
  const describe = document.querySelector(".describe");
  const rain = document.querySelector(".rain");
  let iconfile =
    "./images/" +
    file.current.condition.icon.split("/")[3] +
    "/" +
    file.current.condition.icon.split("/")[4] +
    "/" +
    file.current.condition.icon.split("/")[5] +
    "/" +
    file.current.condition.icon.split("/")[6];

  location.textContent = file.location.name + "," + file.location.country;
  date.textContent =
    file.location.localtime.split(" ")[0].split("-")[2] +
    "-" +
    file.location.localtime.split(" ")[0].split("-")[1] +
    "-" +
    file.location.localtime.split(" ")[0].split("-")[0] +
    "," +
    file.location.localtime.split(" ")[1];
  temp.innerHTML =
    '<i class="fa-sharp fa-solid fa-temperature-low"></i><div>' +
    file.current.temp_c +
    "°C </div>";
  rain.innerHTML =
    "<i class='fa-solid fa-cloud-rain'></i><div>" +
    file.forecast.forecastday[day].day.daily_chance_of_rain +
    " %";
  wind.innerHTML =
    "<i class='fa-solid fa-wind'></i><div>" +
    file.current.wind_kph +
    " km/h</div>";
  describe.textContent = file.current.condition.text;
  icon.src = iconfile;
}
function setWeatherOfTomorrow(file, day) {
  const date = document.querySelector(".date" + day);
  const temp = document.querySelector(".temperature" + day);
  const wind = document.querySelector(".wind" + day);
  const icon = document.querySelector("#icon" + day);
  const describe = document.querySelector(".describe" + day);
  const rain = document.querySelector(".rain" + day);
  let iconfile =
    "./images/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[3] +
    "/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[4] +
    "/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[5] +
    "/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[6];

  location.textContent = file.location.name + "," + file.location.country;
  date.textContent =
    file.forecast.forecastday[day].date.split("-")[2] +
    "-" +
    file.forecast.forecastday[day].date.split("-")[1] +
    "-" +
    file.forecast.forecastday[day].date.split("-")[0];

  temp.innerHTML =
    '<i class="fa-solid fa-temperature-three-quarters"></i><div>' +
    file.forecast.forecastday[day].day.mintemp_c +
    " to " +
    file.forecast.forecastday[day].day.maxtemp_c +
    "°C</div>";
  rain.innerHTML =
    "<i class='fa-solid fa-cloud-rain'></i><div>" +
    file.forecast.forecastday[day].day.daily_chance_of_rain +
    " %";
  wind.innerHTML =
    "<i class='fa-solid fa-wind'></i><div> Up to " +
    file.forecast.forecastday[day].day.maxwind_kph +
    " km/h</div>";
  describe.textContent = file.forecast.forecastday[day].day.condition.text;
  icon.src = iconfile;
}
function setWeatherOfTodayyy(file, day) {
  const location = document.querySelector(".location");
  const date = document.querySelector(".date");
  const temp = document.querySelector(".temperature");
  const wind = document.querySelector(".wind");
  const icon = document.querySelector("#icon");
  const describe = document.querySelector(".describe");
  const rain = document.querySelector(".rain");
  let iconfile =
    "./images/" +
    file.current.condition.icon.split("/")[3] +
    "/" +
    file.current.condition.icon.split("/")[4] +
    "/" +
    file.current.condition.icon.split("/")[5] +
    "/" +
    file.current.condition.icon.split("/")[6];

  location.textContent = file.location.name + "," + file.location.country;
  date.textContent =
    file.location.localtime.split(" ")[0].split("-")[2] +
    "-" +
    file.location.localtime.split(" ")[0].split("-")[1] +
    "-" +
    file.location.localtime.split(" ")[0].split("-")[0] +
    "," +
    file.location.localtime.split(" ")[1];
  temp.textContent = file.current.temp_c + "°C, " + file.current.temp_f + "°F";
  rain.innerHTML =
    "<i class='fa-solid fa-cloud-rain'></i><div>" +
    file.forecast.forecastday[day].day.daily_chance_of_rain +
    " %";
  wind.innerHTML =
    "<i class='fa-solid fa-wind'></i><div>" +
    file.current.wind_kph +
    " km/h</div>";
  describe.textContent = file.current.condition.text;
  icon.src = iconfile;
}
function setWeatherDay(file, day) {
  console.log("Date:" + file.forecast.forecastday[day].date);
  console.log(file.forecast.forecastday[day].day.condition.text);
  console.log("Maximal T:" + file.forecast.forecastday[day].day.maxtemp_c);
  console.log("Minimal T:" + file.forecast.forecastday[day].day.mintemp_c);
  console.log(
    "Total Precipitation:" +
      file.forecast.forecastday[day].day.totalprecip_mm +
      "mm"
  );
  if (file.forecast.forecastday[day].day.totalsnow_cm != 0)
    console.log(
      "Total Snow:" + file.forecast.forecastday[day].day.totalsnow_cm + "cm"
    );
  console.log("Maximal Wind:" + file.forecast.forecastday[day].day.maxwind_kph);

  let iconfile =
    "./images/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[3] +
    "/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[4] +
    "/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[5] +
    "/" +
    file.forecast.forecastday[day].day.condition.icon.split("/")[6];
  console.log("Iconfile:" + iconfile);

  console.log(
    "Chance of rain:" + file.forecast.forecastday[day].day.daily_chance_of_rain
  );
  if (file.forecast.forecastday[day].day.daily_chance_of_snow != 0)
    console.log(
      "Chance of snow:" +
        file.forecast.forecastday[day].day.daily_chance_of_snow
    );
}

function setWeatherHourly(file, day) {
  for (let i = 3; i < 24; i = i + 6) {
    console.log("Time:" + i + ":00");
    console.log(file.forecast.forecastday[day].hour[i].condition.text);
    console.log("Temperature:" + file.forecast.forecastday[day].hour[i].temp_c);
    console.log("Wind:" + file.forecast.forecastday[day].hour[i].wind_kph);

    let iconfile =
      "./images/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[3] +
      "/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[4] +
      "/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[5] +
      "/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[6];
    console.log("Iconfile:" + iconfile);

    console.log(
      "Chance of rain:" + file.forecast.forecastday[day].hour[i].will_it_rain
    );
    if (file.forecast.forecastday[day].day.daily_chance_of_snow != 0)
      console.log(
        "Chance of snow:" + file.forecast.forecastday[day].hour[i].will_it__snow
      );
  }
}
getWheatherAPI("london");
let loc = document.getElementById("location_input");
let button = document.querySelector("button");
button.addEventListener("click", () => {
  getWheatherAPI(loc.value);
});
loc.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWheatherAPI(loc.value);
  }
});
