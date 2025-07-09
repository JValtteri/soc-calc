import * as cookie from "./cookie.js"
import * as calc from "./calc.js"
import * as bat from "./battery.js"

const body                 = document.getElementById('body');
// Inputs
const systemInput          = document.getElementById('v-system');
const typeInput            = document.getElementById('bat-type');
const voltInput            = document.getElementById('voltage');
const tempInput            = document.getElementById('temperature');
const capacityInput        = document.getElementById('capacity');
const cookieConsent        = document.getElementById('accept');

// Outputs
const socOc                = document.getElementById('soc-oc');
const socLc                = document.getElementById('soc-lc');
const remainOc             = document.getElementById('remain-oc');
const remainLc             = document.getElementById('remain-lc');

// Tables
const outputTable          = document.getElementById("output");

// Variables
//let systemVoltage          = systemInput.value;
let batteryType            = typeInput.value;
let voltage                = voltInput.value;
let temperature            = tempInput.value;
let maxCapacity            = capacityInput.value;
let batteryTypeData        = null;

let calculated = false;


/* Converts str to Base64, via uint8
 */
function base64(str) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(str);
    return btoa(String.fromCharCode(...utf8Bytes));
}

function activateUI() {
    clearBtn.removeAttribute("disabled");      // Enables a button
    outputTable.removeAttribute("hidden");
}

function hideTables() {
    clearBtn.setAttribute("disabled", "");      // Enables a button
    outputTable.setAttribute("hidden", "");
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        makeFullscreen();
    } else {
        document.exitFullscreen();
        if (cookieConsent.checked === true) {
            cookie.setCookie("fullscreen", "");
        }
    }
}

function makeFullscreen() {
    document.querySelector("body").requestFullscreen()
                                  .catch((TypeError) => {});
    if (cookieConsent.checked === true) {
        cookie.setCookie("fullscreen", "true", ttl*DAY);
    }
}

function updateInputs() {
    //systemVoltage          = systemInput.value;
    batteryType            = typeInput.value;
    voltage                = parseFloat(voltInput.value);
    temperature            = parseFloat(tempInput.value);
    maxCapacity            = parseFloat(capacityInput.value);
}

function updateSoc() {
    const cellVoltage = batteryTypeData.cell;
    const cells = systemInput.value;
    const voltCoefficient = batteryTypeData.voltCoefficient;
    const nominalTemp = batteryTypeData.temperature;
    const tempCoefficient = batteryTypeData.tempCoefficient;
    const soc = calc.calculateSoc(temperature, voltage, cellVoltage, cells, voltCoefficient, nominalTemp, tempCoefficient);
    socOc.textContent = soc + " %";
    const soclc = calc.calculateSoc(temperature, voltage+0.3, cellVoltage, cells, voltCoefficient, nominalTemp, tempCoefficient);
    socLc.textContent = soclc + " %";
}

function updateRemaining() {
    const remain = calc.calculateRemaining();
    remainOc.textContent = remain + " Wh";
    const remainOc = calc.calculateRemaining();
    remainOc.textContent = remainOc + " Wh";
}

function clearOptions(element) {
    element.innerHTML='';
}

function batteryInsert(element, json, item) {
    const name = json[item].name;
    const type = item
    const option = document.createElement('option');
    option.innerText = name;
    option.value = type;
    element.appendChild(option);
}

function voltageInsert(element, json, item) {
    const numberOfCells = json[item];
    const nominalVoltage = json[item]*batteryTypeData.cell;
    const name = nominalVoltage.toFixed(1) + " Volts";
    const option = document.createElement('option');
    option.innerText = name;
    option.value = (numberOfCells);
    element.appendChild(option);
}

function populateSelect(element, json, func) {
    element.removeAttribute("disabled");
    for (const item in json) {
        func(element, json, item);
    }
}

function updateVoltageSystem() {
    const element = systemInput;
    clearOptions(element);
    batteryTypeData = bat.getBatteryType(typeInput.value);
    const cells = batteryTypeData.sizes;
    populateSelect(element, cells, voltageInsert);
}

function updateBatteryTypes() {
    const element = typeInput;
    clearOptions(element);
    const batteries = bat.getBatteryTypes();
    populateSelect(element, batteries, batteryInsert);
    updateVoltageSystem();
}

function update() {
    updateInputs();
    //updateBatteryTypes();
    //updateVoltageSystem();
    if (calculated) {
        updateSoc();
        //color.removeColors(factors);         // Remove any old colors
        //color.setColors(factors);       // Set new colors
    }
}

function submit() {
    calculated = true;
    activateUI();
    update();
}

function clear() {
    clearOutputs();
    clearBtn.setAttribute("disabled", "");
    hideTables();
    calculated = false;
}

/*
 * Buttons and Events
 */

// Buttons
const submitButton  = document.getElementById("submit-button");
const clearBtn      = document.getElementById('clear-button');
const fullscreenBtn = document.getElementById("fullscreen");

/* Submit button
 */
submitButton.addEventListener("click", () => {
    submit();
});

/* Clear button
 */
clearBtn.addEventListener("click", () => {
    clear();
});

/* On Enter key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        submit();
    }
});

/* On Delete key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Delete") {
        clear();
    }
});

/* Any input value changed
 */
systemInput.addEventListener("change", update);
typeInput.addEventListener("change", updateVoltageSystem);
voltInput.addEventListener("change", update);
tempInput.addEventListener("change", update);
//capacityInput.addEventListener("change", update);

/* "Remember Me" clicked
 */
cookieConsent.addEventListener('click', () => {
    if (cookieConsent.checked) {
        cookie.setCookie("length", base64(lengthInput.value), "");
    }
});

/* "Fullscreen" clicked
 */
fullscreenBtn.addEventListener("click", () => {
    toggleFullscreen();
})

/* Clicked anywhere on document
 */
body.addEventListener("click", () => {
     if (cookieConsent.checked) {
        if (cookie.getCookie("fullscreen") === "true" ) {
            makeFullscreen();
        }
    }
});

// Check concent from cookie
if (cookie.getCookie("consent") === "true" ) {
    cookieConsent.checked = true
}

// Auto search if concented
if (cookieConsent.checked) {
    if (cookie.getCookie("fullscreen") === "true" ) {
        makeFullscreen();
    }
    cookieConsent.checked = true;
    submitCalculation();
    activateUI();
}

updateBatteryTypes();
//updateVoltageSystem();
