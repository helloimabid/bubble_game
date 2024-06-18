let timer = 60
let status = 0
let score = 0
let score1 = 0
let ranhit;

document.addEventListener("DOMContentLoaded", function () {
    generateBubbles();
    hitnum();    
});
function generateBubbles(){
    let value = "";
    for (let i = 1; i < 199; i++) {
        let num = Math.floor(Math.random() * 10)
        value += `<div class="bubble">${num}</div>`;
    }
    
    document.querySelector(".bottom").innerHTML = value;

}
document.querySelector(".st-btn").addEventListener("click", function () {
    if (status == 0) {
        function runtimer() {

            let timecount = setInterval(function () {
                if (timer > 0) {
                    timer--
                    document.querySelector(".timescore").textContent = timer
                    let remove = document.querySelector(".st-btn")
                    remove.parentNode.removeChild(remove)
                } else {
                    clearInterval(timecount)
                    document.querySelector(".top").innerHTML = "RESULTS"
                    document.querySelector(".bottom").innerHTML = `<h1 style="font-weight: 500;" >GAME OVER</h1>
                    <h3>YOUR SCORE IS:</h3>
                    ${score}`
                }
            }, 1000)
        }
        status = 1
        runtimer()

    } else {
        document.querySelector(".timescore").textContent = 60
        status = 0
    }

})

function hitnum() {
    ranhit = Math.floor(Math.random() * 10)

    document.querySelector(".hitscore").textContent = ranhit

}

// document.querySelector(".bottom").addEventListener("click", function (dets) {
//     if ( status ==1 && dets.target.classList.contains("bubble")) {

//         let clicked = Number(dets.target.textContent)
//         if (clicked === ranhit) {
//             scoreIncreaser()
            
//         } else {
//             scoredecreaser()
            
//             alert("wrong number!!!!!!!!")
//         }
//         generateBubbles();
//         hitnum()
//     }else if{
//         alert("please click on the start buttton")
//         generateBubbles();
//         hitnum()
//     }
// })
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
    score += 10
    document.querySelector(".score").textContent = score
}
function scoreDecreaser(){
    score -= 10
    document.querySelector(".score").textContent = score 
}