/* soc-calc
 * calc module
 * Contains all used math functions
 */
export function calculateSoc(temperature, voltage, cellVoltage=2.14, cells=12, voltCoefficient=0.023125, nominalTemp, tempCoefficient=0.005) {
    const nominalVoltage = cellVoltage*cells;
    const temperatureCorrection = ( temperature - nominalTemp) * tempCoefficient * cells;
    const soc = 100 - ( (nominalVoltage + temperatureCorrection ) - voltage) / (voltCoefficient * cells) * 10;
    return soc.toFixed(0);
}

export function calculateRemaining() {
    return 0;
}
