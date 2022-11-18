"use strict"

let userPattern = [];
let gamePattern = [];

let started = false;
let level = 0;

if (!started){
    document.addEventListener("keypress", () => {
        if (!started){
            setTimeout(() => {
                nextLevel();
            },300);
        }
        started = true;
    })
}

function nextLevel(){
    userPattern = [];
    level++;
    document.querySelector("#level-title").innerHTML = `Level ${level}`;
    let randomColor = Math.floor(Math.random() * 4) + 1;
    let button = document.querySelector(`.${reformationOnColor(randomColor)}`)
    gamePattern.push(reformationOnColor(randomColor));
    animationGameClick(button);
    sound(reformationOnColor(randomColor));
}

document.querySelectorAll(".btn").forEach((element) => {
    element.addEventListener("click", () => {
        userPattern.push(element.classList[1]);
        animationUserClick(element)
        sound(element.classList[1]);
        checkAnswer(userPattern.length - 1);
    })
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]){
        if (gamePattern.length === userPattern.length){
            console.log("check answer")
            setTimeout(() => {nextLevel();
            }, 1000)
        }
    }else {
        document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart"
        document.querySelector("body").classList.add("game-over")
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");}, 100)
        sound('wrong')
        repeat();
    }
}

function sound(element) {

    switch (element) {
        case "green":
            let greenAudio = new Audio("sounds/green.mp3");
            greenAudio.play();
            break;

        case "red":
            let redAudio = new Audio("sounds/red.mp3");
            redAudio.play();
            break;

        case "yellow":
            let yellowAudio = new Audio("sounds/yellow.mp3");
            yellowAudio.play();
            break;

        case "blue":
            let blueAudio = new Audio("sounds/blue.mp3");
            blueAudio.play();
            break;

        default: let wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        break;
    }
}

function animationUserClick (element){

    element.classList.add("pressed");
    setTimeout(() => {
        element.classList.remove("pressed")
    }, 150)
}

function animationGameClick (element){

    element.classList.add("pressed-question");
    setTimeout(() => {
        element.classList.remove("pressed-question")
    }, 200)
}

function reformationOnColor(number) {
    if (number === 1) return "green";
    else if (number === 2) return "red";
    else if (number === 3) return "yellow";
    else return "blue";
}

function repeat() {
    level = 0;
    gamePattern = [];
    userPattern = [];
    started = false;
}