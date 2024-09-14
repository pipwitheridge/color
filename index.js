var noOptions = 28;

const showView = function(viewID) {
   const pV = document.getElementsByClassName("pageView");
   const pVLength = pV.length;
   for (let i = 0; i < pVLength; i++) {
    pV[i].style.display = "none";
   }
   pV[viewID].style.display = "";

}

function startCountdown() {
    showView(0);
    let countdownNumber = 3;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(() => {
        countdownElement.innerHTML = countdownNumber;
        countdownNumber--;
        if (countdownNumber < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Go!";
            showView(1);
        }
    }, 1000);
    
}

const loadAnswerColor = function() {
    var randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
        var r = randomBetween(0, 255);
        var g = randomBetween(0, 255);
        var b = randomBetween(0, 255);
        var rgb = `rgb(${r},${g},${b})`;
        document.getElementById("answerColor").style.backgroundColor = rgb;
}
const loadOptionColors = function() {
    var randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    var answerSquare = randomBetween(1, noOptions)
    for(let i = 0; i < noOptions; i++) {
        var r = randomBetween(0, 255);
        var g = randomBetween(0, 255);
        var b = randomBetween(0, 255);
        var rgb = `rgb(${r},${g},${b})`;
        var newEl = document.createElement('div');
        newEl.classList.add('optionColor');
        if(i === answerSquare) {
            newEl.style.backgroundColor = document.getElementById("answerColor").style.backgroundColor;
            newEl.id = "correctAnswer";
            newEl.addEventListener('click', () => {
                alert('GOT IT!');
                noOptions +10;
                location.reload();
            });
        }
        else {
            newEl.style.backgroundColor = rgb;
            newEl.addEventListener('click', () => {
                alert('FAIL WHALE!');
                document.getElementById("correctAnswer").style.border = "2px solid black";
                const countdownInterval = setInterval(() => {
                    location.reload();
                }, 1500);
            });
        }
        document.getElementById("optionColors").append(newEl);
    }
}

window.onload = function () {
    startCountdown();
    loadAnswerColor();
    loadOptionColors();
}
