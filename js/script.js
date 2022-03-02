const url = "http://worldtimeapi.org/api/timezone/";
const dropdown_Continent = document.querySelector("#dropdown_Continent");
const dropdown_City = document.querySelector("#dropdown_City");
const lblTime = document.querySelector("#time");

const lblCity = document.querySelector("#timezone-city");
const lblContinent = document.querySelector("#timezone-continent");
const lblUTC = document.querySelector("#UTC");

fillDropdown();

//combine fillDropdown func

function fillDropdown() {
  dropdown_City.style.display = "none";
  let listOfContinents = [];

  //remake the loop (res.foreach) and so on
  fetch(url)
    .then(res => res.json())
    .then(res => {
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
  dropdown_City.style.display = "inline-block";

  //remake the loop (con.foreach) and so on
  fetch(url + dropdown_Continent.value)
    .then(con => con.json())
    .then(con => {
      dropdown_City.textContent = "";

      for (let i = 0; i < con.length; i++) {
        const locationName = con[i].split("/");
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
      }
    });
}

function updateTime() {
  setTimeout(updateTime, 1000);
  worldtimeapiFetch()
}

function worldtimeapiFetch() {
  fetch(url + (dropdown_Continent.value + "/" + dropdown_City.value))
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
dropdown_City.addEventListener("change", () => updateTime());
