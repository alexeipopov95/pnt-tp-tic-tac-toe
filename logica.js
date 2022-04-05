var turno = 0
var fichas = 1

var ganador = [];

function AsignarFicha(){
    if (turno === 0) {
        document.getElementById("turno").innerHTML = "1"
    } else {
        document.getElementById("turno").innerHTML = "2"
    }
}

function CambiarAXO(idBoton) {

    let buttonObj = document.getElementById(idBoton)
    if (buttonObj.innerHTML === "-") {
        if (turno === 0) {
            buttonObj.innerHTML = "X"
            turno += 1
            document.getElementById("turno").innerHTML = "2"
        } else {
            buttonObj.innerHTML = "O"
            turno -= 1
            document.getElementById("turno").innerHTML = "1"
        }
        buttonObj.disabled = true
    }
    AnalizarSiGanoQuienToco()
}

function InicializarJuego() {
    turno = getRandomTurno()
    document.getElementById("card-header-turno").removeAttribute("hidden")
    ResetBoard()
    AsignarFicha()
}

function evaluarValor(value1, value2, value3){
    _value1 = value1.innerHTML
    _value2 = value2.innerHTML
    _value3 = value3.innerHTML
    if (_value1 != "-" && _value2 != "-" && _value3 != "-"){
        if (_value1 == _value2 && _value2 == _value3){
            ganador.push(value1.id, value2.id, value3.id)
            return true
        }
    }
    return false
}

function bloquearRestantes() {
    for (let i=1;i<10;i++) {
        button = document.getElementById(i)
        if (button.innerHTML === "-"){
            button.disabled = true
        }
    }
}

function pintarGanador(){
    for (boton_id of ganador) {
        document.getElementById(boton_id).style.background = '#ed4577';
    }
}

function AnalizarSiGanoQuienToco() {
    button_1 = document.getElementById("1")
    button_2 = document.getElementById("2")
    button_3 = document.getElementById("3")
    button_4 = document.getElementById("4")
    button_5 = document.getElementById("5")
    button_6 = document.getElementById("6")
    button_7 = document.getElementById("7")
    button_8 = document.getElementById("8")
    button_9 = document.getElementById("9")

    ganador1 = evaluarValor(button_1, button_2, button_3) // horizontal 1
    ganador2 = evaluarValor(button_4, button_5, button_6) // horizontal 2
    ganador3 = evaluarValor(button_7, button_8, button_9) // horizontal 3
    ganador4 = evaluarValor(button_1, button_5, button_9) // diagonal derecha
    ganador5 = evaluarValor(button_1, button_4, button_7) // vertical 1
    ganador6 = evaluarValor(button_2, button_5, button_8) // vertical 2
    ganador7 = evaluarValor(button_3, button_6, button_9) // vertical 3
    ganador8 = evaluarValor(button_3, button_5, button_7) // diagonal izquierda

    if (ganador1 || ganador2 || ganador3 || ganador4 || ganador5 || ganador6 || ganador7 || ganador8) {
        if (turno === 0) {
            bloquearRestantes()
            sendWinner("2")
            //alert("El jugador 2 es el ganador")
        } else if (turno === 1) {
            bloquearRestantes()
            sendWinner("1")
            //alert("El jugador 1 es el ganador")
        }
        pintarGanador()
    }
}

function ResetBoard(){
    while (fichas < 10) {
        button = document.getElementById(fichas)
        button.innerHTML = "-"
        button.disabled = false
        button.style.class = "btn btn-primary btn-lg"
        button.style.background = "#0d6efd"
        ganador = []
        fichas++
    }
    fichas = 1
}

function getRandomTurno() {
    return Math.floor(Math.random() * (2 - 0));
}

function sendWinner(winner_number){
    let msg = "El jugador número " + winner_number + " es el ganador";
    let winner_msg = document.getElementById("card-body-winner-message")
    winner_msg.innerHTML = msg
    document.getElementById("card-body-container").removeAttribute("hidden")

}
