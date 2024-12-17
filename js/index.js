let body = document.body;
let circle = document.querySelector(".circle");
let sunImgBg = document.querySelector("#nightImg");
let bgMover = document.querySelector("#bgSunCloud");
let btnSearch = document.querySelector("#btnSearch")


let h2s = Array.from(document.querySelectorAll("h2"));
let h3s = Array.from(document.querySelectorAll("h3"));
let spans = Array.from(document.querySelectorAll("span"));
let tableIs = Array.from(document.querySelectorAll("td>i"));
let lightMode = Array.from(document.querySelectorAll(".light-mode"));
let lightbinkMode = Array.from(document.querySelectorAll(".bg-bink-light"));
let rightBg = Array.from(document.querySelectorAll(".item-bg"));
let learLeft = document.querySelector(".left>div");
let learRight = document.querySelector(".right>div");
console.log(lightMode);

let searchInput = document.querySelector("#searchInput");

let city = document.querySelector("#city");

let londonTempInput = document.querySelector("#londonTemp");

let londonImgInput = document.querySelector("#londonImg");

let maxSpeedLondonInput = document.querySelector("#maxSpeedLondon");

let minSpeedLondonInput = document.querySelector("#minSpeedLondon");

let barcelonaTempInput = document.querySelector("#barcelonaTemp");

let barcelonaImgInput = document.querySelector("#barcelonaImg");

let maxSpeedbarcelonaInput = document.querySelector("#maxSpeedbarcelona");

let minSpeedbarcelonaInput = document.querySelector("#minSpeedbarcelona");

let i1 = document.querySelector("#i1");
let i2 = document.querySelector("#i2");
// let btnClear = document.querySelector("#btClearAll");

let locationSearch = document.querySelector("#location");

let nightModeInput = document.querySelector(".night-mode");
let iNight = document.querySelector(".iNight");
let imgRight = document.querySelector("#img");
console.log(imgRight);

let date = document.querySelector("#datehear");
let wheather = document.querySelector("#wheather");

let rightBigTemp = document.querySelector(".TC");

let bigImgRight = document.querySelector(".bigImg");

let pressure = document.querySelector("#pressure");
let Humidity = document.querySelector("#Humidity");
let wind = document.querySelector("#wind");

let toDayC = document.getElementById("todayC");
let todayimg = document.getElementById("todayimg");

let max = Array.from(document.querySelectorAll(".max"));
let min = Array.from(document.querySelectorAll(".min"));

let imgBill = Array.from(document.querySelectorAll(".imgBill"));
console.log(imgBill[1]);

let humBill = Array.from(document.querySelectorAll(".humBill"));

let temBill = Array.from(document.querySelectorAll(".temBill"));
console.log(humBill[1]);
console.log(temBill[1]);

let londonDiv = document.querySelector(".london");
let barcelonaDiv = document.querySelector(".barcelona");

let day1 = document.querySelector("#day1");
let day2 = document.querySelector("#day2");
let day3 = document.querySelector("#day3");

let termometer = document.querySelector("#termometer");
/////////////////////////////////////////////////////////
// to clear search input onclick
// btnClear.addEventListener("click", function () {
//   searchInput.value = null;
//   removeI();
// });
function removeI() {
  i1.classList.add("d-none");
  i2.classList.add("d-none");
}
searchInput.addEventListener("focus", function () {
  removeI();
});
///////////////////////////////////////////////////////////
let week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let arr = [];
let light = Array.from(document.querySelectorAll(".light>span.day"));


console.log(light);

