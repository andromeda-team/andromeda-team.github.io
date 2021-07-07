const gradientStart = document.getElementById('gradientStart');
const gradientEnd = document.getElementById('gradientEnd');
let modeByLetter = document.getElementById('modeByLetter');
let modeByParagraph = document.getElementById('modeByParagraph');
let userInput = document.getElementById('userInput');
let output = document.getElementById('output');
let addition = document.getElementById('addition');
let userAdd = document.getElementById('userAdd');
let isModeByParagraph = false;
let triggers = [userInput, addition, userAdd, gradientStart, gradientEnd];
let array = [];
let text;

modeByLetter.onclick = function () {
    if (!modeByLetter.classList.contains('mode-active')) {
        switchModes();
    }
};

modeByParagraph.onclick = function () {
    if (!modeByParagraph.classList.contains('mode-active')) {
        switchModes();
    }
};

function switchModes() {
    isModeByParagraph = !isModeByParagraph;
    if (isModeByParagraph) {
        modeByLetter.classList.remove('mode-active');
        modeByParagraph.classList.add('mode-active');
    } else {
        modeByLetter.classList.add('mode-active');
        modeByParagraph.classList.remove('mode-active');
    }
    output.innerText = addition.value + " " + generateJSON(userInput.value);
};

setInterval(function () {
    for (const field in triggers) {
        triggers[field].onchange = function () {
            output.innerText = addition.value + " " + generateJSON(userInput.value);
        };
    }
}, 1000)

output.onclick = function () {
    const elm = document.createElement('textarea');
    elm.value = output.innerText;
    document.body.appendChild(elm);
    elm.select();
    document.execCommand('copy');
    document.body.removeChild(elm);
    alert('JSON Component has been copied successfully');
}
// GENERATORS:

function generateJSON(input) {
    array = [];
    text = replaceLineBreaks(userInput.value, " ");

    if (!isModeByParagraph) {
        let colorsArray = interpolateColor(hexToRGB(gradientStart.value), hexToRGB(gradientEnd.value), text.length);
        for (var i = 0; i < userInput.value.length; i++) {
            if (text[i] == ' ') {
                array.push("{\"text\":\"\\n\"" + userAdd.value + "}");
            } else {
                array.push("{\"text\":\"" + text[i] + "\", \"color\":\"" + colorsArray[i] + "\"" + userAdd.value + "}");
            }
        }
    } else {
        let colorsArray = interpolateColor(hexToRGB(gradientStart.value), hexToRGB(gradientEnd.value), text.split(' ').length);
        for (var i = 0; i < text.split(' ').length; i++) {
            array.push("{\"text\":\"" + text.split(' ')[i] + "\", \"color\":\"" + colorsArray[i] + "\"" + userAdd.value + "}");
            if (text.split(' ')[i + 1] !== undefined) {
                array.push("{\"text\":\"\\n\"" + userAdd.value + "}");
            }
        }
    }
    return '["", ' + array + "]";
};

function replaceLineBreaks(str, replacement) {
    return str.replace(/[\r\n]+/gm, replacement);
}


function interpolateColor(color1, color2, length) {
    let gradient = [];
    let factor = 1 / (length - 1);
    let result = color1;
    for (var i = 0; i < length; i++) {
        gradient.push(rgbToHex({ red: result[0], green: result[1], blue: result[2] }))
        for (var j = 0; j < 3; j++) {
            result[j] = Math.round(result[j] + factor * (color2[j] - color1[j]))
        }
    }
    return gradient;
};

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};

function rgbToHex({ red: r, green: g, blue: b }) {
    const prefix = '#';
    const hex = prefix + ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1);
    return hex;
};
