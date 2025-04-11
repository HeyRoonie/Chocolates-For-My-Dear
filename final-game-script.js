let score = 0;
let chocolateBox = [];
let selectedDropDown = [];
let timeoutId = null;
    
let optionScores = new Map([
    ["Colecito", 5],
    ["My Love", 8],
    ["My Dearest Darling", 11],
    ["the cherry blossoms that falls down to me", 11],
    ["the soothing symphony that sings me", 8],
    ["the morning green tea that wakes me", 11],
    ["sun", 11],
    ["star", 8],
    ["light", 5],
    ["every single day.", 8],
    ["every breath I take.", 11],
    ["every chance I get.", 5],
    ["Hanzito", 5],
    ["The One You Called Sweetheart", 11],
    ["Your Love", 8],
    ["MARCO POOKIE", 100]
]);

function startGame(){
    const audio = new Audio("audio/buttons/start.mp3");

    document.getElementsByClassName("start-button")[0]?.addEventListener("click", function () {
        console.log("clicked");
        audio.play();
        
        setTimeout(() => {
            window.location.href = "chocolate-game.html"; //If there is a start-button then it moves to the chocolate game
            console.log(window.location.href);
        }, 500);
    });
}

/* CHOCOLATE BOX */
function dragandDrop(){
    let chocolates = document.getElementsByClassName("chocolate-list");
    let containers = document.getElementsByClassName("container");

    let selected = null;

    for (let i = 0; i < chocolates.length; i++) {
        chocolates[i].addEventListener("dragstart", function(e) {
            selected = e.target; //Identifies the selected chocolate
        });
    }

    for (let i = 0; i < containers.length; i++) {
        containers[i].addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        containers[i].addEventListener("drop", function(e) {
            e.preventDefault();
            if (selected) {
                //Clears the container if there is a chocolate in it
                e.currentTarget.innerHTML = '';

                //Clones the selected chocolate
                let clone = selected.cloneNode(true);
                clone.style.margin = "0";
                clone.style.marginLeft = "5px";
                clone.style.cursor = "default";

                //Put the clone into a container
                e.currentTarget.appendChild(clone);

                console.log(clone.id);
                
                selected = null;
            }
        });
    }
}

function resetButton(){
    let chocolates = document.getElementsByClassName("chocolate-list");
    let containers = document.getElementsByClassName("container");

    const audio = new Audio("audio/buttons/reset.mp3");
    audio.preload = "auto";

    document.getElementById("reset-button")?.addEventListener("click", function () {  
        audio.play();
        
        for (let i = 0; i < containers.length; i++) {
            containers[i].innerHTML = ""; //Clears out the chocolate box containers
        }
    });
}

function submitButton(){
    let containers = document.getElementsByClassName("container");
    const audio = new Audio("audio/buttons/submit.mp3");
    audio.preload = "auto";

    document.getElementById("submit-button")?.addEventListener("click", function () {   
        audio.play();

        console.log("clicked");
        let count = [0, 0, 0, 0];
       
        for(let i = 0; i < containers.length; i++){
            let container = containers[i];
            let chocolateInContainer = container.querySelector("img");
            
            if(chocolateInContainer){
                let chocolateId = chocolateInContainer.id;
                console.log(chocolateId);

                //If it detect a class of chocolate, then it increases their corresponding array index
                if(chocolateId === "flower-chocolate"){
                    count[0]++;
                    chocolateBox[i] = "images/chocolates/flower.svg";
                    console.log("Detected");
                } else if(chocolateId === "heart-chocolate"){
                    count[1]++;
                    chocolateBox[i] = "images/chocolates/heart.svg";
                    console.log("Detected");
                } else if(chocolateId === "star-chocolate"){
                    count[2]++;
                    chocolateBox[i] = "images/chocolates/star.svg";
                    console.log("Detected");
                } else if(chocolateId === "circle-chocolate"){
                    count[3]++;
                    chocolateBox[i] = "images/chocolates/circle.svg";
                    console.log("Detected");
                }
            }

        }

        for(let i = 0; i < count.length; i++){
            console.log(count[0] + " " + count[1] + " "  + count[2] + " "  + count[3] + " "  );
        }

        sumofScore(count);
        score = score - atLeastOne(count); //Deducts points if there is
        console.log(score);

        //Stores the store into storage
        sessionStorage.setItem("chocolateBox", JSON.stringify(chocolateBox));
        sessionStorage.setItem("score", score);

        //Transition to the loveletter game
        let gameBorder = document.getElementsByClassName("game-border")[0];
        gameBorder.style.animationName = "fadeout";
        gameBorder.style.animationDuration = "1s";


        setTimeout(() => {
            window.location.href = "loveletter-game.html";
        }, 900);

    });
}

//Count if there is one class of chocolate in one chocolate box
//Returns a 10 if there is one missing
function atLeastOne(arr){
    for(let i = 0; i < arr.length; i++){
        if(arr[i] != 0){
            console.log("No deduction");
            return 0;
        }
    }

    return 10;
}

//Sum up the total score in chocolate game
function sumofScore(arr){
    for(let i = 0; i < arr.length; i++){
        score = score + (arr[i] * 5);
    }
}

/* LOVE LETTER */
function dropDown(){
    let select = document.getElementsByClassName("select");
    let option = document.getElementsByClassName("option");
    let selected = null;

    for(let i = 0; i < select.length; i++){
            select[i].addEventListener("mouseover", function(e){
                console.log("Detected");
                e.preventDefault();
                selected = e.target; //Indentifies the selected drop down container
            });
        }

    for(let i = 0; i < option.length; i++){
        option[i].addEventListener("click", function(e) {
            console.log("Clicked");
            e.preventDefault();
            selected.innerHTML = option[i].innerHTML; //Insert the clicked option to the selected drop down container
        });
    }
}

