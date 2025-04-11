let dialogueEnded = false;
let delay = 50;
let dialogueBox = document.getElementsByClassName("dialogue-chat")[0];
let gameBox = document.getElementsByClassName("game-box")[0];
let loveletterGameBox = document.getElementsByClassName("loveletter-game-box")[0];
let gameBorder = document.getElementsByClassName("game-border")[0];
let timeoutId = null;
const audio = [
    new Audio("audio/dialogue/firstDialogue.mp3"),
    new Audio("audio/dialogue/secondDialogue.mp3"),
    new Audio("audio/dialogue/thirdDialogue.mp3")
];
let currentAudio = null;

function playAudio(index) {
    //If there is a current audio playing, pause it and set the audio to 0 sec
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = audio[index];
    currentAudio.play();
}

function dialogueChocolate(){
    //Randomise a played audio
    let rand = Math.round(Math.random() * 2);
    playAudio(rand);

    let dialogueChocolate = [
        "Greetings. Thank you for giving some of your time to me as I need assistance finishing this gift for Colecito. >>",
        "It needs to be outstanding! This needs to be perfect! >>",
        "So far, I have spent the whole week crafting these lovely chocolates for him. >>",
        "I kindly request you to arrange these in a chocolate box in any order you desire. >>",
        "All I ask for is that there be a variety of chocolate for Colecito to taste. >>",
        "Drag chocolates into the box. Replace by dragging a new one. Click Check when done or Reset to start over."
    ];

    let index = 0;
    dialogueType(dialogueBox, dialogueChocolate[index], delay); //Start the first dialogue text

    //If the dialogue cycle is done, it turns the cursor in the page into a pointer
    if(index < dialogueChocolate.length - 1){
        gameBorder.style.cursor = "pointer";
    }

    document.getElementsByClassName("game-border")[0].addEventListener("click", function () {
        rand = Math.round(Math.random() * 2); //Randomise a played audio

        if(dialogueEnded && index < dialogueChocolate.length - 1){ //If the dialogue is done, it types out the next dialogue
            playAudio(rand);
            index++;
            dialogueBox.innerHTML = "";
            dialogueEnded = false;
            dialogueType(dialogueBox, dialogueChocolate[index], delay);
        } else if(!dialogueEnded && index <= dialogueChocolate.length - 1){ //If the dialogue text is not done, it finished the dialogue
            stopDialogue(); //Reset timeout counter for dialogueType()
            dialogueEnded = true;
            dialogueBox.innerHTML = dialogueChocolate[index]; //Sets the dialogue box into the whole dialogue text;
        }

        //If the dialogue cycle is not done, it turns the cursor in the page into a pointer
        if(index >= dialogueChocolate.length - 1){
            gameBorder.style.cursor = "default";
    
            gameBox.classList.add("visible");
        } 

    });
    
}

function dialogueLoveletter(){
    //Randomise a played audio
    let rand = Math.round(Math.random() * 2);
    playAudio(rand);

    let dialogueLoveletter = [
        "You have my thanks! I hope he will love it. >>",
        "And oh, just one last thing—I want to write Colecito a letter as the cherry on the top. >>",
        "I have prepared a template to help create the perfect love letter. >>",
        "Hover over the empty boxes to select options. Click Check when done or Reset to start over.",
    ];

    let index = 0;
    dialogueType(dialogueBox, dialogueLoveletter[index], delay); //Start the first dialogue text

    //If the dialogue cycle is done, it turns the cursor in the page into a pointer
    if(index < dialogueLoveletter.length - 1){
        gameBorder.style.cursor = "pointer";
    }

    document.getElementsByClassName("game-border")[0].addEventListener("click", function () {
        rand = Math.round(Math.random() * 2); //Randomise a played audio

        if(dialogueEnded && index < dialogueLoveletter.length - 1){ //If the dialogue is done, it types out the next dialogue
            playAudio(rand);
            index++;
            dialogueBox.innerHTML = "";
            dialogueEnded = false;
            dialogueType(dialogueBox, dialogueLoveletter[index], delay);
        } else if(!dialogueEnded && index <= dialogueLoveletter.length - 1){ //If the dialogue text is not done, it finished the dialogue
            stopDialogue(); //Reset timeout counter for dialogueType()
            dialogueEnded = true;
            dialogueBox.innerHTML = dialogueLoveletter[index]; //Sets the dialogue box into the whole dialogue text;
        }

        //If the dialogue cycle is not done, it turns the cursor in the page into a pointer
        if(index >= dialogueLoveletter.length - 1){
            gameBorder.style.cursor = "default";
    
            gameBox.classList.add("visible");
            loveletterGameBox.classList.add("visible");
            
        } 
    });
    
}

function dialogueType(targetElement, text, delay, i = 0) {
    if(i == text.length){
        dialogueEnded = true;
    }

    //Prints letters one by one using a recursive function and delay
    if (i < text.length) {
        targetElement.innerHTML += text[i];
        timeoutId = setTimeout(() => {
            dialogueType(targetElement, text, delay, i + 1);
        }, delay);
    }
}

//Clear the timeout timer
function stopDialogue(){
    if(timeoutId !== null){
        clearTimeout(timeoutId);
        timeoutId = null;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    if(window.location.pathname.includes("chocolate-game.html")){
        dialogueChocolate();
    }else if(window.location.pathname.includes("loveletter-game.html")){
        dialogueLoveletter();
    }
});