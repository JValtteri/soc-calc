/*
 * Battery SoC calculator
 * Battery chemistry data
 */
const batteryTypes = {
    "lead": {
        "name": "Lead Acid",
        "cell": 2.105,
        "sizes": [3,6,12],
        "temperature": 15,
        "tempCoefficient": 0.000556,
        "voltCoefficient": 0.012667
    },
    "agm": {
        "name": "AGM",
        "cell": 2.14,               // single cell nominal voltage
        "sizes": [3,6,12],          // number of cells in typical batteries
        "temperature": 25,          // Nomanial at temperature
        "tempCoefficient": 0.005,   // Voltage change per degree K
        "voltCoefficient": 0.023125 // Voltage change per 10% SoC
    },
    "alkaline": {
        "name": "Alkaline",
        "cell": 1.6,
        "sizes": [1, 6],
        "temperature": 20,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.035
    },
    "nimh": {                       // Low accuracy! Voltage is a poor indicator for NiMH
        "name": "NiMH",
        "cell": 1.50,
        "sizes": [1],
        "temperature": 20,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.03
    },
    "nicd": {
        "name": "NiCd",
        "cell": 1.5,
        "sizes": [1, 2, 4, 8],
        "temperature": 20,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.0342
    },
    "lithium": {                    // Low accuracy!
        "name": "Lithium",
        "cell": 1.7,
        "sizes": [1, 2, 3, 6],
        "temperature": 20,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.04
    },
    "lifepo": {                     // LiFePo
        "name": "LiFePo",
        "cell": 13.6,               // 13.6
        "sizes": [1, 2, 3],
        "temperature": 20,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.10588  // 0.10588
    }
}

export function getBatteryTypes() {
    return batteryTypes;
}

export function getBatteryType(type) {
    return batteryTypes[type];
}
