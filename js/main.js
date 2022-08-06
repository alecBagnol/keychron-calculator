const operateString = (numString)=>{
    // debugger
    const numArray = numString.split(re);
    const opArray = [...numString.matchAll(re)];
    if (opArray.length == 0){
        return parseFloat(numString);
    }
    let total = 0;
    if(opArray[0].index != 0){
        total = parseFloat(numArray.shift());
    }else{
        numArray.shift();
    }
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
                total += -parseFloat(numArray.shift())
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
        if(key != 'C' && key != 'MC' && key != '='){
            if(memNum && re.test(key)){
                totalNum = memNum;
            }
            /* this conditional checks if the key '.' has been pushed 
            before any other key, this way we push a '0' before said point key*/
            !totalNum && !memNum && key == '.' ? totalNum += '0.' : totalNum += key;
            display.innerText = totalNum;
        }else{
            if(key == '='){
                if(totalNum == ''){
                    totalNum = memNum;
                    return;
                }else{
                    totalNum = operateString(`${totalNum}`);
                }
                
                display.innerText = totalNum;
                memNum = totalNum;
                totalNum = '';
            }else{
                if(key == 'MC'){
                    memNum = '';
                }
                totalNum = '';
                display.innerText = '0';
            }
        }
        
    })
});
