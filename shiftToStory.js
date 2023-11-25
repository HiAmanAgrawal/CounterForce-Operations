var button = document.getElementById("startButton");
var popup = document.getElementById("popup");
var submitBtn = document.getElementById("submitBtn");
var nameInput = document.getElementById("name");
var nicknameInput = document.getElementById("nickname");
var inputs = document.querySelectorAll("#popup input");
var isMuted = true;
var bgmusic = new Audio("./assets/Bg.mp3");
var button_sound = new Audio("./assets/button.mp3");

    function toggleMute() {
        var muteImage = document.getElementById('muteImage');
        localStorage.setItem("isMuted",isMuted);
        if (isMuted) {
            muteImage.src = './assets/mute.png';
            bgmusic.loop = true;
            bgmusic.play()
        } else {
            muteImage.src = './assets/unmute.png';
            bgmusic.pause()
        }
            isMuted = !isMuted;
        }

button.onclick = function () {
    button_sound.play();
    button_sound.volume = 1.0;
    button_sound.onended = function () {
        popup.style.display = "block";
    };
};

submitBtn.onclick = function () {
    if (nameInput.value.trim() !== "" && nicknameInput.value.trim() !== "") {
        // Redirect to the story page with the entered name and nickname
        localStorage.setItem("name",nameInput.value);
        localStorage.setItem('nickname',nicknameInput.value);
        location.href = "./story.html";
    } else {
    inputs.forEach(function(input) {
      input.style.boxShadow = "0 0 10px red";
  });
    }
};