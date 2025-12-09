import * as cookie from "./cookie.js"
import * as ui from "./ui.js"

/*
 * Buttons Event Listeners
 */

/* Submit button
 */
ui.submitButton.addEventListener("click", () => {
    ui.submit();
});

/* Clear button
 */
ui.clearBtn.addEventListener("click", () => {
    ui.clear();
});

/* On Enter key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        ui.submit();
    }
});

/* On Delete key
 */
body.addEventListener('keydown', (event) => {
    if (event.key === "Delete") {
        ui.clear();
    }
});

/* "Fullscreen" clicked
 */
ui.fullscreenBtn.addEventListener("click", () => {
    ui.toggleFullscreen();
})


/*
 * Other Event Listeners
 */


/* Any input value changed
 */
ui.systemInput.addEventListener("change", ui.update);
ui.typeInput.addEventListener("change", ui.updateVoltageSystem);
ui.voltInput.addEventListener("change", ui.update);
ui.tempInput.addEventListener("change", ui.update);
ui.capacityInput.addEventListener("change", ui.updateRemaining);

/* "Remember Me" clicked
 */
ui.cookieConsent.addEventListener('click', () => {
    if (cookieConsent.checked) {
        cookie.setCookie("length", util.base64(lengthInput.value), "");
    }
});

/* Clicked anywhere on document
 */
body.addEventListener("click", () => {
     if (ui.cookieConsent.checked) {
        if (cookie.getCookie("fullscreen") === "true" ) {
            makeFullscreen();
        }
    }
});

/*
 * Run At Start
 */

// Check concent from cookie
if (cookie.getCookie("consent") === "true" ) {
    ui.cookieConsent.checked = true
}

// Auto search if concented
if (ui.cookieConsent.checked) {
    if (cookie.getCookie("fullscreen") === "true" ) {
        ui.makeFullscreen();
    }
    ui.cookieConsent.checked = true;
    ui.submit();
    ui.activateUI();
}

ui.updateBatteryTypes();
