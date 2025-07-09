/*
 * Battery SoC calculator
 * Battery chemistry data
 */
const batteryTypes = {
    "lead": {
        "cell": 2.105,
        "sizes": [3,6,12],
        "temperature": 15,
        "tempCoefficient": 0.000556,
        "voltCoefficient": 0.012667
    },
    "agm": {
        "cell": 2.14,               // single cell nominal voltage
        "sizes": [3,6,12],          // number of cells in typical batteries
        "temperature": 25,          // Nomanial at temperature
        "tempCoefficient": 0.005,   // Voltage change per degree K
        "voltCoefficient": 0.023125 // Voltage change per 10% SoC
    },
    "alkaline": {
        "cell": 1.6,
        "sizes": [1, 6],
        "temperature": 0,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.035
    },
    "nimh": {                       // Low accuracy! Voltage is a poor indicator for NiMH
        "cell": 1.40,
        "sizes": [1],
        "temperature": 0,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.0
    },
    "lithium": {                    // Low accuracy!
        "cell": 1.7,
        "sizes": [1, 2, 3, 6],
        "temperature": 0,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.04
    },
    "nicd": {
        "cell": 1.5,
        "sizes": [1, 2, 4, 8],
        "temperature": 20,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.0342
    }/*,
    "lifepo": {                     // LiFePo
        "cell": 0,
        "sizes": [0],
        "temperature": 20,
        "tempCoefficient": 0.0,     // No temperature coefficient recorded
        "voltCoefficient": 0.0      // No voltage coefficient recorded
    }*/
}
