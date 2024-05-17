document.addEventListener("DOMContentLoaded", () => {
const passwordInput = document.getElementById("strongPasswordValue"),
    CopySucces = document.getElementById("CopySuccess"),
    rangeInput = document.getElementById("rangeInput"),
    rangeValue = document.getElementById("rangeValue"),
    generatePassword = document.querySelector(".generatePassword"),
    entropyDisplay = document.getElementById("entropyDisplay");
    
const options = document.querySelectorAll(".options input");
for (let opt of options) {
    opt.addEventListener("click", generateStrongPassword);
}

generatePassword.addEventListener("click", generateStrongPassword);
rangeInput.addEventListener("input", setPasswordIndicator);
rangeValue.addEventListener("input", setPasswordIndicator);

function setPasswordIndicator() {
    let indicator =
        rangeInput.value <= 8
            ? "weak"
            : rangeInput.value <= 16
                ? "reasonable"
                : "strong";

    passwordInput.parentElement.id = indicator;
    passwordInput.parentElement.title = "Your Generated Password is " + indicator
    generateStrongPassword();
}

function CopyStrongPassword() {
    if (passwordInput.value !== "") {
        CopySuccess.setAttribute("src", "img/check.png");
        navigator.clipboard.writeText(passwordInput.value);

        setTimeout(function () {
            CopySuccess.setAttribute("src", "img/copy.png");
        }, 2000);
    }
}

const Characters = {
    Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Lowercase: "abcdefghijklmnopqrstuvwxyz",
    Numbers: "0123456789",
    Symbols: "~!@#$%^&*()_+{}[].,:;|",
};

function generateStrongPassword() {
    let randomPasswords = "",
        strongPassword = "";
    IsExcludeDuplicate = false;
    options.forEach((option) => {
        if (option.checked && option.id !== "Duplicate") {
            randomPasswords += Characters[option.id];
        }
        if (option.id == "Duplicate" && option.checked) {
            IsExcludeDuplicate = true;
        }
    });

    if (randomPasswords !== "") {
        if (IsExcludeDuplicate && randomPasswords.length < rangeInput.value) {
            alert("We can't get password without Duplicate for selected options");
            passwordInput.value = "";
            updateEntropy(0);
        } else {
            for (let i = 0; i < rangeInput.value; i++) {
                let chatAt = randomPasswords[Math.floor(Math.random() * randomPasswords.length)];

                if (IsExcludeDuplicate) {
                    !strongPassword.includes(chatAt) ? (strongPassword += chatAt) : i--;
                }
                else {
                    strongPassword += chatAt;
                }
            }
            passwordInput.value = strongPassword;
            let entropy = rangeInput.value * Math.log2(randomPasswords.length);
            console.log("Generated Password:", strongPassword);
            console.log("Entropy:", entropy);
            updateEntropy(entropy);
        }
    } else {
        passwordInput.value = "";
        updateEntropy(0);
    }
}

function updateEntropy(entropy) {
    entropyDisplay.textContent = `Entropy: ${entropy.toFixed(2)} bits`;
}

setPasswordIndicator();

});