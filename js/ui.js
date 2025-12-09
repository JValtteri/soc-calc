/*
 * UI elements amd high level UI functions
 */

import * as util from "./utils.js"
import * as calc from "./calc.js"
import * as bat from "./battery.js"

export const body                 = document.getElementById('body');
// Inputs
export const systemInput          = document.getElementById('v-system');
export const typeInput            = document.getElementById('bat-type');
export const voltInput            = document.getElementById('voltage');
export const tempInput            = document.getElementById('temperature');
export const capacityInput        = document.getElementById('capacity');
export const cookieConsent        = document.getElementById('accept');

// Outputs
const socOc                = document.getElementById('soc-oc');
const socLc                = document.getElementById('soc-lc');
const remainOc             = document.getElementById('remain-oc');
const remainLc             = document.getElementById('remain-lc');

// Tables
export const outputTable          = document.getElementById("output");

// Variables
let batteryType            = typeInput.value;
let voltage                = voltInput.value;
let temperature            = tempInput.value;
let maxCapacity            = capacityInput.value;

let soc                    = null;
let cellVoltage            = null;
let cells                  = null;

let calculated = false;

// Buttons
export const submitButton  = document.getElementById("submit-button");
export const clearBtn      = document.getElementById('clear-button');
export const fullscreenBtn = document.getElementById("fullscreen");


/* Toggle Fullscreen On or Off
 */
export function toggleFullscreen() {
    if (!document.fullscreenElement) {
        makeFullscreen();
    } else {
        document.exitFullscreen();
        if (cookieConsent.checked === true) {
            cookie.setCookie("fullscreen", "");
        }
    }
}

/* Turn on Fullscreen
 */
export function makeFullscreen() {
    document.querySelector("body").requestFullscreen()
                                  .catch((TypeError) => {});
    if (cookieConsent.checked === true) {
        cookie.setCookie("fullscreen", "true", ttl*DAY);
    }
}

/* Activate and show UI elements
 */
export function activateUI() {
    clearBtn.removeAttribute("disabled");      // Enables a button
    outputTable.removeAttribute("hidden");
}

/* Deactivate and hide UI elements
 */
export function deactivateUI() {
    clearBtn.setAttribute("disabled", "");      // Enables a button
    outputTable.setAttribute("hidden", "");
}

/* Updates all calculations
 */
export function update() {
    updateInputs();
    if (calculated) {
        updateSoc();
        updateRemaining();
        //color.removeColors(factors);         // Remove any old colors
        //color.setColors(factors);       // Set new colors
    }
}

/* Used for the first time calculation
 * Activates the UI and
 * Updates all calculations
 */
export function submit() {
    calculated = true;
    activateUI();
    update();
}

/* Clear calculations
 */
export function clear() {
    clearBtn.setAttribute("disabled", "");
    deactivateUI();
    calculated = false;
}

/* Recalculates the Remaining energy and displays it
 */
export function updateRemaining() {
    maxCapacity = parseFloat(capacityInput.value);
    const ampHours = maxCapacity;
    const remain = calc.calculateRemaining(voltage, ampHours, soc);
    remainOc.textContent = remain + " Wh";
}

/* Recalculates the voltage system and populates the select element
 */
export function updateVoltageSystem() {
    const element = systemInput;
    util.clearOptions(element);
    bat.setBatteryTypeData(typeInput.value);
    const cells = bat.batteryTypeData.sizes;
    util.populateSelect(element, cells, util.voltageInsert);
}

/* Fetches the battery types data and populates the select element
 */
export function updateBatteryTypes() {
    const element = typeInput;
    util.clearOptions(element);
    const batteries = bat.getBatteryTypes();
    util.populateSelect(element, batteries, util.batteryInsert);
    updateVoltageSystem();
}

function updateInputs() {
    batteryType            = typeInput.value;
    voltage                = parseFloat(voltInput.value);
    temperature            = parseFloat(tempInput.value);
}

function updateSoc() {
    cellVoltage = bat.batteryTypeData.cell;
    cells = systemInput.value;
    const voltCoefficient = bat.batteryTypeData.voltCoefficient;
    const nominalTemp = bat.batteryTypeData.temperature;
    const tempCoefficient = bat.batteryTypeData.tempCoefficient;
    soc = calc.calculateSoc(temperature, voltage, cellVoltage, cells, voltCoefficient, nominalTemp, tempCoefficient);
    if (soc < 0) {
        soc = 0;
    }
    socOc.textContent = soc + " %";
}

