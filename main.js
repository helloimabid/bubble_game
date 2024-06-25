let timer = 5;
let status = 0;
let score = 0;
let ranhit;
let bubbleNumbers = [];
document.addEventListener("DOMContentLoaded", function () {
  hitnum();
  generateBubbles();
  window.addEventListener("resize", generateBubbles);
});

function generateBubbles() {
  let bottom = document.querySelector(".bottom");
  bottom.innerHTML = "";

  let bubbleSize = 45;
  let margin = 10;
  let totalBubbleSize = bubbleSize + margin;

  let bottomWidth = bottom.clientWidth;
  let bottomHeight = bottom.clientHeight;

  let columns = Math.floor(bottomWidth / totalBubbleSize) - 2;
  let rows = Math.floor(bottomHeight / totalBubbleSize) - 2;

  let totalBubbles = columns * rows;

  bubbleNumbers = [];

  for (let i = 0; i < totalBubbles - 1; i++) {
    let num;
    do {
      num = Math.floor(Math.random() * 10);
    } while (num === ranhit);
    bubbleNumbers.push(num);
  }

  bubbleNumbers.push(ranhit);

  for (let i = bubbleNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bubbleNumbers[i], bubbleNumbers[j]] = [bubbleNumbers[j], bubbleNumbers[i]];
  }

  for (let num of bubbleNumbers) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = num;
    bubble.style.width = `${bubbleSize}px`;
    bubble.style.height = `${bubbleSize}px`;
    bubble.style.margin = `${margin / 2}px`;
    bottom.appendChild(bubble);
  }
}

document.querySelector(".st-btn").addEventListener("click", function () {
  if (status == 0) {
    function runtimer() {
      let timecount = setInterval(function () {
        if (timer > 0) {
          timer--;
          document.querySelector(".timescore").textContent = timer;
          let remove = document.querySelector(".st-btn");
          remove.parentNode.removeChild(remove);
        } else {
          clearInterval(timecount);
          document.querySelector(".top").innerHTML = "RESULTS";
          document.querySelector(".bottom").innerHTML = `<div>
                    <div><h1>GAME OVER</h1></div>
                    <div><h3>Your Score Is:${score}</h3></div>
                    </div>`;
          document.querySelector(".reload").innerHTML = `<div>
                        <button class="reload">Play Again</button>
                    </div>`;
        }
      }, 1000);
    }
    status = 1;
    runtimer();
  } else {
    document.querySelector(".timescore").textContent = 60;
    status = 0;
  }
});

function hitnum() {
  ranhit = Math.floor(Math.random() * 10);
  document.querySelector(".hitscore").textContent = ranhit;
}

let reload = document.querySelector(".reload").addEventListener("click", function(){
  location.reload()
})

document.querySelector(".bottom").addEventListener("click", function (event) {
  if (status == 1 && event.target.classList.contains("bubble")) {
    let clicked = Number(event.target.textContent);
    if (clicked === ranhit) {
      scoreIncreaser();
      hitnum();
      generateBubbles();
    } else {
      alert("Wrong number!!!!!!!!");
      hitnum();
      generateBubbles();
      scoreDecreaser();
    }
  } else if (status == 0) {
    alert("Please click on the start button.");
  }
});

function scoreIncreaser() {
  score += 10;
  document.querySelector(".score").textContent = score;
}

function scoreDecreaser() {
  score -= 10;
  document.querySelector(".score").textContent = score;
}
