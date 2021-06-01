var buttons = document.getElementsByTagName('button')
var calcScreen = document.getElementById('display')
var buttonList = [].slice.call(buttons);
var operation = ''
var totalPressed = false;

//Setup Buttons
buttonList.forEach(function(button) {
    button.value = button.innerHTML;
    if (button.value === '=') {
        //setup = button
        button.addEventListener('click', function() {
            try {
                var total = eval(operation);
            } catch (e) {
                operation = "error"
            }
            operation = total;
            calcScreen.innerHTML = operation;
            totalPressed = true;
        })
    } else if (button.value === 'X') {
    	//setup clear button
        button.addEventListener('click', function() {
            operation = '';
            calcScreen.innerHTML = operation;
        });
    } else if (button.classList.contains('fn-key')) {
    	//setup all other function buttons
        button.addEventListener('click', function() {
            totalPressed = false;
            operation += this.value;
            calcScreen.innerHTML = operation;
        })
    } else {
    	//setup all buttons 0-9 and .
        button.addEventListener('click', function() {
            if (totalPressed) {
                operation = ""
                totalPressed = false;
            }
            operation += this.value;
            calcScreen.innerHTML = operation;
        })
    }
})
