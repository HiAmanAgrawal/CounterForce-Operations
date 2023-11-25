var nameInput = localStorage.getItem('name');
var nickName = localStorage.getItem('nickname');
var gameOver = localStorage.getItem('gameOver');
var lifeLeft = localStorage.getItem("lifeCount");
var ammoCount = localStorage.getItem('ammoCount');
var target = localStorage.getItem('targetCount');
var scoreDiv = document.getElementById('score');
var gtaSound = new Audio("./assets/GTA_theme.mp3");
var playerName = document.getElementById("playerName");
var playerNickName = document.getElementById("playerNickName");
var ScoreValue = document.getElementById("scoreValue");
var score = localStorage.getItem("score");
var ammo = document.getElementById("ammo");
var life = document.getElementById("life");
var targetCount = document.getElementById("target");
var comment = document.getElementById("comment");

var looseComment = [
    "Better luck next time!",
    "Speed up, Buddy!",
    "Oh no, Terrorists survived!"
];

var winComment = [
    "Well played!",
    "You were lightning fast!",
    "You saved Jake and his brother!",
    "Swift and victorious, you nailed it!"
];

// Function to get a random comment from the provided array
function getRandomComment(comments) {
    var randomIndex = Math.floor(Math.random() * comments.length);
    return comments[randomIndex];
}

// Set the comment based on the game result
if (gameOver === "true") {
    comment.innerText = getRandomComment(looseComment);
} else {
    comment.innerText = getRandomComment(winComment);
}

function showScore() {
    gtaSound.play();
    setTimeout(function () {
        displayScore();
    }, 3000);
}

function importValue() {
    playerName.innerText = "Player Name: " + nameInput;
    playerNickName.innerText = "Player Nickname: " + nickName;
    ScoreValue.innerText = "Score: " + score;
    ammo.innerText = "Ammo left: " + ammoCount;
    life.innerText = "Life left: " + lifeLeft;
    targetCount.innerText = "Target left: " + target;
}

importValue();

function displayScore() {
    scoreDiv.style.display = 'grid';
}

window.onload = function() {
    showScore();
};

