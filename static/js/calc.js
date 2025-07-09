/* soc-calc
 * calc module
 * Contains all used math functions
 */


export function calculateSoc(temperature, voltage, cellVoltage, cells, voltCoefficient, nominalTemp, tempCoefficient) {
    const nominalVoltage = cellVoltage*cells;
    const temperatureCorrection = ( temperature - nominalTemp) * tempCoefficient * cells;
    const soc = 100 - ( (nominalVoltage + temperatureCorrection ) - voltage) / (voltCoefficient * cells) * 10;
    return soc.toFixed(0);
}

export function calculateRemaining(voltage, ampHours, stateOfCharge) {
    const remainingEnergy = voltage*ampHours*stateOfCharge/100;
    return remainingEnergy;
}
