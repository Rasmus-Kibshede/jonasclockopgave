const url = "http://worldtimeapi.org/api/timezone/";
const dropdown = document.querySelector("#dropdown");
const lblTime = document.querySelector("#time");
const lblCity = document.querySelector("#timezone-city");
const lblContinent = document.querySelector("#timezone-continent");
const lblUTC = document.querySelector("#UTC");

fillDropdown();

function fillDropdown() {
  fetch(url)
    .then(res => res.json())
    .then(res => res.forEach(data => {
      if (data.includes('/') && !data.includes("Etc")) {
        const dropdownOptions = document.createElement("option");
        const locationName = data.split("/");

        dropdownOptions.textContent = locationName[0] + " (" + locationName[1] + ")";
        dropdownOptions.value = data;
        dropdown.appendChild(dropdownOptions);
      }
    }));
}

function worldtimeapiFetch() {
  fetch(url + dropdown.value)
    .then((res) => res.json())
    .then(res => {
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

  setTimeout(worldtimeapiFetch, 1000);
}


dropdown.addEventListener("change", worldtimeapiFetch);
