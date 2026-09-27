const text = document.getElementById("text");
const sentence = text.textContent;
const letters = sentence.split("");
let index=0;
text.textContent="";
const time = document.getElementById("time");
const timer = document.getElementById("timer");

let timeLeft = Number(time.value);
let timeStart = Number(time.value);
let timeUsed=0;
let started=false;
let mistakes=0;
let wpm=0;
let accuracy=0;

const results = document.getElementById("results");

for(let i=0;i<letters.length;i++){
    const span = document.createElement("span");

    span.textContent = letters[i];
    text.append(span);
}

const spans = test.querySelectorAll("span");
spans[index].classList.add("current");
let timerInterval;

document.addEventListener("keydown",function(event){
    

    if(/^[a-zA-Z]$/.test(event.key) || event.key===" " || event.key==="."){
        if(!started){
        timerInterval=setInterval(() => {
            timeLeft--;
            timer.textContent = "Timer: " + timeLeft;

            if(timeLeft ===0){
                clearInterval(timerInterval);
                timeUsed= timeStart -timeLeft;
                wpm = (index/5) /(timeUsed/60);
                accuracy = index/(index +mistakes)* 100;
                results.style.display="flex"
                results.innerHTML= "Time's up! Mistakes: "+ mistakes +"<br>WPM: "+ Math.round(wpm) + "<br>Accuracy: "+ Math.round(accuracy) +" %";
            }

        },1000);
        started=true;
    }

        if(event.key ===letters[index]){

            spans[index].style.color="green";
            spans[index].classList.remove("current");
            index++;

            if(index <letters.length){
                spans[index].classList.add("current");
            }
            if(index===letters.length){
                clearInterval(timerInterval)
                timeUsed= timeStart -timeLeft;
                wpm = (index/5) /(timeUsed/60);
                accuracy = index/(index +mistakes)* 100;
                results.style.display="flex"
                results.innerHTML="Finished! Mistakes: "+mistakes +"<br>WPM: "+ Math.round(wpm) + "<br>Accuracy: "+ Math.round(accuracy) +" %";
            }
        }else{
            spans[index].style.color="red";
            mistakes++;
        }
        
    }
} )

const newTest = document.getElementById("newTest");
newTest.addEventListener("click",function(){
    clearInterval(timerInterval);
    index=0;
    timeLeft = Number(time.value);
    started=false;
    mistakes=0;

    for(let i=0;i<letters.length;i++){
        spans[i].style.color="";
        spans[i].classList.remove("current");
    }

    spans[index].classList.add("current");
    timer.textContent ="Time: "+ timeLeft;

    results.style.display="none";
})