async function mysearch() {
  let x = await getCurrentDate(searchInput.value);
  date.innerHTML = `<span class="fs-4 fw-bold text-black-50">${x}</span>`;

  console.log("/////////////////////////");
  let dddat = new Date(date.innerText);
  let bn = dddat.getDay();
  // console.log(getDay(date.innerText));
  console.log(light[0]);

  light[0].innerText = `${ week[bn + 1]}`;
  light[1].innerText = `${week[bn + 2]}`;
  light[2].innerText = `${week[bn + 3]}`;

  console.log("/////////////////////////");

  x = await getCurrentTempF(searchInput.value);
  wheather.innerText = `${x} F`;
  x = await getCurrentTemp(searchInput.value);
  rightBigTemp.innerText = `${x} C`;
  toDayC.innerText = x;
  x = await getFullDate(searchInput.value);
  let srcValue = await x.current.condition.icon;
  bigImgRight.setAttribute("src", srcValue);
  todayimg.setAttribute("src", srcValue);
  let locaValue = await x.location.name;
  locationSearch.innerText = locaValue;
  let Humi = await x.current.humidity;
  Humidity.innerText = `${Humi} %`;
  let pres = await x.current.pressure_mb;
  pressure.innerText = `${pres} milli bar`;
  let win = await x.current.wind_kph;
  wind.innerText = `${win} k/hr`;
  x = await getMaxMin(searchInput.value);

  for (let index = 0; index < max.length; index++) {
    max[index].innerText = `${x[0]} C`;
  }
  for (let index = 0; index < min.length; index++) {
    min[index].innerText = `${x[1]} C`;
  }

  for (let i = 0; i < imgBill.length; i++) {
    let y = i;
    x = await getNextDay(searchInput.value, y++);
    imgBill[i].setAttribute("src", `${x[0]}`);
    humBill[i].innerText = `${x[1]}%`;
    temBill[i].innerText = `${x[2]} C`;
  }

  check();
}
////////////////////////////////////////////////////////////////
function check() {
  if (locationSearch.innerText == "London") {
    activeLondon();
    disActiveBarcelona();
    console.log("london true");
    // <h3 id="location" class="text-white-50">Barcarena</h3>
  } else if (locationSearch.innerText == "Barcelona") {
    activeBarcelona();
    disActiveLondon();
    console.log("barca true");
  } else {
    disActiveBarcelona();
    disActiveLondon();
    console.log("dis activated all");
  }
}


btnSearch.addEventListener("click", async function () {
  mysearch();

  check();
})


searchInput.addEventListener("blur", async function () {
  mysearch();

  check();
  // let intervalId = setInterval(() => {
  //   check() ;
  //   console.log('Executing repetitive task...');
  //   }, 10);

  //   // Stop the interval after 5 seconds
  //   setTimeout(() => {
  //   clearInterval(intervalId);
  //   console.log('Interval stopped after 10 seconds.');
  //   }, 100);
});

document.addEventListener("keydown", function (e) {
  // console.log(e);
  if (e.key == "Enter") {
    console.log(" user enter the kay Enter key down");

    mysearch();

    console.log("locationSearch.innerText =", locationSearch.innerText);
    console.log(locationSearch.innerText);
    console.log(locationSearch);

    check();

    //  let intervalId = setInterval(() => {
    //   check() ;
    //   console.log('Executing repetitive task...');
    //   }, 5);

    //   // Stop the interval after 5 seconds
    //   setTimeout(() => {
    //   clearInterval(intervalId);
    //   console.log('Interval stopped after 10 seconds.');
    //   }, 500);
  }
});

// document.addEventListener("keyup", function (e) {
//   // console.log(e);
//   if (e.key == "Enter") {
//     console.log('//////////////////////////////');

// console.log(" user enter the kay Enter key up");

//        mysearch();

//        console.log(`locationSearch.innerText == "London"` , locationSearch.innerText == 'London' );
//        console.log(`locationSearch.innerText == "Barcelona"` , locationSearch.innerText == 'Barcelona');
//  setInterval( check ,20 );

//   }
// });
///////////////////////////////////////////////////////////////////
learLeft.classList.add("light-lear");
learLeft.classList.remove("dark-lear");
learRight.classList.add("light-lear");
learRight.classList.remove("dark-lear");
//////////////////////////////////////////////////////////////////
let time = 1;
let daySpan = Array.from(document.querySelectorAll(".day"));
console.log(daySpan);

