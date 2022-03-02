const url = "http://worldtimeapi.org/api/timezone/";
const dropdown_Continent = document.querySelector("#dropdown_Continent");
const dropdown_City = document.querySelector("#dropdown_City");
const lblTime = document.querySelector("#time");

const lblCity = document.querySelector("#timezone-city");
const lblContinent = document.querySelector("#timezone-continent");
const lblUTC = document.querySelector("#UTC");

//combine fillDropdown func
function fillDropdown() {
  dropdown_City.style.display = "none";
  let listOfContinents = [];

  fetch(url)
    .then(res => res.json())
    .then(res => res.forEach(data => {
      const locationName = data.split("/");
      if (data.includes('/') && !data.includes("Etc")) {
        if (!listOfContinents.includes(locationName[0])) {
          listOfContinents = locationName[0];

          const dropdownOption = document.createElement("option");
          dropdownOption.textContent = locationName[0];
          dropdownOption.value = locationName[0];
          dropdown_Continent.appendChild(dropdownOption);
        }
      }
    }));
}

function fillDropdownCity() {
  dropdown_City.style.display = "inline-block";
  dropdown_City.textContent = "";
  fetch(url + dropdown_Continent.value)
    .then(res => res.json())
    .then(res => res.forEach(data => {

      const locationName = data.split("/");
      const dropdownOption = document.createElement("option");
      const locationNameLength = locationName.length - 1;

      //remake so that is dynamic and not static
      if (locationName.length === 3) {
        dropdownOption.textContent = locationName[1] + " (" + locationName[locationNameLength] + ")";
        dropdownOption.value = locationName[1] + "/" + locationName[locationNameLength];
      } else {
        dropdownOption.textContent = locationName[locationNameLength];
        dropdownOption.value = locationName[locationNameLength];
      }

      dropdown_City.appendChild(dropdownOption);
    }));
}

function worldtimeapiFetch() {
  fetch(url + (dropdown_Continent.value + "/" + dropdown_City.value))
    .then(res => res.json())
    .then(res => {
      const locationName = res.timezone.split("/");

      lblTime.textContent = res.datetime.substring(11, 19);
      lblContinent.textContent = locationName[0];
      lblCity.textContent = locationName[1];
      lblUTC.textContent = "" + res.utc_offset;
    });
  setTimeout(worldtimeapiFetch, 1000);
}

fillDropdown();

dropdown_Continent.addEventListener('change', fillDropdownCity);
dropdown_City.addEventListener("change", worldtimeapiFetch);
