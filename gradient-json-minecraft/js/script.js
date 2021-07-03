var root = document.querySelector(':root');
var gradientStart = document.getElementById('gradientStart');
var gradientEnd = document.getElementById('gradientEnd');
var json = document.getElementById('json');
var copyjson = document.getElementById('copyjson');
var run = document.getElementById('run');
const userInput = document.getElementById('userInput');
const userAdd = document.getElementById('userAdd');

gradientStart.onchange = function () {
    root.style.setProperty('--gradientStart', gradientStart.value);
};

gradientEnd.onchange = function () {
    root.style.setProperty('--gradientEnd', gradientEnd.value);
};

copyjson.onclick = function () {
    copyText(json.innerText);
};

function copyText (str) {
    const elm = document.createElement('textarea');
    elm.value = str;
    document.body.appendChild(elm);
    elm.select();
    document.execCommand('copy');
    document.body.removeChild(elm);
    alert('JSON Component has been copied successfully');
};

//  GENERATOR

run.onclick = function () {
    // Create gradient map
    let gradient = [];
    let factor = 1.0;
    let result;
    let array = [];
    let temp = interpolateColor(hexToRGB(gradientStart.value), hexToRGB(gradientEnd.value), userInput.value.length);

    // Generate JSON
    for (var i = 0; i < userInput.value.length; i++) {
        array.push("{\"text\":\"" + userInput.value[i] + "\", \"color\":\"" + temp[i] + "\"" + userAdd.value + "}");
    }
    json.innerText = array;
    var addBrackets = "[" + json.innerText + "]";
    json.innerText = addBrackets;
}

function interpolateColor (color1, color2, length) {
    gradient = [];
    factor = 1 / (length - 1);
    result = color1;
    for (var i = 0; i < length; i++) {
        gradient.push(rgbToHex({red: result[0], green: result[1], blue: result[2]}))
        for (var j = 0; j < 3; j++) {
            result[j] = Math.round(result[j] + factor * (color2[j] - color1[j]))
        }
    }
    return gradient;
};

// CONVERTERS

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  };

 function rgbToHex({red: r, green: g, blue: b}) {
    const prefix = '#';
    const hex = prefix + ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1);
    return hex;
 };