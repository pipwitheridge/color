var noOptions = 28;

var streakCount = 0

const showView = function(viewID) {
   const pV = document.getElementsByClassName("pageView");
   const pVLength = pV.length;
   for (let i = 0; i < pVLength; i++) {
    pV[i].style.display = "none";
   }
   pV[viewID].style.display = "";

}

function startCountdown() {
    let countdownNumber = 3;
    let countdownSpeed = streakCount < 10 ? 1000 - (50 * streakCount) : 400;
    showView(0);
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(() => {
        countdownElement.innerHTML = countdownNumber;
        countdownNumber--;
        if (countdownNumber < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Go!";
            showView(1);
            countdownNumber = "";
            countdownElement.innerHTML = countdownNumber;
        }
    }, countdownSpeed);
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
    document.getElementById("optionColors").innerHTML = "";
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
                alert('Got it!');
                streakCount++;
                startCountdown();
                loadAnswerColor();
                loadOptionColors();
                document.getElementById("streakCount").innerHTML = streakCount;
                if(streakCount > localStorage.getItem("recordCount")) {
                    localStorage.setItem("recordCount", streakCount)
                }
                document.getElementById("recordCount").innerHTML = localStorage.getItem("recordCount") ? localStorage.getItem("recordCount") : 0;
                showView(0);
            });
        }
        else {
            newEl.style.backgroundColor = rgb;
            newEl.addEventListener('click', () => {
                alert("Fail whale! :(")
                document.getElementById("correctAnswer").style.border = "2px solid black";
                setInterval(() => {
                    showView(2);
                }, 1500);
            });
        }
        document.getElementById("optionColors").append(newEl);
    }
}

var reloadElements = function() {
    startCountdown();
    loadAnswerColor();
    loadOptionColors();
    document.getElementById("streakCount").innerHTML = streakCount;
}

window.onload = function () {
    reloadElements();
    document.getElementById("playAgain").addEventListener("click", () => {
        window.location.reload();
    })
    document.getElementById("recordCount").innerHTML = localStorage.getItem("recordCount") ? localStorage.getItem("recordCount") : 0;
}