function loveLetterResetButton(){
    let select = document.getElementsByClassName("select");
    const audio = new Audio("audio/buttons/reset.mp3");
    audio.preload = "auto";

    document.getElementById("loveletter-reset-button")?.addEventListener("click", function () {
        audio.play();

        //Clears containers with spaces
        const space = ["_________________", "____________________________________", "_____", "__________________", "___________________________"];
        for(let i = 0; i < select.length; i++){
            select[i].innerHTML = space[i];
        }
        
    });
}

function loveLetterSubmitButton(){
    let score = parseInt(sessionStorage.getItem("score")) || 0;
    let select = document.getElementsByClassName("select");
    const audio = new Audio("audio/buttons/submit.mp3");
    audio.preload = "auto";

    document.getElementById("loveletter-submit-button")?.addEventListener("click", function () {
        audio.play();
        
        console.log("clicked");
        for(let i = 0; i < select.length; i++){
            //Sums up the value corresponding to the selected option (using a hashmap)
            if(optionScores.get(select[i].innerHTML)){
                selectedDropDown[i] = select[i].innerHTML;
                score = score + optionScores.get(select[i].innerHTML);
            }
        }
        
        //If the score is negative then its 0
        if(score < 0){
            score = 0;
        }

        console.log(score);

        //Stores score into storage
        sessionStorage.setItem("score", score);
        sessionStorage.setItem("selectedDropDown", JSON.stringify(selectedDropDown));

        //Transition to the endgame
        let gameBorder = document.getElementsByClassName("game-border")[0];
        gameBorder.style.animationName = "fadeout";
        gameBorder.style.animationDuration = "1s";


        setTimeout(() => {
            window.location.href = "endgame.html";
        }, 900);
    });
}

/* ENDGAME */
function displayEndGame(){
    //Displays score
    let score = parseInt(sessionStorage.getItem("score")) || 0;
    document.getElementsByClassName("score")[0].innerHTML = score;

    //Displays the description and image corresponding to the score
    scoreRange(score);

}

function scoreRange(score){
    const audio = new Audio();

    let imgURLs =[
        "images/endgame/end-game-best.svg", 
        "images/endgame/end-game-mid.svg",
        "images/endgame/end-game-low.svg"
    ];
    
    let desc = [
        "Colecito loves it and showers Hanzito with kisses!",
        "Colecito likes it... but he knows Hanzito can do better",
        "It’s not the greatest but Colecito will still love Hanzito"
    ];
    
    if(score >= 80 && score <= 100){
        audio.src = "audio/endings/bestEnding.mp3";
        setTimeout(() => {
            audio.play();
        }, 500);

        document.getElementsByClassName("score-description")[0].innerHTML = desc[0];
        document.getElementById("images").src = imgURLs[0];
    }else if(score >= 50 && score <= 79){
        audio.src = "audio/endings/midEnding.mp3";
        setTimeout(() => {
            audio.play();
        }, 500);

        document.getElementsByClassName("score-description")[0].innerHTML = desc[1];
        document.getElementById("images").src = imgURLs[1];
    }else{
        audio.src = "audio/endings/worstEnding.mp3";
        setTimeout(() => {
            audio.play();
        }, 500);

        document.getElementsByClassName("score-description")[0].innerHTML = desc[2];
        document.getElementById("images").src = imgURLs[2];
    }

    console.log(document.getElementById("images").src);
}

function tryAgain(){
    const audio = new Audio("audio/buttons/pop.mp3");
    audio.preload = "auto";

    document.getElementsByClassName("try-again")[0].addEventListener("click", function () {
        audio.play();
        sessionStorage.clear();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    });
}

function creationButton(){
    const audio = new Audio("audio/buttons/pop.mp3");
    audio.preload = "auto";

    document.getElementsByClassName("creations")[0].addEventListener("click", function () {
        audio.play();
        window.location.href = "creation.html";
    });
}

/* CREATION PAGE */
function displayCreation(){
    let chocolateBox = JSON.parse(sessionStorage.getItem("chocolateBox")) || [];
    let containers = document.getElementsByClassName("final-container");

    for(let i = 0; i < chocolateBox.length; i++){
        if(chocolateBox[i]){
            let img = document.createElement("img");
            img.src = chocolateBox[i];
            img.classList.add("final-chocolate");
            containers[i].appendChild(img);
            console.log(containers[i])
        }
    }

    let selectedDropDown = JSON.parse(sessionStorage.getItem("selectedDropDown")) || [];
    let select = document.getElementsByClassName("final-select");

    for(let i = 0; i < selectedDropDown.length; i++){
        if(selectedDropDown[i]){
            select[i].innerHTML = selectedDropDown[i];
        }
    }
}

function backButton(){
    const audio = new Audio("audio/buttons/pop.mp3");
    audio.preload = "auto";

    document.getElementsByClassName("back-button")[0].addEventListener("click", function () {
        audio.play();
        window.location.href = "endgame.html";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    console.log(window.location.href);

    let score = parseInt(sessionStorage.getItem("score")) || 0;
    if(window.location.pathname.includes("title-page.html")){
        startGame();
    } else if (window.location.pathname.includes("chocolate-game.html")) {
        console.log(score);
        dragandDrop();
        resetButton();
        submitButton();
    } else if(window.location.pathname.includes("loveletter-game.html")){
        console.log(score);
        dropDown()
        loveLetterResetButton();
        loveLetterSubmitButton();
    } else if (window.location.pathname.includes("endgame.html")){
        displayEndGame();
        creationButton();
        tryAgain();
    } else if(window.location.pathname.includes("creation.html")){
        displayCreation();
        backButton();
    }
    
});