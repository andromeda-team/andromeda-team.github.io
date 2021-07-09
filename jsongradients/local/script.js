var output = document.getElementById('output');
let textParameters = ""
let tmp = ""
let array = [];
let text;

// SWITCHER:
const switcherByLetter = document.getElementById('switcher-by-letter');
const switcherByParagraph = document.getElementById('switcher-by-paragraph')
const switcherArray = [switcherByLetter, switcherByParagraph]
let switcherMode = false;

setInterval(() => {
    for (const switcher of switcherArray) {
        switcher.onclick = () => {
            switcherMode = !switcherMode;
            if (switcherMode) {
                switcherByLetter.classList.remove('focus');
                switcherByParagraph.classList.add('focus');
            } else {
                switcherByParagraph.classList.remove('focus');
                switcherByLetter.classList.add('focus');
            }
            build();
        }
    }
}, 1000);

// NORMAL SWITCHER:
var normalSwitcher = document.getElementsByClassName('normal-switcher');
setInterval(() => {
    for (let i = 0; i < normalSwitcher.length; i++) {
        normalSwitcher[i].onclick = () => {
            if (normalSwitcher[i].classList.contains('focus')) {
                normalSwitcher[i].classList.remove('focus');
            } else {
                normalSwitcher[i].classList.add('focus');
            }
            build();
        }
    }
}, 1000);

// BUILD TRIGGERS
const gradientPickerS = document.getElementById('gradientPickerS');
const gradientPickerF = document.getElementById('gradientPickerF');
const userInput = document.getElementById('user-input');
const clickEvent = document.getElementById('click-event');
const hoverEvent = document.getElementById('hover-event');
const command = document.getElementById('command');
const textFields = [gradientPickerS, gradientPickerF, clickEvent, hoverEvent, command, userInput]
setInterval(() => {
    for (let i = 0; i < textFields.length; i++) {
        textFields[i].onchange = () => {
            build();
        }
    }
}, 1000);

// BUILD
function build() {
    output.innerText = command.value + ' ' + generateJSON();
};

function generateJSON() {
    array = [];
    text = replaceLineBreaks(userInput.value, " ");
    if (!switcherMode) {
        let colorsArray = interpolateColor(hexToRGB(gradientPickerS.value), hexToRGB(gradientPickerF.value), text.length);
        textParameters = readParameters();
        for (var i = 0; i < userInput.value.length; i++) {
            if (text[i] == ' ') {
                array.push("{\"text\":\"\\n\"" + textParameters + "}");
            } else {
                array.push("{\"text\":\"" + text[i] + "\", \"color\":\"" + colorsArray[i] + "\"" + textParameters + "}");
            }
        }
    } else {
        let colorsArray = interpolateColor(hexToRGB(gradientPickerS.value), hexToRGB(gradientPickerF.value), text.split(' ').length);
        textParameters = readParameters();
        for (var i = 0; i < text.split(' ').length; i++) {
            array.push("{\"text\":\"" + text.split(' ')[i] + "\", \"color\":\"" + colorsArray[i] + "\"" + textParameters + "}");
            if (text.split(' ')[i + 1] !== undefined) {
                array.push("{\"text\":\"\\n\"" + textParameters + "}");
            }
        }
    }
    return '["", ' + array + "]";
}

// COPY
output.onclick = () => {
    const elm = document.createElement('textarea');
    elm.value = output.innerText;
    document.body.appendChild(elm);
    elm.select();
    document.execCommand('copy');
    document.body.removeChild(elm);
    alert('JSON Component has been copied successfully');
};

// TECHNIQUE FUNCTIONS
function readParameters() {
    tmp = '';
    if (clickEvent.value !== '') {
        tmp = tmp + ', "clickEvent":' + clickEvent.value;
    }
    if (hoverEvent.value !== '') {
        tmp = tmp + ', "hoverEvent":' + hoverEvent.value;
    }
    if (normalSwitcher[0].classList.contains('focus')) {
        tmp = tmp + ', "bold":true'
    }
    if (normalSwitcher[1].classList.contains('focus')) {
        tmp = tmp + ', "italic":true'
    }
    if (normalSwitcher[2].classList.contains('focus')) {
        tmp = tmp + ', "underlined":true'
    }
    if (normalSwitcher[3].classList.contains('focus')) {
        tmp = tmp + ', "strikethrough":true'
    }
    if (normalSwitcher[4].classList.contains('focus')) {
        tmp = tmp + ', "obfuscated":true'
    }
    return tmp;
}

function replaceLineBreaks(str, replacement) {
    return str.replace(/[\r\n]+/gm, replacement);
};

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
