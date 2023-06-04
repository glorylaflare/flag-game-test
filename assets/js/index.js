const container = document.querySelector(".container");
const alertScreen =  document.querySelector(".alert-screen");

const titleAlert = document.querySelector(".game-title");
const subtitleAlert = document.querySelector(".game-subtitle");
const buttonAlert = document.querySelector(".start-button span");
const flagImage = document.querySelector(".flag-img");
const informationTab = document.querySelector(".infos");

const infoText = document.getElementById("info-text");
const tryAgain = document.getElementById("try-again");
const answser = document.getElementById("answer-input");
const timeCounter = document.getElementById("timer");
const score = document.getElementById("score-counter");
const highScoreElement = document.getElementById("high-score");

let respostaBandeira = '';
let pontos = 0;
let contador;

// Record no LocalStorage
let highScore = localStorage.getItem('high-score-flag') || 0;
highScoreElement.innerText = `${highScore}`;

// Funcionando!
function listarBandeiras() {
    const request = new XMLHttpRequest();
    const jsonFile = "./assets/json/flags.json";
    request.open('GET', jsonFile, false);
    request.send();
    
    return request.responseText;
}

// Funcionando!
function iniciarJogo() {
    alertScreen.style.display = "none";
    container.style.display = "block";

    let i = sortearNumero();
    mostrarBandeira(i);
    startTime(10);
}

// Função que finaliza o jogo após o estourar do tempo
function endGame() {
    alertScreen.style.display = "flex";
    container.style.display = "none";

    limparInput();
    titleAlert.style.fontFamily = "Poppins";
    titleAlert.innerHTML = `Fim de jogo!`;
    subtitleAlert.style.fontSize = "14px"
    subtitleAlert.innerHTML = `Parabéns, você fez <b>${pontos}</b> pontos.`;
    buttonAlert.innerHTML = `Reiniciar`;

    pontos = pontos * 0;
    score.innerHTML = `0`;
}

// Função de cronômetro 
function startTime(time) {   
    contador = setInterval(timer, 1000)
    
        function timer(){
            timeCounter.innerHTML = time;
            time--;
            if (time < 10) {
                timeCounter.innerHTML = "0" + time   
            } 
            if (time <= 0) {
                clearInterval(contador)
            }
            if (time === 0) {
                endGame();
            }
        }
}

// Função que mostra a bandeira no container
function mostrarBandeira(indice) {    
    const data = listarBandeiras();
    const elements = JSON.parse(data);
    const nome = elements[indice].nome;
    const imagem = elements[indice].img;
    respostaBandeira = nome;

    flagImage.src = `${imagem}`;  
}

// Função que verifica a resposta
function enviarResposta() {
    if(event.keyCode == 13) { //usando KeyCode ~> enter = 13
        const resposta = answser.value.toLowerCase(); //coletando resposta do input
        informationTab.style.opacity = "1";

        //verificação da resposta
        if(resposta == respostaBandeira) {
            tryAgain.style.opacity = "0";
            infoText.innerHTML = "Acertou!" 
            limparInput();

            let i = sortearNumero();
            mostrarBandeira(i);
            addPontos();
            clearInterval(contador)
            startTime(10);
        } else {
            tryAgain.style.opacity = "1";

            infoText.innerHTML = "Errou!"
            tryAgain.innerHTML = "Tente novamente..."          
        } 
    }
}

// Função que limpa a resposta após um acerto
function limparInput() {
    answser.value = "";
}

// Função que sorteia os números das bandeiras após um acerto
function sortearNumero() {
    return Math.floor(Math.random() * (415 - 0) + 0);   
}

// Função que adiciona os pontos
function addPontos() {
    pontos++
    highScore = pontos >= highScore ? pontos : highScore;

    localStorage.setItem("high-score-flag", highScore);

    score.innerHTML = pontos;
    highScoreElement.innerHTML = highScore;
}