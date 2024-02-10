// Check if code has been redeemed
function isCodeRedeemed(code) {
    return localStorage.getItem("CodeRedeemed") === code;
}

// Play Match
function play() {
    alert("Starting Match!");
}

// Codes Feature
function importCode() {
    var code = prompt("Enter code:");
    if (code && code.trim() !== "") {
        if (isCodeRedeemed(code)) {
            alert("Code has already been redeemed.");
        } else if (code === "Aydin") {
            alert("Correct! The code " + code + " has been redeemed!");
            console.log("Code " + code + " has been redeemed.");
            localStorage.setItem("CodeRedeemed", code);
        } else {
            alert("Incorrect code. Please try again.");
        }
    } else {
        alert("Invalid code.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var codesButton = document.getElementById("codesButton");
    var playButton = document.getElementById("playButton");

    if (codesButton) {
        codesButton.addEventListener("click", importCode);
    }

    if (playButton) {
        playButton.addEventListener("click", play);
    }
});
