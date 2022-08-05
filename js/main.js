const keys = document.querySelectorAll(".key");
const re = new RegExp('[CMx%\\-+=/\\*]+','g');
let display = document.getElementById('calc--display');

//The initial idea is to work individualy floats and integers
let totalNum = 0;
let floatNumber = 0;
let memoryNum = "";

/* The float number mode describes if the user pushed the 
 point numeral and works on adding numbers to the working 
 number as float */
let floatModeOn = false;

[...keys].forEach(element => {
    element.addEventListener('click', ()=>{
        let key = element.innerText;
        if(!re.test(key)){
            if(key == "."){
                floatModeOn = true;
                return;
            }
            if(floatModeOn){
                floatNumber *= 10;
                floatNumber += parseInt(key);
            }
            else{
                totalNum *= 10
                totalNum += parseInt(key);
            }
        }else{
            memoryNum = floatModeOn ? `${totalNum}.${floatNumber}` : `${totalNum}`;
            switch(key){
                
                case "C":
                    totalNum = 0;
                    floatNumber = 0;
                    floatModeOn = false;
                    break;
                case "CM":
                    break;
                case "/":
                    
                    break;
                case "x":
                    break;
                case "-":
                    break;
                case "+":
                    break;
                case "=":
                    break;
                default:
                    break;
            }
        }
        if(floatModeOn){
            display.innerText = `${totalNum}.${floatNumber}`;
            return;
        }
        display.innerText = `${totalNum}`;

        
    })
});
