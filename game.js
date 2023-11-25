document.addEventListener("DOMContentLoaded", function () {
  // Initial cursor image
  var initialCursor = 'url("./assets/aim.png"), auto';
  var countdown = document.getElementById("countdown");
  // // Set a timer for 3 seconds before starting the game
  // setTimeout(function () {
  //   startGame();
  // }, 3000);
// Start the countdown
startCountdown();

function startCountdown() {
  var count = 3;

  // Update the countdown every second
  var countdownInterval = setInterval(function () {
    countdown.innerText = count;

    // Decrement count
    count--;

    // If the countdown reaches 0, start the game and hide the countdown
    if (count < 0) {
      clearInterval(countdownInterval); // Stop the countdown
      startGame();
      countdown.style.display = "none";
    }
  }, 1000); // 1000 milliseconds = 1 second
}

  function startGame() {
    document.body.addEventListener("click", function () {
      // Change the cursor to a different image
      document.body.style.cursor = 'url("./assets/fire.png"), auto';

      // Set a timeout to revert to the initial cursor after half a second (500 milliseconds)
      setTimeout(function () {
        document.body.style.cursor = initialCursor;
      }, 200);
    });

    // Game variables
    var score = 0;
    var targetCount = 12;
    var ammoCount = 15;
    var lifeCount = 6;
    var gameOver = false;
    var currTerroristplace = null;
    var currBrotherplace = null;
    var brotherIntervalId;

    // Display initial target count, ammo count, and life count
    document.getElementById("target").innerText =
      "Target: " + targetCount + " left";
    document.getElementById("ammo").innerText = "Ammo: " + ammoCount + " left";
    document.getElementById("life").innerText = "Life: " + lifeCount + " left";

    // Gun movement with mouse
    var gun = document.getElementById("gun");
    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      updateGunPosition(x);
    });

    function updateGunPosition(x) {
      var gunWidth = gun.offsetWidth;
      var adjustedX = gunWidth / 9 + x;
      gun.style.left = adjustedX + "px";
    }

    // Array of places
    var place = [
      document.getElementById("place1"),
      document.getElementById("place2"),
      document.getElementById("place3"),
      document.getElementById("place4"),
      document.getElementById("place5"),
      document.getElementById("place6"),
    ];

    // Function to get a random place index
    function getRandomPlace() {
      return Math.floor(Math.random() * place.length);
    }

    var fire_sound = new Audio("./assets/bullet.mp3");

    // Function to decrease ammo
    document.onclick = function () {
      ammoCount--;
      document.getElementById("ammo").innerText = "Ammo: " + ammoCount + " left";
      fire_sound.play();
    };

    // Function to set a brother at a random place
    function setBrother() {
      if (gameOver) {
        return;
      }
      if (currBrotherplace) {
        currBrotherplace.innerHTML = "";
      }
      let brother = document.createElement("img");
      brother.src = "./assets/brother2.png";

      let num;
      // Choose a random place index until a different one from the terrorist is found
      do {
        num = getRandomPlace();
      } while (currTerroristplace && num === currTerroristplace.id);

      // Set the brother at the chosen place
      currBrotherplace = place[num];
      currBrotherplace.appendChild(brother);
    }

    var terroristIntervalId;

    // Function to set a terrorist at a random place
    function setTerrorist() {
      if (gameOver) {
        return;
      }
      if (currTerroristplace) {
        currTerroristplace.innerHTML = "";
      }
      let terrorist = document.createElement("img");
      terrorist.src = "./assets/terrorist.svg";

      // Get a random place index
      let num = getRandomPlace();
      // Set the terrorist at the chosen place
      currTerroristplace = place[num];
      currTerroristplace.appendChild(terrorist);
      fire_sound.play();
      lifeCount--;
      document.getElementById("life").innerText = "Life: " + lifeCount + " left";
      if (lifeCount <= 0) {
        document.getElementById("target").innerText = "GAME OVER: Out of Life!";
        gameOver = true;
        localStorage.setItem("lifeCount", lifeCount);
        localStorage.setItem("targetCount", targetCount);
        localStorage.setItem("ammoCount", ammoCount);
        localStorage.setItem("gameOver", gameOver);
        localStorage.setItem("score", score);
        localStorage.setItem("gameOverReason", "GAME OVER: Out of Life!");
        location.href = "./endPage.html";
      }
    }

    // Function to handle the click event on places
    function selectPlace(event) {
      if (gameOver || ammoCount <= 0) {
        return;
      }

      // Get the clicked place by using event.currentTarget
      var clickedPlace = event.currentTarget;

      if (clickedPlace == currTerroristplace) {
        // Player shot the terrorist
        score += 10;
        lifeCount += 2;
        document.getElementById("life").innerText =
          "Life: " + lifeCount + " left";
        // Decrease target count
        targetCount--;
        document.getElementById("target").innerText = "Target: " + targetCount;
      } else if (clickedPlace == currBrotherplace) {
        // Player shot the brother (game over)
        document.getElementById("target").innerText =
          "GAME OVER at: " + targetCount;
        gameOver = true;
        localStorage.setItem("lifeCount", lifeCount);
        localStorage.setItem("targetCount", targetCount);
        localStorage.setItem("ammoCount", ammoCount);
        localStorage.setItem("gameOver", gameOver);
        localStorage.setItem("score", score);
        localStorage.setItem("gameOverReason", "GAME OVER: You killed Jake Brother");
        location.href = "./endPage.html";
        clearInterval(brotherIntervalId);
        clearInterval(terroristIntervalId);
      } else if (currTerroristplace == currBrotherplace) {
        lifeCount++;
        document.getElementById("life").innerText =
          "Life: " + lifeCount + " left";
      } else {
        // Player missed
        document.getElementById("life").innerText =
          "Life: " + lifeCount + " left";
      }
      // Check for game over due to ammo depletion or out of targets
      if (ammoCount <= 0 || targetCount === 0 || lifeCount <= 0) {
        if (targetCount === 0) {
          document.getElementById("target").innerText =
            "YOU WIN! Final Target Count: 0";
          gameOver = false;
          localStorage.setItem("lifeCount", lifeCount);
          localStorage.setItem("targetCount", targetCount);
          localStorage.setItem("ammoCount", ammoCount);
          localStorage.setItem("gameOver", gameOver);
          localStorage.setItem("score", score);
          localStorage.setItem("gameOverReason", "You WON!");
          location.href = "./endPage.html";
        } else if (lifeCount <= 0) {
          document.getElementById("target").innerText = "GAME OVER: Out of Life!";
          gameOver = true;
          localStorage.setItem("lifeCount", lifeCount);
          localStorage.setItem("targetCount", targetCount);
          localStorage.setItem("ammoCount", ammoCount);
          localStorage.setItem("gameOver", gameOver);
          localStorage.setItem("score", score);
          localStorage.setItem("gameOverReason", "GAME OVER: Out of Life!");
          location.href = "./endPage.html";
        } else {
          document.getElementById("target").innerText = "GAME OVER: Out of Ammo!";
          gameOver = true;
          localStorage.setItem("lifeCount", lifeCount);
          localStorage.setItem("targetCount", targetCount);
          localStorage.setItem("ammoCount", ammoCount);
          localStorage.setItem("gameOver", gameOver);
          localStorage.setItem("score", score);
          localStorage.setItem("gameOverReason", "GAME OVER: Out of Ammo!");
          location.href = "./endPage.html";
        }
        gameOver = true;
        localStorage.setItem("lifeCount", lifeCount);
        localStorage.setItem("targetCount", targetCount);
        localStorage.setItem("ammoCount", ammoCount);
        localStorage.setItem("gameOver", gameOver);
        localStorage.setItem("score", score);
        localStorage.setItem("gameOverReason", "GAME OVER: Out of Ammo!");
        location.href = "./endPage.html";
        clearInterval(brotherIntervalId);
        clearInterval(terroristIntervalId);
      } else {
        // Set a new terrorist and brother
        setTerrorist();
        setBrother();
      }
    }

    // Add event listeners to the place elements
    for (var i = 0; i < place.length; i++) {
      place[i].addEventListener("click", selectPlace);
    }

    // Initialize the game by setting the initial terrorist
    setTerrorist();

    // Set interval for the appearance of the brother and terrorist
    brotherIntervalId = setInterval(function () {
      // Set a new brother
      setBrother();
      // Set a new terrorist
      setTerrorist();
    }, 1500);

    // Set interval for the appearance of the terrorist and decrease ammo periodically
    terroristIntervalId = setInterval(function () {
      // Decrease ammo count periodically
      if (!gameOver) {
        document.getElementById("ammo").innerText =
          "Ammo: " + ammoCount + " left";

        // Check for game over due to ammo depletion
        if (ammoCount <= 0) {
          document.getElementById("target").innerText = "GAME OVER: Out of Ammo!";
          gameOver = true;
          localStorage.setItem("lifeCount", lifeCount);
          localStorage.setItem("targetCount", targetCount);
          localStorage.setItem("ammoCount", ammoCount);
          localStorage.setItem("gameOver", gameOver);
          localStorage.setItem("score", score);
          localStorage.setItem("gameOverReason", "GAME OVER: Out of Ammo!");
          location.href = "./endPage.html";
          clearInterval(brotherIntervalId);
          clearInterval(terroristIntervalId);
        }
      }
    }, 1500);
  }

  // Background music
  var bgmusic = new Audio("./assets/Bg.mp3");
  bgmusic.loop = true;
  bgmusic.currentTime = 38;
  bgmusic.play();
});
