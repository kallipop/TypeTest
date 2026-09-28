const text = document.getElementById("text");
const test = document.getElementById("test");
const tier1 = [
  "The kettle takes about four minutes to boil, and the tea needs three more to steep. That is seven quiet minutes at the start of the day. Some people fill them with the radio or a phone. I mostly watch the window and let the water do its work.",
  "A bicycle stays upright by steering into its own fall. Lean a little and the front wheel turns into the lean, and the machine catches itself. Nobody balances a bicycle by thinking about it. The bicycle does most of the balancing on its own.",
  "The library on our street opens at ten and the same three people are always waiting at the door. One returns her books and leaves in under a minute. One heads for the newspapers. The third disappears into the far shelves and is still there when I leave.",
  "Bread wants patience more than skill. Flour, water, salt and time will do almost all of the work if you let them. The dough rises while you do something else entirely. The oven only makes official what the waiting already decided.",
];
const tier2 = [
  "It isn't the hills that tire you out on a long walk; it's the pavement. Soft ground gives a little with every step, but concrete gives nothing back. That's why a ten-mile day in the countryside can feel easier than five miles of city streets, and why your knees, not your lungs, file the first complaint.",
  "My grandmother's recipe card says “bake until done,” which is no help at all — or it's the only help that matters, depending on how you read it. She didn't own a timer. She owned a nose, a window in the oven door, and forty years of Tuesdays. The card assumes you'll acquire the same instruments.",
  "There's a moment on every train journey when the announcements stop, the trolley has passed, and the carriage settles into its long middle hour. Someone's asleep against the glass; someone's laptop has given up. Outside, the fields repeat themselves with small variations, like a patient argument.",
  "“Do you actually need it?” is the only question that shrinks a shopping list. Not “is it useful?” — everything is useful. Not “is it a bargain?” — that's the price talking, not you. Need has a shorter memory and a colder eye, and it's right far more often than it's thanked for.",
];
const tier3 = [
  "The 08:14 to Central runs every weekday, and in 2024 it was on time 91% of the mornings I caught it. The 08:44 manages barely 80%. Thirty minutes of sleep priced at eleven points of reliability: that is the whole trade, and I have taken the early train ever since March.",
  "A standard sheet of A4 paper measures 210 by 297 millimeters, and the ratio hides a small trick: fold it in half and you get A5 with exactly the same proportions. The A-series was standardized in Germany in 1922, and the idea is old enough that Lichtenberg described it in a letter in 1786.",
  "Our monthly budget meeting takes 25 minutes and follows the same three questions: What did we plan? What actually happened? What changes on the 1st? In January the grocery line was 40% over plan; by April it was 6% under. The spreadsheet didn't do that — the questions did, asked out loud, every month, without mercy.",
  "High tide at the harbor was listed at 14:37, height 4.2 meters, and the notice board added a warning in red capitals: CHECK YOUR LINES. By 15:00 the water had lifted every boat in the basin half a meter, and the gulls had moved from the mud to the railings, supervising the whole operation like unpaid foremen.",
];

let randomIndex = Math.floor(Math.random() * tier1.length);
let randomParagraph = tier1[randomIndex];

let letters = randomParagraph.split("");
let index = 0;

text.textContent = "";
const time = document.getElementById("time");
const timer = document.getElementById("timer");

let timeLeft = Number(time.value);
let timeStart = Number(time.value);
let timeUsed = 0;
let started = false;
let mistakes = 0;
let wpm = 0;
let accuracy = 0;

time.addEventListener("change", function () {
  timeLeft = Number(time.value);
  timeStart = Number(time.value);
  timer.textContent = "Time: " + timeLeft + " seconds";

  chooseParagraph();
  loadParagraph();
  time.blur();
});

time.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

const results = document.getElementById("results");

for (let i = 0; i < letters.length; i++) {
  const span = document.createElement("span");

  span.textContent = letters[i];
  text.append(span);
}

let spans = test.querySelectorAll("span");
spans[index].classList.add("current");
let timerInterval;

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }

  if (event.key.length === 1) {
    if (!started) {
      timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = "Time: " + timeLeft + " seconds";

        if (timeLeft === 0) {
          clearInterval(timerInterval);
          timeUsed = timeStart - timeLeft;
          wpm = index / 5 / (timeUsed / 60);
          accuracy = (index / (index + mistakes)) * 100;
          results.style.display = "flex";
          results.innerHTML =
            "Time's up! Mistakes: " +
            mistakes +
            "<br>WPM: " +
            Math.round(wpm) +
            "<br>Accuracy: " +
            Math.round(accuracy) +
            " %";
        }
      }, 1000);
      started = true;
    }

    if (event.key === letters[index]) {
      spans[index].style.color = "green";
      spans[index].classList.remove("current");
      index++;

      if (index < letters.length) {
        spans[index].classList.add("current");
      }
      if (index === letters.length) {
        clearInterval(timerInterval);
        timeUsed = timeStart - timeLeft;
        wpm = index / 5 / (timeUsed / 60);
        accuracy = (index / (index + mistakes)) * 100;
        results.style.display = "flex";
        results.innerHTML =
          "Finished! Mistakes: " +
          mistakes +
          "<br>WPM: " +
          Math.round(wpm) +
          "<br>Accuracy: " +
          Math.round(accuracy) +
          " %";
      }
    } else {
      spans[index].style.color = "red";
      mistakes++;
    }
  }
});

const newTest = document.getElementById("newTest");
newTest.addEventListener("click", function () {
  clearInterval(timerInterval);
  index = 0;
  timeLeft = Number(time.value);
  started = false;
  mistakes = 0;

  chooseParagraph();
  loadParagraph();

  timer.textContent = "Time: " + timeLeft + " seconds";

  results.style.display = "none";
});

function chooseParagraph() {
  if (time.value === "15") {
    randomIndex = Math.floor(Math.random() * tier1.length);
    randomParagraph = tier1[randomIndex];
  } else if (time.value === "30") {
    let i = Math.floor(Math.random() * 2);
    if (i === 0) {
      randomIndex = Math.floor(Math.random() * tier1.length);
      randomParagraph = tier1[randomIndex];
    } else {
      randomIndex = Math.floor(Math.random() * tier2.length);
      randomParagraph = tier2[randomIndex];
    }
  } else if (time.value === "60") {
    randomIndex = Math.floor(Math.random() * tier2.length);
    randomParagraph = tier2[randomIndex];
  } else {
    randomIndex = Math.floor(Math.random() * tier3.length);
    randomParagraph = tier3[randomIndex];
  }
}

function loadParagraph() {
  text.textContent = "";
  letters = randomParagraph.split("");

  for (let i = 0; i < letters.length; i++) {
    const span = document.createElement("span");

    span.textContent = letters[i];
    text.append(span);
  }

  spans = test.querySelectorAll("span");
  spans[index].classList.add("current");
}