nightModeInput.addEventListener("click", function () {
  if (time == 0) {
    body.classList.remove("bgJs");
    circle.classList.remove("circleJs");
    iNight.innerHTML = `<i class="fa-solid fa-sun ms-4 fs-2"></i>`;
    sunImgBg.setAttribute("src", "img/icons8-sun-48.png");
    bgMover.classList.remove("sunbackgroundjs");
    bgMover.classList.add("sunbackground");
    imgRight.classList.remove("w2-300px");
    imgRight.classList.add("w-300px");

    for (let i = 1; i < h2s.length; i++) {
      h2s[i].classList.add("black-font");
      h2s[i].classList.remove("white-font");
    }

      // daySpan[1].classList.add("black-font");
      // daySpan[1].classList.remove("white-font");
      // daySpan[2].classList.add("black-font");
      // daySpan[2].classList.remove("white-font");
      // daySpan[3].classList.add("black-font");
      // daySpan[3].classList.remove("white-font");

    for (let i = 1; i < h3s.length; i++) {
      h3s[i].classList.add("black-font");
      h3s[i].classList.remove("white-font");
    }

    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.add("black-font");
      spans[i].classList.remove("white-font");
    }

    for (let i = 0; i < tableIs.length; i++) {
      tableIs[i].classList.add("black-font");
      tableIs[i].classList.remove("white-font");
    }

    for (let i = 0; i < lightMode.length; i++) {
      lightMode[i].classList.add("light-mode");
      lightMode[i].classList.remove("night-modee");
    }

    for (let i = 0; i < lightbinkMode.length; i++) {
      lightbinkMode[i].classList.add("bg-bink-light");
      lightbinkMode[i].classList.remove("bg-bink-dark");
    }

    for (let i = 0; i < rightBg.length; i++) {
      rightBg[i].classList.add("item-bg-dark");
      rightBg[i].classList.remove("item-bg");
    }

console.log(day1);


    day1.classList.add("text-dark");
    day1.classList.remove("text-white");
    day2.classList.add("text-dark");
    day2.classList.remove("text-white");
    day3.classList.add("text-dark");
    day3.classList.remove("text-white");
    

    termometer.classList.add("text-dark")
    termometer.classList.remove("text-white")



    // for (let i = 0; i < lightSpan.length; i++) {
    //   lightSpan[i].classList.add("text-dark")
    //   lightSpan[i].classList.remove("text-white")
    // }

    learLeft.classList.add("light-lear");
    learLeft.classList.remove("dark-lear");
    learRight.classList.add("light-lear");
    learRight.classList.remove("dark-lear");

    time = 1;

    disActiveBarcelona();
    disActiveLondon();
    console.log(
      `if ( locationSearch.innerText == "London" ) :`,
      locationSearch.innerText == "London"
    );

    if (locationSearch.innerText == "London") {
      activeLondon();
    }
    if (locationSearch.innerText == "Barcelona") {
      activeBarcelona();
    }


  } else {


    body.classList.add("bgJs");
    circle.classList.add("circleJs");
    iNight.innerHTML = `<i class="fa-solid fa-moon ms-4 fs-2 text-white"></i>`;
    sunImgBg.setAttribute(
      "src",
      "img/vecteezy_ai-generated-3d-cloud-clip-art_40190657.png"
    );
    bgMover.classList.add("sunbackgroundjs");
    bgMover.classList.remove("sunbackground");
    imgRight.classList.add("w2-300px");
    imgRight.classList.remove("w-300px");

    for (let i = 0; i < h2s.length; i++) {
      h2s[i].classList.remove("black-font");
      h2s[i].classList.add("white-font");
    }

    for (let i = 1; i < daySpan.length; i++) {
      daySpan[i].classList.remove("black-font");
      daySpan[i].classList.add("white-font");
    }

    for (let i = 0; i < h3s.length; i++) {
      h3s[i].classList.remove("black-font");
      h3s[i].classList.add("white-font");
    }

    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.remove("black-font");
      spans[i].classList.add("white-font");
    }

    for (let i = 0; i < tableIs.length; i++) {
      tableIs[i].classList.remove("black-font");
      tableIs[i].classList.add("white-font");
    }

    for (let i = 0; i < lightMode.length; i++) {
      lightMode[i].classList.remove("light-mode");
      lightMode[i].classList.add("night-modee");
    }

    for (let i = 0; i < lightbinkMode.length; i++) {
      lightbinkMode[i].classList.remove("bg-bink-light");
      lightbinkMode[i].classList.add("bg-bink-dark");
    }

    for (let i = 0; i < rightBg.length; i++) {
      rightBg[i].classList.remove("item-bg-dark");
      rightBg[i].classList.add("item-bg");
    }


    day1.classList.remove("text-dark");
    day1.classList.add("text-white");
    console.log(` day1.classList.add("text-white");`);
    
    day2.classList.remove("text-dark");
    day2.classList.add("text-white");
    day3.classList.remove("text-dark");
    day3.classList.add("text-white");

    termometer.classList.remove("text-dark")
    termometer.classList.add("text-white")



    console.log("day reachesss");
    
    learLeft.classList.remove("light-lear");
    learLeft.classList.add("dark-lear");
    learRight.classList.remove("light-lear");
    learRight.classList.add("dark-lear");

    time = 0;

    disActiveBarcelona();
    disActiveLondon();
    console.log(
      `if ( locationSearch.innerText == "London" ) :`,
      locationSearch.innerText == "London"
    );

    if (locationSearch.innerText == "London") {
      activeLondon();
    }
    if (locationSearch.innerText == "Barcelona") {
      activeBarcelona();
    }
  }
});
//////////////////////////////////////////////////////////////////
async function getFullDate(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  // console.log(obj.current.last_updated);
  let x = await obj;
  return x;
}

