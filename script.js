const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('passwordLength');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generatePasswordEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');
// document.getElementById('toast-container').style.display = 'none';

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols,
}

generatePasswordEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

})

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){ return }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    document.getElementById('toast-container').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('toast-container').style.display = 'none';
    }, 5000);
})

function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper},{number}, {symbol}].filter(item => Object.values(item)[0]);
    console.log(typesArr);

    if(typesCount === 0){
        return '';
    }

    for(let i=0; i< length;i+=typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            console.log(randomFunction[funcName]);
            if(randomFunction[funcName] !== undefined){
                generatedPassword += randomFunction[funcName]();
            }
            
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

}

function getRandomLower(){
    // a = 97, 26 is number of letters
    return String.fromCharCode((Math.random() * 26) + 97);
}

function getRandomUpper(){
    // A= 65, 26 is number of letters
    return String.fromCharCode((Math.random() * 26) + 65);
}

function getRandomNumber(){
    // 0 = 48, 10 is number of numbers
    return String.fromCharCode((Math.random() * 10) + 48);
}

function getRandomSymbols(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
