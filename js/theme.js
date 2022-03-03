const dropdown_theme = document.querySelector("#dropdown_theme");


function themeSelector() {
  const dropdownValue = dropdown_theme.options[dropdown_theme.selectedIndex].value;

  switch (dropdownValue) {
    case "dark":
      themeDark();
      break;
    case "light":
      themeLight();
      break;
  }

}

function themeLight() {

  document.querySelector(".container").classList.add("lightTheme");
  document.querySelector("h1").classList.add("lightTheme");
  document.querySelector("body").classList.add("lightTheme");
  document.querySelector("*").classList.add("lightTheme");

  document.querySelector("#digital-clock").classList.add("lightTheme");
  document.querySelector(".timezone").classList.add("lightTheme");
}

function themeDark() {

  document.querySelector(".container").classList.remove("lightTheme");
  document.querySelector("h1").classList.remove("lightTheme");
  document.querySelector("body").classList.remove("lightTheme");
  document.querySelector("*").classList.remove("lightTheme");

  document.querySelector("#digital-clock").classList.remove("lightTheme");
  document.querySelector(".timezone").classList.remove("lightTheme");
}

dropdown_theme.addEventListener("change", themeSelector);
