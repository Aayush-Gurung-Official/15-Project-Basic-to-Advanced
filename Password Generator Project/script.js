const uppercasebtn =document.getElementById('uppercase-btn');
const lowercasebtn =document.getElementById('lowercase-btn');
const numbersbtn =document.getElementById('numbers-btn');
const symbolsbtn =document.getElementById('symbols-btn');
const lengthslider =document.getElementById('lengthslider');
const lengthtext =document.getElementById('length');
const passwordinput =document.getElementById('passwordinput');
const generatebtn =document.querySelector('.generate-btn');
const copybtn =document.querySelector('#copy');
const strengthBar = document.querySelector('.strength-fill');
const strengthText = document.querySelector('.strength-text');
let uppercaseletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let
lowercaseletters = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
generatebtn.addEventListener('click',generatepassword);
function generatepassword(){
    let passwordcharacters = "";
    if(uppercasebtn.checked){
        passwordcharacters += uppercaseletters;
    }
    if(lowercasebtn.checked){
        passwordcharacters += lowercaseletters;
    }
    if(numbersbtn.checked){
        passwordcharacters += numbers;
    }
    if(symbolsbtn.checked){
        passwordcharacters += symbols;
    }
    let generatedpassword = "";
    for(let i=0;i<lengthslider.value;i++){
        generatedpassword += passwordcharacters.charAt(Math.floor(Math.random()*passwordcharacters.length));
    }
    passwordinput.value = generatedpassword;
    updateStrength(generatedpassword);
}
lengthslider.addEventListener('input',()=>{
    lengthtext.textContent = lengthslider.value;
}   
)
copybtn.addEventListener('click',()=>{
    navigator.clipboard.writeText(passwordinput.value);
    alert('Password copied to clipboard!');
})  
function updateStrength(password) {
    let strengthScore = 0;

    // Length check
    if (password.length >= 8) strengthScore++;
    if (password.length >= 12) strengthScore++;

    // Character variety checks
    if (/[A-Z]/.test(password)) strengthScore++;
    if (/[a-z]/.test(password)) strengthScore++;
    if (/[0-9]/.test(password)) strengthScore++;
    if (/[^A-Za-z0-9]/.test(password)) strengthScore++;

    // Maximum possible score = 6
    if (strengthScore <= 2) {
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
        strengthText.textContent = "Weak";
    } 
    else if (strengthScore <= 4) {
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";
        strengthText.textContent = "Medium";
    } 
    else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
        strengthText.textContent = "Strong";
    }
}

