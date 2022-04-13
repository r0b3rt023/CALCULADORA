let operacion = '';
let botonIgualPulsado = false;
const textoOperacion = document.getElementById('textoOperacion');
const resultadoOperacion = document.getElementById('resultadoOperacion');

/*Añade a la variable operación y muestra los distintos números, simbolos o operaciones pulsadas*/
function botonClick(botonPulsado) {
    textoOperacion.textContent = '0';
    if (botonIgualPulsado) {
        operacion = '';
        botonIgualPulsado = false;
    }
    operacion += botonPulsado;
    textoOperacion.textContent = operacion;
}

/*Botón C: Limpia todo lo que haya en pantalla de la calculadora*/
function botonLimpiar() {
    operacion = '';
    textoOperacion.textContent = '0';
    resultadoOperacion.textContent = '';
}

/*Botón <: Borra el ultimo caracter que se encuentre por pantalla en la calculadora*/
function botonBorrar() {
    if (botonIgualPulsado) {
        operacion = '';
        botonIgualPulsado = false;
        textoOperacion.textContent = '0';
    } else {
        operacion = operacion.slice(0, -1);
        textoOperacion.textContent = operacion.length == 0 ? '0' : operacion;
    }
}

/*Botón =: Calcula la operación realizada*/
function botonIgual() {
    let resultado = calcularOperacion();
    if(resultado == undefined) { //Si no se ha puesto ningún valor muestro 0
        resultadoOperacion.textContent = '0';
    } else if(isNaN(resultado)) { //Si el valor de la operación es una de las excepciones
        resultadoOperacion.textContent = '';
        textoOperacion.textContent = resultado;
    } else { //Si el valor el correcto
        resultadoOperacion.textContent = resultado;
    }
}

function calcularOperacion() {
    if (operacion != undefined) {
        botonIgualPulsado = true;
        //Creo una expresión regular para comprobar que no se introduzcan
        //otro tipo valores que no sean los predefinidos en la calculadora
        // const regExp = /[a-zA-Z `!@#$%^&_\[\]{};':"\\|,<>?~]/;
        const regExp = /^[0-9-+/*().]*$/;
        //Creo un bloque try/catch para comprobar si la cadena que se va a analizar se puede hacer aritméticamente
        try {
            //Compruebo que la cadena a analizar no contengan ningún caracter que no quiera
            if (regExp.test(operacion)) {
                operacion = new Function('return ' + operacion)();
                //En caso de que devuelva un 'Infinity' (cuando se divide entre 0), muestro un MathError
                if (operacion == 'Infinity') {
                    operacion = 'Math Error';
                }
            } else {
                operacion = 'Not Valid Chars';
            }
        } catch {
            operacion = 'Syntax Error';
        }
        return operacion;
    }
}