import { score, updateScore } from './game-script.js';

console.log(score);

let optionScores = new Map([
    ["Colecito", 2],
    ["My Love", 3],
    ["My Dearest Darling", 5],
    ["the cherry blossoms that falls down to me", 5],
    ["the soothing symphony that sings me", 3],
    ["the morning green tea that wakes me", 5],
    ["sun", 5],
    ["star", 4],
    ["light", 3],
    ["every single day.", 4],
    ["every breath I take.", 5],
    ["every chance I get.", 3],
    ["Hanzito", 2],
    ["The One You Called Sweetheart", 5],
    ["MARCO POOKIE", 100]
]);


//Dropdown menu
document.addEventListener("DOMContentLoaded", function() {
    let select = document.getElementsByClassName("select");
    let option = document.getElementsByClassName("option");
    
    let selected = null;

    for(let i = 0; i < select.length; i++){
        select[i].addEventListener("mouseover", function(e){
            e.preventDefault();
            selected = e.target;
        });
        
    }

    for(let i = 0; i < option.length; i++){
        option[i].addEventListener("click", function(e) {
            e.preventDefault();
            selected.innerHTML = option[i].innerHTML;
        });
    }

    //Reset button
    document.getElementById("loveletter-reset-button").addEventListener("click", function () {
        const space = ["_________________", "____________________________________", "_____", "__________________", "___________________________"];
        for(let i = 0; i < select.length; i++){
            select[i].innerHTML = space[i];
        }

        console.log(score);
        
    });

    document.getElementById("loveletter-submit-button").addEventListener("click", function () {
        
        
    });

});