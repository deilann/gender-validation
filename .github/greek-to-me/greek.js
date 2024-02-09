function sortDiacritics(unsorted) {
    let toSort = unsorted.split('');
    toSort.sort((a, b) => {
        let order = ')\\/=+&|';
        return order.indexOf(a) - order.indexOf(b); 
    });
    return toSort.join('');
}

function convertToBeta(str) {
    const charMap = {'913': '*a', '945': 'a', '914': '*b', '946': 'b', '915': '*g', '947': 'g', '916': '*d', '948': 'd', '917': '*e', '949': 'e', '988': '*v', '989': 'v', '918': '*z', '950': 'z', '919': '*h', '951': 'h', '920': '*q', '952': 'q', '921': '*i', '953': 'i', '922': '*k', '954': 'k', '923': '*l', '955': 'l', '924': '*m', '956': 'm', '925': '*n', '957': 'n', '926': '*c', '958': 'c', '927': '*o', '959': 'o', '928': '*p', '960': 'p', '929': '*r', '961': 'r', '931': '*s', '963': 's', '962': 's', '1017': '*c', '1010': 'c', '932': '*t', '964': 't', '933': '*u', '965': 'u', '934': '*f', '966': 'f', '935': '*x', '967': 'x', '936': '*y', '968': 'y', '937': '*w', '969': 'w', '46': '.', '44': ',', '183': ':', '59': ';', '8217': '\'', '8208': '-', '8212': '_', '697': '#', '32': ' ', '58': ':'};
    const diacriticMap = {'787': ')', '788': '(', '769': '/', '834': '=', '768': '\\', '776': '+', '837': '|', '772': '&'};
    let converted = '';
    let errorFree = '';
    let errors = [];
    for (let char of str) {
        let code = char.codePointAt(0);
        if (code in charMap) {
            converted += charMap[code];
            errorFree += charMap[code];
        } else {
            let decomposed = char.normalize('NFD');
            let error = '';
            let diacritics = '';
            let letter = '';
            for (let bit of decomposed) {
                let bitCode = bit.codePointAt(0);
                if (bitCode in charMap) {
                    letter += charMap[bitCode];
                } else if (bitCode in diacriticMap) {
                    diacritics += diacriticMap[bitCode];
                } else {
                    error += String.fromCharCode(bitCode);
                }
            }
            if (error.length > 0) {
                converted += '{' + char + '}';
                errors.push(error);
            } else {
                converted += letter + sortDiacritics(diacritics);
                errorFree += letter + sortDiacritics(diacritics);
            }
        }
    }
    return [errorFree, converted, errors];
}

function convertToGreek(str) {
    const betaCharMap = {
    '*a': 'Α', 'a': 'α', 
    '*b': 'Β', 'b': 'β',
    '*g': 'Γ', 'g': 'γ',
    '*d': 'Δ', 'd': 'δ',
    '*e': 'Ε', 'e': 'ε',
    '*z': 'Ζ', 'z': 'ζ',
    '*h': 'Η', 'h': 'η',
    '*q': 'Θ', 'q': 'θ',
    '*i': 'Ι', 'i': 'ι',
    '*k': 'Κ', 'k': 'κ',
    '*l': 'Λ', 'l': 'λ',
    '*m': 'Μ', 'm': 'μ',
    '*n': 'Ν', 'n': 'ν',
    '*c': 'Ξ', 'c': 'ξ',
    '*o': 'Ο', 'o': 'ο',
    '*p': 'Π', 'p': 'π',
    '*r': 'Ρ', 'r': 'ρ',
    '*s': 'Σ', 's': 'σ',  
    '*t': 'Τ', 't': 'τ',
    '*u': 'Υ', 'u': 'υ',
    '*f': 'Φ', 'f': 'φ',
    '*x': 'Χ', 'x': 'χ',
    '*y': 'Ψ', 'y': 'ψ',
    '*w': 'Ω', 'w': 'ω',
    ' ': ' ', ',': ',',
    '.': '.', ':': ':'
  };
  
  const diacriticMap = {
    ')': '787',
    '(': '788',
    '/': '769',
    '=': '834',
    '\\': '768',
    '+': '776',
    '|': '837', 
    '&': '772',
    ':': '183',
    ';': '59',
    '\'': '8217',
    '-': '8208',
    '_': '8212',
    '#': '697',
  };
  
  let converted = '';
  let errorFree = '';
  let errors = [];
  
  for (let char of str) {
    if (char in diacriticMap) {
      converted += String.fromCharCode(diacriticMap[char]);
      errorFree += String.fromCharCode(diacriticMap[char]);
    } else if (char in betaCharMap) {
      converted += betaCharMap[char]
      errorFree += betaCharMap[char]
    } else {
      converted += '{' + char + '}';
      errors.push(char);
    }
  }
  
  return [errorFree, converted, errors];
}


let lockedTextArea;
let activeTextArea;
let greekInput = '';
let betaInput = '';
let output;
let errors;
let corrected;

function checkBetaFocus() {
    if (document.getElementById('betaText').value) {
            betaInput = document.getElementById('betaText').value;
            lockedTextArea = 'greekText';
            activeTextArea = 'betaText';
            document.getElementById('greekText').readOnly = true;
        } else if (lockedTextArea) {
            document.getElementById(lockedTextArea).readOnly = false;
            lockedTextArea = null;
            activeTextArea = null;
        }
}

function checkGreekFocus() {
    if (document.getElementById('greekText').value) {
            greekInput = document.getElementById('greekText').value;
            lockedTextArea = 'betaText';
            activeTextArea = 'greekText';
            document.getElementById('betaText').readOnly = true;
        } else if (lockedTextArea) {
            document.getElementById(lockedTextArea).readOnly = false;
            lockedTextArea = null;
            activeTextArea = null;
        }
}

function convertText() {
    if (activeTextArea === 'greekText') {
        [corrected, output, errors] = convertToBeta(greekInput);
        if (errors.length > 0) {
            output += '\n\nNot all characters could be transcoded:\n' + errors.join(', ');
            output += '\n\nError free version:\n' + corrected;
        }
        document.getElementById('betaText').value = output;
    } else if (activeTextArea === 'betaText') {
        [corrected, output, errors] = convertToGreek(betaInput);
        if (errors.length > 0) {
            output += '\n\nNot all characters could be transcoded:\n' + errors.join(', ');
            output += '\n\nError free version:\n' + corrected;
        }
        document.getElementById('greekText').value = output;
    }
}

function clearText(textId) {
    document.getElementById(textId).value = '';
    if (lockedTextArea === textId) {
        lockedTextArea = null;
        document.getElementById(textId).readOnly = false;
    }
}

function copyText(textId) {
  
  const text = document.getElementById(textId);
  text.select(); 
  document.execCommand('copy');

}
