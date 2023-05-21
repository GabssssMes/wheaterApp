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
      if (response.error) printError(true);
      else {
        printError(false);
        file = response;
        initialice();
      }
    })
    .catch(() => {
      slideIndex = -1;
    });
}
function printError(print) {
  const error = document.querySelector(".error");
  if (print == true) error.setAttribute("style", "opacity: 1;");
  else if (print == false) error.setAttribute("style", "opacity: 0;");
}
function setWeatherOfToday(day) {
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

  location.textContent = file.location.name + ", " + file.location.country;
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
    " %</div>";
  wind.innerHTML =
    "<i class='fa-solid fa-wind'></i><div>" +
    file.current.wind_kph +
    " km/h</div>";
  describe.textContent = file.current.condition.text;
  icon.src = iconfile;
}
function setWeatherOfDay(day) {
  const date = document.querySelector(".date");
  const temp = document.querySelector(".temperature");
  const wind = document.querySelector(".wind");
  const icon = document.querySelector("#icon");
  const describe = document.querySelector(".describe");
  const rain = document.querySelector(".rain");
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
    " %</div>";
  wind.innerHTML =
    "<i class='fa-solid fa-wind'></i><div> Up to " +
    file.forecast.forecastday[day].day.maxwind_kph +
    " km/h</div>";
  describe.textContent = file.forecast.forecastday[day].day.condition.text;
  icon.src = iconfile;
}

function initialice() {
  if (slideIndex == -1) {
    slideIndex = 1;
    let loc = document.getElementById("location_input");
    let button = document.querySelector("button");

    button.addEventListener("click", () => {
      slideIndex = 1;
      file = getWheatherAPI(loc.value);
    });
    loc.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        slideIndex = 1;
        file = getWheatherAPI(loc.value);
      }
    });
    prev.addEventListener("click", () => {
      slideIndex--;
      showSlides();
      setHours();
    });
    next.addEventListener("click", () => {
      slideIndex++;
      showSlides();
      setHours();
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        slideIndex = Number(dot.id);
        showSlides();
        setHours();
      });
    });
  }

  showSlides();
  setHours();
}

function showSlides() {
  if (slideIndex == 1) prev.setAttribute("style", "display:none");
  else prev.setAttribute("style", "display:block");
  if (slideIndex == 3) next.setAttribute("style", "display:none");
  else next.setAttribute("style", "display:block");

  for (let i = 0; i < dots.length; i++) {
    if (i == slideIndex - 1)
      dots[i].setAttribute("style", "background-color:white");
    else dots[i].setAttribute("style", "background-color:#bbb");
    if (slideIndex == 1) setWeatherOfToday(0);
    else if (i == slideIndex - 1) setWeatherOfDay(i);
  }
}
function setHours() {
  day = slideIndex - 1;
  for (let i = 0; i < 24; i++) {
    const hours = document.querySelector(".hours");
    if (i == 0) hours.innerHTML = "";
    const hourContainer = document.createElement("div");
    let hour = document.createElement("div");
    let temp = document.createElement("h3");
    let icon = document.createElement("div");
    let rain = document.createElement("h4");
    let iconfile;
    hourContainer.setAttribute("class", "hourContainer item");
    hour.className = "hour item";
    temp.className = "hourTemp item";
    icon.className = "hourIcon item";
    rain.className = "hourRain item";
    if (i < 10) hour.textContent = "0" + i + ":00";
    else hour.textContent = i + ":00";
    temp.innerHTML =
      "<i class='fa-solid fa-temperature-three-quarters'></i><div>" +
      file.forecast.forecastday[day].hour[i].temp_c +
      "°C</div>";
    iconfile =
      "./images/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[3] +
      "/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[4] +
      "/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[5] +
      "/" +
      file.forecast.forecastday[day].hour[i].condition.icon.split("/")[6];
    icon.innerHTML = "<img src=" + iconfile + " style='height:50px' />";
    rain.innerHTML =
      "<i class='fa-solid fa-cloud-rain'></i><div>" +
      file.forecast.forecastday[day].hour[i].will_it_rain +
      "%</div>";

    hourContainer.appendChild(hour);
    hourContainer.appendChild(temp);
    hourContainer.appendChild(rain);
    hourContainer.appendChild(icon);

    hours.appendChild(hourContainer);
  }
}

let slideIndex = -1;
let file;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
getWheatherAPI("Innsbruck");
