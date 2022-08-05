const operateString = (numString)=>{
    const numArray = numString.split(re);
    const opArray = numString.matchAll(re);
    let total = parseFloat(numArray.shift());
    for(const operation of opArray){
        if(!numArray){
            break;
        }
        switch (operation[0]) {
            case '/':
                total /= parseFloat(numArray.shift())
                break;
            case 'x':
                total *= parseFloat(numArray.shift())
                break;
            case '-':
                total -= parseFloat(numArray.shift())
                break;
            case '+':
                total += parseFloat(numArray.shift())
                break;        
            default:
                total %= parseFloat(numArray.shift())
                break;
        }
    }
    return total;
}

const keys = document.querySelectorAll(".key");
const re = new RegExp('[x%\\-+/\\*]+','g');
const reg = new RegExp('[CM=]+','g');
let display = document.getElementById('calc--display');

//The initial idea is to work individualy floats and integers
let totalNum = '';
let memNum = '';


[...keys].forEach(element => {
    element.addEventListener('click', ()=>{
        let key = element.innerText;
        if(!reg.test(key)){
            if(memNum && re.test(key)){
                totalNum = memNum;
            } 
            !totalNum && key == '.' ? totalNum += '0.' : totalNum += key;
        }else{
            if(key == 'C' || key == 'MC'){
                totalNum = '';
                display.innerText = '0';
                return;
            }else{
                totalNum = operateString(totalNum);
                display.innerText = totalNum;
                memNum = totalNum;
                totalNum = '';
                return
            }
        }
        display.innerText = totalNum;
    })
});