async function getCurrentDate(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  console.log(obj.current.last_updated);
  let x = await obj.current.last_updated;
  console.log(x);

  let [date1] = x.split(" ");
  // console.log("x=", x, "date", date1);
  return date1;
}

async function getCurrentTempF(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  // console.log(obj.current.temp_f);
  let x = await obj.current.temp_f;
  // console.log(obj.current);
  // console.log(obj);
  return x;
}

async function getCurrentTemp(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  // console.log(obj.current.temp_c);
  let x = await obj.current.temp_c;
  return x;
}
async function getHumidity(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  // console.log(obj.current.humidity);
  return obj.current.humidity;
}
async function getSpeed(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  // console.log(obj.current.wind_kph);
  return obj.current.wind_kph;
}

/////////////////////////
async function getMaxMin(city) {
  let response = await fetch(
    `http://api.weatherapi.com/v1//forecast.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  let x = await obj.forecast.forecastday[0].day;
  // console.log(x);

  // console.log("max tem =", x.maxtemp_c);
  // console.log("min tem =", x.mintemp_c);
  let max = await x.maxtemp_c;
  let min = await x.mintemp_c;
  return [max, min];
}
async function getAvg(city) {
  let response = await fetch(
    `http://api.weatherapi.com/v1//forecast.json?key=75d87ba07b0543d1967213904241312&q=${city}`
  );
  let obj = await response.json();
  let x = await obj.forecast.forecastday[0].day.avgtemp_c;
  // console.log("avg tem =", x);
  // console.log(x[0].day.avgtemp_c);
  return x;
}
async function getNextDay(city, index) {
  let response = await fetch(
    `http://api.weatherapi.com/v1//forecast.json?key=75d87ba07b0543d1967213904241312&q=${city}&days=7`
  );
  let obj = await response.json();
  let x = await obj.forecast.forecastday[index].day;
  let avgt = await x.avgtemp_c;
  let avghumi = await x.avghumidity;
  let cond = await x.condition.icon;

  // console.log("obj =", x, "avgt =", avgt, "avg hum =", avghumi, " img =", cond);
  // console.log(x[0].day.avgtemp_c);
  return [cond, avghumi, avgt];
}
getNextDay("london", 1);

// async function llll () {
//   let uuuuuuu = await getMaxMin("london")
//   console.log(uuuuuuu);
// }
// llll ()

getAvg("london");
searchInput.addEventListener("input", async function () {
  LONDONImg();
});

searchInput.addEventListener("input", async function () {
  barcelonaImg();
});

let maxLondon = document.querySelector("#maxLondon");
let minLondon = document.querySelector("#minLondon");

let maxbarcelona = document.querySelector("#maxbarcelona");
let minbarcelona = document.querySelector("#minbarcelona");

async function barcelonaImg() {
  let x = await getCurrentTemp("barcelona");
  // console.log(x);
  barcelonaTempInput.innerHTML = x;

  if (x >= -20 && x <= 0) {
    londonImgInput.innerHTML = `<img class=" img-cloud-lef w-400px" src="img/snow.png" alt="">`;
  }
  // if (x > 0 && x < 10) {
  //   barcelonaImgInput.innerHTML = `<img class=" img-cloud-lef w-400px"src="img/vecteezy_weather-sky-cloud-3d-render-icon_34923181.png" alt="">`;
  // }
  if (x > 0 && x < 19) {
    barcelonaImgInput.innerHTML = `<img class=" img-cloud-lef w-400px"src="img/vecteezy_ai-generated-3d-cloud-clip-art_40190657.png" alt="">`;
  }

  if (x >= 19) {
    barcelonaImgInput.innerHTML = `<img class=" img-cloud-lef w-400px" src="img/icons8-sun-48.png" alt="">`;
  }

  x = await getMaxMin("barcelona");
  maxbarcelona.innerText = `${x[0]} C`;
  minbarcelona.innerText = `${x[1]} C`;
}
barcelonaImg();

