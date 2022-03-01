const url = "http://worldtimeapi.org/api/timezone/";
const dropdown_Continent = document.querySelector("#dropdown_Continent");
const dropdown_City = document.querySelector("#dropdown_City");
const lblTime = document.querySelector("#time");

const lblCity = document.querySelector("#timezone-city");
const lblContinent = document.querySelector("#timezone-continent");
const lblUTC = document.querySelector("#UTC");


fillDropdown(url);

function fillDropdown(url) {
  let listOfContinents = [];
  fetch(url)
    .then(res => res.json())
    .then((res) => {
      for (let i = 0; i < res.length; i++) {

        const locationName = res[i].split("/");
        if (res[i].includes('/') && !res[i].includes("Etc")) {
          if (!listOfContinents.includes(locationName[0])) {
            listOfContinents = locationName[0];
            fillDropdownContinent(locationName);
          }
        }
      }
    });
}

function fillDropdownContinent(locationName) {
  const dropdownOption = document.createElement("option");
  dropdownOption.textContent = locationName[0];
  dropdownOption.value = locationName[0];
  dropdown_Continent.appendChild(dropdownOption);
}


function fillDropdownCity() {
  console.log(url + dropdown_Continent.value);
  fetch(url + dropdown_Continent.value)
    .then(con => con.json())
    .then(con => {

      dropdown_City.textContent = "";
      for (let i = 0; i < con.length; i++) {
        const locationName = con[i].split("/");
        const dropdownOption = document.createElement("option");

        dropdownOption.textContent = locationName[1];
        dropdownOption.value = locationName[1];
        dropdown_City.appendChild(dropdownOption);
      }
    });

}


async function updateTime(url) {
  while (true) {
    await new Promise(f => setTimeout(f, 10));
    worldtimeapiFetch(url)
  }
}

function worldtimeapiFetch(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const locationName = res.timezone.split("/");

      lblTime.textContent = res.datetime.substring(11, 19);
      lblContinent.textContent = locationName[0];
      lblCity.textContent = locationName[1];
      lblUTC.textContent = "" + res.utc_offset;
    });
}

dropdown_Continent.addEventListener('change', fillDropdownCity);
dropdown_City.addEventListener("change", () => updateTime(url + (dropdown_Continent.value + "/" + dropdown_City.value)));
