const TEXT_DECREASE = 0;
const TEXT_INCREASE = 1;
const CONTRAST_TOGGLE = 2;

var enableContrast = false;
var contrastAppended = false;
var contrastLink;
var fontSize = 16;

function accessibilityEvent(e) {
    if (e == CONTRAST_TOGGLE) {
        enableContrast = !enableContrast;
    } else if (e == TEXT_INCREASE && fontSize < 50) {
        fontSize += 5;
    } else if (e == TEXT_DECREASE && fontSize > 12) {
        fontSize -= 5;
    }

    console.log(fontSize);

    updateAccessibility();
}

function updateAccessibility() {
    if (enableContrast && !contrastAppended) {
        contrastAppended = true;
        document.head.appendChild(contrastLink);
    } else if (!enableContrast && contrastAppended) {
        contrastLink.remove();
    }

    document.body.style.fontSize = fontSize + "px";
    localStorage.setItem("enableContrast", enableContrast);
    localStorage.setItem("fontSize", fontSize);
}

window.onload = function () {
    contrastLink = document.createElement("link");
    contrastLink.rel = "stylesheet";
    contrastLink.type = "text/css";
    contrastLink.href = "contrast.css";

    var temp;

    temp = localStorage.getItem("fontSize");
    if (temp != null) {
        fontSize = parseInt(temp);
    }
    
    temp = localStorage.getItem("enableContrast");
    enableContrast = (temp == "true");

    updateAccessibility();
};