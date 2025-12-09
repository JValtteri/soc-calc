/*
 * Miscellanious functions
 */

import * as bat from "./battery.js"

/*
 * Low level page manipulation functions
 */

/* Clear content of an HTML element
 */
export function clearOptions(element) {
    element.innerHTML='';
}

/*
 * Populates a select (drop-down) element with options
 * element: Target HTML element <select>
 * json:    Data to use
 * func:    Function to process the given data
 */
export function populateSelect(element, json, func) {
    element.removeAttribute("disabled");
    for (const item in json) {
        func(element, json, item);
    }
}

/*
 * Other Misc Functions
 */

/* Converts str to Base64, via uint8
 */
export function base64(str) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(str);
    return btoa(String.fromCharCode(...utf8Bytes));
}

/* Function used to customize uif.populateSelect() function
 */
export function batteryInsert(element, json, item) {
    const name = json[item].name;
    const type = item
    const option = document.createElement('option');
    option.innerText = name;
    option.value = type;
    element.appendChild(option);
}

/* Function used to customize uif.populateSelect() function
 */
export function voltageInsert(element, json, item) {
    const numberOfCells = json[item];
    const nominalVoltage = json[item] * bat.batteryTypeData.cell;
    const name = nominalVoltage.toFixed(1) + " Volts";
    const option = document.createElement('option');
    option.innerText = name;
    option.value = (numberOfCells);
    element.appendChild(option);
}