async function LONDONImg() {
  let x = await getCurrentTemp("london");
  // console.log(x);
  londonTempInput.innerHTML = x;

  if (x >= -20 && x <= 0) {
    londonImgInput.innerHTML = `<img class=" img-cloud-lef w-400px" src="img/snow.png" alt="">`;  }
  // if (x > 0 && x < 10) {
  //   londonImgInput.innerHTML = `<img class=" img-cloud-lef w-400px "src="img/vecteezy_weather-sky-cloud-3d-render-icon_34923181.png" alt="">`;
  // }
  if (x > 0 && x < 19) {
    londonImgInput.innerHTML = `<img class=" img-cloud-lef w-400px"src="img/vecteezy_ai-generated-3d-cloud-clip-art_40190657.png" alt="">`;
  }
  // if (x > 18 && x < 23) {
  //   londonImgInput.innerHTML = `<img class=" img-cloud-lef w-400px" src="img/snow.png" alt="">`;
  // }
  if (x >= 19) {
    londonImgInput.innerHTML = `<img class=" img-cloud-lef w-400px" src="img/icons8-sun-48.png" alt="">`;
  }

  x = await getMaxMin("london");
  maxLondon.innerText = `${x[0]} C`;
  minLondon.innerText = `${x[1]} C`;
}
LONDONImg();

getSpeed("cairo");
getCurrentTemp("london");
getHumidity("cairo");

////////////////////////////////////////

londonDiv.addEventListener("click", function (e) {
  searchInput.value = "london";
  mysearch();

  activeLondon();
  disActiveBarcelona();
});

barcelonaDiv.addEventListener("click", function (e) {
  searchInput.value = "barcelona";
  mysearch();

  activeBarcelona();
  disActiveLondon();
});

function activeBarcelona() {
  removeI();

  if (time == 0) {
    // dark mode
    rightBg[1].classList.add("item-bg2");
    rightBg[1].classList.remove("item-bg");
    rightBg[1].classList.remove("item-bg-dark2");
    rightBg[1].classList.remove("item-bg-dark");

    console.log("time", time);
  } else if (time == 1) {
    // light mode
    rightBg[1].classList.remove("item-bg");
    rightBg[1].classList.add("item-bg-dark2");
    rightBg[1].classList.remove("item-bg-dark");
    rightBg[1].classList.remove("item-bg2");
    console.log("time", time);
  }
}

function disActiveBarcelona() {
  if (time == 0) {
    // dark mode
    rightBg[1].classList.remove("item-bg2");
    rightBg[1].classList.add("item-bg");
    rightBg[1].classList.remove("item-bg-dark2");
    rightBg[1].classList.remove("item-bg-dark");
  } else if (time == 1) {
    // light mode
    rightBg[1].classList.remove("item-bg");
    rightBg[1].classList.remove("item-bg-dark2");
    rightBg[1].classList.add("item-bg-dark");
    rightBg[1].classList.remove("item-bg2");
  }
}

function activeLondon() {
  removeI();

  if (time == 0) {
    // dark mode
    rightBg[0].classList.add("item-bg2");
    rightBg[0].classList.remove("item-bg");
    rightBg[0].classList.remove("item-bg-dark2");
    rightBg[0].classList.remove("item-bg-dark");

    console.log("time", time);
  } else if (time == 1) {
    // light mode
    rightBg[0].classList.remove("item-bg");
    rightBg[0].classList.add("item-bg-dark2");
    rightBg[0].classList.remove("item-bg-dark");
    rightBg[0].classList.remove("item-bg2");
    console.log("time", time);
  }
}

