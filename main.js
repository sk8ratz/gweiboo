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


window.addEventListener("load", function () {
  const loader = document.getElementById("loading");
  const content = document.getElementById("content");

  const checkGasPrice = setInterval(function() {
    if (document.getElementById("gasPrice").innerHTML !== "") {
      clearInterval(checkGasPrice);
      loader.classList.add("hide");
      content.style.display = "block";
    }
  }, 500); 
});

const apiKey = process.env.API_KEY;
const gasPriceElement = document.getElementById("gasPrice");

async function getGasPrice() {
  const provider = new ethers.providers.EtherscanProvider("homestead", apiKey);
  const gasPrice = await provider.getGasPrice();
  const gasPriceInGwei = ethers.utils.formatUnits(gasPrice, "gwei");
  return gasPriceInGwei;
}

async function displayGasPrice() {
  const gasPriceInGwei = await getGasPrice();
  const roundedGasPrice = Math.round(gasPriceInGwei);
  gasPriceElement.textContent = roundedGasPrice;
  document.title = roundedGasPrice + " gwei";

  if (roundedGasPrice > 99) {
    gasPriceElement.classList.remove("medium-gas");
    gasPriceElement.classList.remove("low-gas");
    gasPriceElement.classList.add("high-gas");
  } else if (roundedGasPrice > 49) {
    gasPriceElement.classList.remove("high-gas");
    gasPriceElement.classList.remove("low-gas");
    gasPriceElement.classList.add("medium-gas");
  } else {
    gasPriceElement.classList.remove("high-gas");
    gasPriceElement.classList.remove("medium-gas");
    gasPriceElement.classList.add("low-gas");
  }
}

displayGasPrice();
setInterval(displayGasPrice, 5000);

const timeEl = document.getElementById("time");

function updateTime() {
  const now = new Date();
  
  const timeStr = now.getUTCHours().toString().padStart(2, "0") + ":" + 
                   now.getUTCMinutes().toString().padStart(2, "0") + ":" + 
                   now.getUTCSeconds().toString().padStart(2, "0");

  timeEl.textContent = "UTC " + timeStr;
  
  setTimeout(updateTime, 1000);
}

updateTime();