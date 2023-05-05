window.addEventListener("load", function () {
  const loader = document.getElementById("loading");
  const content = document.getElementById("content");

  // wait for gas price to be loaded
  const checkGasPrice = setInterval(function() {
    if (document.getElementById("gasPrice").innerHTML !== "") {
      clearInterval(checkGasPrice);
      loader.classList.add("hide");
      content.style.display = "block";
    }
  }, 500); // check every 0.5 seconds
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