function disActiveLondon() {
  if (time == 0) {
    // dark mode
    rightBg[0].classList.remove("item-bg2");
    rightBg[0].classList.add("item-bg");
    rightBg[0].classList.remove("item-bg-dark2");
    rightBg[0].classList.remove("item-bg-dark");
  } else if (time == 1) {
    // light mode
    rightBg[0].classList.remove("item-bg");
    rightBg[0].classList.remove("item-bg-dark2");
    rightBg[0].classList.add("item-bg-dark");
    rightBg[0].classList.remove("item-bg2");
  }
}

// document.addEventListener("click", function (e) {
//   if (e.currentTarget == londonDiv) {
//     e.stopPropagation;
//   }
//   // console.log("eeeeeeee= " ,e.target);

//   arr.push(`${searchInput.value}`);
//   localStorage.setItem("key", JSON.stringify(arr));

//   if (locationSearch.innerText !== "london") {
//     if (time == 0) {
//       // dark mode
//       rightBg[0].classList.remove("item-bg2");
//       rightBg[0].classList.add("item-bg");
//       rightBg[0].classList.remove("item-bg-dark2");
//     } else if (time == 1) {
//       // light mode
//       rightBg[0].classList.remove("item-bg-dark2");
//       rightBg[0].classList.add("item-bg-dark");
//       rightBg[0].classList.remove("item-bg2");
//     }
//   }
// });

async function firstSearch(lat, long) {
  let response = await fetch(
    `http://api.weatherapi.com/v1//forecast.json?key=75d87ba07b0543d1967213904241312&q=${lat},${long}`
  );

  let x = await response.json();

  locationSearch.innerText = await x.location.name;
  let mohamed = locationSearch.innerText ;
  console.log(x);

  searchInput.value = locationSearch.innerText;
  console.log(x);
  
console.log(searchInput.value);

  ///////////////////////////////////////////////

   x = await getCurrentDate(searchInput.value);
  date.innerHTML = `<span class="fs-4 fw-bold text-black-50">${x}</span>`;

  console.log("/////////////////////////");
  let dddat = new Date(date.innerText);
  let bn = dddat.getDay();
  // console.log(getDay(date.innerText));
  console.log(light[0]);

  day1.innerText = `${week[bn + 1]}`;
  day2.innerText = `${week[bn + 2]}`;
  day3.innerText = `${week[bn + 3]}`;
  // light[1].innerHTML = ` <span id="day3" class="mt-4 day fs-4">${
  //   week[bn + 2]
  // }</span>`;
  // light[2].innerHTML = ` <span id="day3" class="mt-4 day fs-4">${
  //   week[bn + 3]
  // }</span>`;

  console.log("/////////////////////////");

  x = await getCurrentTempF(searchInput.value);
  wheather.innerText = `${x} F`;
  x = await getCurrentTemp(searchInput.value);
  rightBigTemp.innerText = `${x} C`;
  toDayC.innerText = x;
  x = await getFullDate(searchInput.value);
  let srcValue = await x.current.condition.icon;
  bigImgRight.setAttribute("src", srcValue);
  todayimg.setAttribute("src", srcValue);
  let locaValue = await x.location.name;
  locationSearch.innerText = locaValue;
  let Humi = await x.current.humidity;
  Humidity.innerText = `${Humi} %`;
  let pres = await x.current.pressure_mb;
  pressure.innerText = `${pres} milli bar`;
  let win = await x.current.wind_kph;
  wind.innerText = `${win} k/hr`;
  x = await getMaxMin(searchInput.value);

  for (let index = 0; index < max.length; index++) {
    max[index].innerText = `${x[0]} C`;
  }
  for (let index = 0; index < min.length; index++) {
    min[index].innerText = `${x[1]} C`;
  }

  for (let i = 0; i < imgBill.length; i++) {
    let y = i;
    x = await getNextDay(searchInput.value, y++);
    imgBill[i].setAttribute("src", `${x[0]}`);
    humBill[i].innerText = `${x[1]}%`;
    temBill[i].innerText = `${x[2]} C`;
  }

  check();

  console.log('dayyyy :' , day1 , day2 , day3 );

  

  if ( searchInput.value == mohamed ) {
    searchInput.value = null ;
  }

  i1.classList.remove("d-none");
  i2.classList.remove("d-none");
  ////////////////////////////////////////////

}

navigator.geolocation.getCurrentPosition(function (rr) {
  console.log("location", rr);
  console.log(rr.coords.latitude);
  console.log(rr.coords.longitude);

  firstSearch(rr.coords.latitude, rr.coords.longitude);
});
