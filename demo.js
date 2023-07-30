// On page load, retrieve the theme from localStorage (if available) and set it
document.addEventListener("DOMContentLoaded", function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme){
    document.body.classList.add(savedTheme);
  }
});

function darkMode() {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark-mode" : "light";
  localStorage.setItem("theme", theme);
}



function hideLoadingScreen() {
    const loader = document.getElementById("loading");
    loader.classList.add("hide");
  }

  // Wait for 1 second (1000 milliseconds) and then hide the loading screen
  setTimeout(hideLoadingScreen, 500);

// Get the time element
const timeEl = document.getElementById("time");

// Function to update the time every second
function updateTime() {
  // Get the current time
  const now = new Date();
  
  // Format the time as HH:MM:SS
  const timeStr = now.getUTCHours().toString().padStart(2, "0") + ":" + 
                   now.getUTCMinutes().toString().padStart(2, "0") + ":" + 
                   now.getUTCSeconds().toString().padStart(2, "0");

  // Update the time element
  timeEl.textContent = "UTC " + timeStr;
  
  // Call this function again in one second
  setTimeout(updateTime, 1000);
}

// Call the updateTime function to start updating the time
updateTime();





function darkMode() {
  var SetTheme = document.body;

  SetTheme.classList.toggle("dark-mode");
  
  var theme;

  if(SetTheme.classList.contains("dark-mode")){
    console.log("Dark mode");
    theme="DARK";
  }else{
    console.log("Light mode");
    theme="LIGHT";
  }

  localStorage.setItem("PageTheme", JSON.stringify(theme));
  console.log(PageTheme);
}

let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
console.log(GetTheme);

if (GetTheme && GetTheme.theme === "DARK") {
  SetTheme.classList.toggle("dark-mode");
}