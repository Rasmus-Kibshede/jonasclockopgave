const url = "http://worldtimeapi.org/api/timezone/";
const dropdown = document.querySelector("#dropdown");
const lblTime = document.querySelector("#time");


const lblCity = document.querySelector("#timezone-city");
const lblContinent = document.querySelector("#timezone-continent");
const lblUTC = document.querySelector("#UTC");

fillDropdown(url);

function fillDropdown(url) {
  fetch(url)
    .then(res => res.json())
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].includes('/') && !res[i].includes("Etc")) {
          const dropdownOptions = document.createElement("option");

          const locationName = res[i].split("/");

          dropdownOptions.textContent = locationName[0] + " (" + locationName[1] + ")";
          dropdownOptions.value = res[i];
          dropdown.appendChild(dropdownOptions);
        }
      }
    });
}

let isRunning = true;

async function updateTime(url) {
  isRunning = true;
  dropdown.style.display = "none";

  while (isRunning) {
    await new Promise(f => setTimeout(f, 500));
    worldtimeapiFetch(url);
  }

}

const btnReset = document.querySelector("#reset");

function resetTime() {
  isRunning = false;
  dropdown.style.display = "block";
}

btnReset.addEventListener("click", resetTime);


function worldtimeapiFetch(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const locationName = res.timezone.split("/");

      lblTime.textContent = res.datetime.substring(11, 19);
      lblContinent.textContent = locationName[0];
      lblCity.textContent = locationName[1];
      lblUTC.textContent = "" + res.utc_offset;

      /*{
  "abbreviation": "CET",
  "client_ip": "87.59.14.119",
  "datetime": "2022-02-17T21:01:50.952225+01:00", <----
  "day_of_week": 4,
  "day_of_year": 48,
  "dst": false,
  "dst_from": null,
  "dst_offset": 0,
  "dst_until": null,
  "raw_offset": 3600,
  "timezone": "Europe/Copenhagen", <----
  "unixtime": 1645128110,
  "utc_datetime": "2022-02-17T20:01:50.952225+00:00",
  "utc_offset": "+01:00", <----
  "week_number": 7
        }*/

      /*TODO: lav passende attributter ud fra de markerede JSON værdier som kan manipulerer med klokken  */
      /* Altså vælg tidszone fra drop down, og set uret.*/
    });
}


dropdown.addEventListener("change", () => updateTime(url + dropdown.value));
