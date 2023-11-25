var text = document.querySelectorAll("p");
var missionDetails = document.getElementById("missionDetails");
var button_sound = new Audio("./assets/button.mp3");
var typewriter_audio = new Audio("./assets/typewriter_audio.mp3");

var data = [
  'Mitchell, Phoenix Dawn has escalated the threat. We need you on this mission.',
  "Commander, I can't ignore this. My brother, Ethan, is with them, unaware of the danger.",
  "Personal feelings aside, we're dealing with a potential global catastrophe. Your brother knew the risks when he joined Phoenix Dawn.",
  "I can't just treat him like collateral damage. There has to be another way.",
  "Our intel suggests Phoenix Dawn plans to unleash a bioweapon. We can't afford sentimentality. Your mission is clear: infiltrate, gather intel, and eliminate their leader.",
  "Understood, but what about extracting my brother?",
  "Your primary focus is the mission. Avoid lethal force against your brother. We have a plan for extraction, and he'll become an asset, providing valuable insights into the inner workings of the group.",
  "That’s sound good!!",
  "Mitchell, your destination is a facility in Cascade Falls. Intel suggests the leader of Phoenix Dawn will be there. Your orders are clear: eliminate the terrorist threat. Be warned, your brother is likely present.",
];

var name_list = [
  '<span class="name">A8459:</span>',
  '<span class="name">Jake:</span>',
  '<span class="name">A8459:</span>',
  '<span class="name">Jake:</span>',
  '<span class="name">A8459:</span>',
  '<span class="name">Jake:</span>',
  '<span class="name">A8459:</span>',
  '<span class="name">Jake:</span>',
  '<span class="name">A8459:</span>',
];

var index = 0;
var lineIndex = 0;

function typewriter_style(i) {
  if (index < data[i].length) {
    let new_title = data[i].slice(0, index + 1);
    text[i].innerHTML = name_list[i] + " " + new_title;
    index++;
    typewriter_audio.play(); 
    setTimeout(function () {
      typewriter_style(i);
    }, 10);
  } else {
    typewriter_audio.pause(); 
    typewriter_audio.currentTime = 0; 
    setTimeout(function () {
      index = 0;
      lineIndex++;
      if (lineIndex < text.length) {
        typewriter_style(lineIndex);
      } else {
        appear();
      }
    }, 1000);
  }
}

typewriter_style(lineIndex);

function appear() {
  document.getElementById("skipButton").onclick = function () {
    button_sound.play();
    button_sound.onended = function () {
      missionDetails.style.display = "block";
    };
  };
}

appear();

document.getElementById("startButton").onclick = function () {
  button_sound.play();
  button_sound.onended = function () {
    location.href = "./game.html";
  };
};

var bgmusic = new Audio("./assets/Bg.mp3");
bgmusic.currentTime = 22;
bgmusic.volume=0.1;
bgmusic.loop = true;
bgmusic.play();
