/* soc-calc
 * calc module
 * Contains all used math functions
 */
export function calculateSoc(temperature, voltage, voltageSystem) {
    const soc = 100-((25.7+(temperature-25)*0.06)-voltage)/0.2775*10;
    return soc.toFixed(0);
}

export function calculateRemaining() {
    return 0;
}
