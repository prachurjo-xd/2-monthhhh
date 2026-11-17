
/* =========================================
   TWO MONTHS — TULKA ♡
   COMPLETE FINAL JAVASCRIPT
========================================= */


/* =========================================
   1. PERSONAL SETTINGS
========================================= */

const CONFIG = {
  herName: "TULKA",
  nickname: "DAARRLINGG JIII",
  yourName: "PRACHURJO",

  startDate: new Date(2026, 8, 18),

  openingMessage: "SOMETHING STARTED 2 MONTHS AGO 🥰",

  /* MEMORY MATCH PHOTOS */

  photos: [
    "photos/memory-01.jpeg",
    "photos/memory-02.jpeg",
    "photos/memory-03.jpeg",
    "photos/memory-04.jpeg",
    "photos/memory-05.jpeg",
    "photos/memory-06.jpeg"
  ],

  captions: [
    "18 September — The day our little story began. ❤️",
    "26 September — SPHURON PARTY. THAT WAIST MOMENTTT 😭",
    "30 September — KHANAZ DATE. Our first kiss. AHEM. ❤️",
    "18 October — RAAGA ART CAFE. Our first month together. 🥹",
    "12 November — CENTREPOINT. The hotty and baddie dateee.",
    "More memories waiting to be made. ♡"
  ],

  /* WHO SAID IT? */

  quotes: [
    {
      text: "YOU ARE JS MY FRIEND LOL",
      speaker: "her"
    },
    {
      text: "MEYETA AMR BONDHU OKE DATE KORA JABENA",
      speaker: "you"
    },
    {
      text: "UFFFF TMII EMONN KENOOOO",
      speaker: "her"
    },
    {
      text: "ALLAH ALLAH ALLAH",
      speaker: "you"
    },
    {
      text: "MAAF",
      speaker: "her"
    }
  ],

  /* GUESS THE MEMORY */

  guesses: [
    {
      photo: "photos/selim-party.jpeg",
      question: "Where did this memory happen?",
      options: [
        "SELIM PARTY",
        "OISHI BASHA",
        "CENTREPOINT ADVENTURE"
      ],
      answer: 0
    },
    {
      photo: "photos/centrepoint.jpeg",
      question: "Which adventure are we remembering?",
      options: [
        "OUR KHANAZ DATE",
        "CENTREPOINT ADVENTURE",
        "SELIM PARTY"
      ],
      answer: 1
    },
    {
      photo: "photos/oishi-basha.jpeg",
      question: "Do you remember this little moment?",
      options: [
        "CENTREPOINT ADVENTURE",
        "SELIM PARTY",
        "OISHI BASHA"
      ],
      answer: 2
    }
  ],

  /* FINAL LETTER */

  letter: `Hiiiiii TULKAAAA,

HAPPY TWO MONTHSSSSS LOOOVEEYY !! 🥹❤️

Can you believe it's already been two months since 18 September? Sometimes I think about how everything started, and honestly, after that longgg, difficult and painful phase, I never imagined we'd have so many little memories to look back on.

From that very first moment to the Sphuron party, our Khanaz date (ahem 😭), our first kiss, our first-month anniversary at Raaga Art Cafe, and our latest Centrepoint adventure — every single one of these moments means something to me.

I still remember that card you brought me. I still remember the small small notes you gave me. I remember our matching outfits, all our little conversations, and how we somehow manage to turn an ordinary day into something memorable. The little walks.

And look at us now. TWO MONTHS. Hehehehe.

I don't know what the future has planned for us, but I genuinely hope we get to experience all those things we've talked about. I hope we become crazy rich and spoil each other with adult money. I hope we get that sunset by the seashore, with nobody around, your head on my shoulder, and that perfect little moment when the sun disappears.

Most importantly, I hope we both achieve everything we've ever dreamed of. I hope we grow, succeed, make each other proud, and keep choosing each other along the way.

I can't promise that every day will be perfect, but I hope we always try to understand each other, communicate, and make beautiful memories together.

Thank you for being part of these two months and for giving me so many moments that I can smile about.

Here's to our little story, all the memories we've made, and all the ones waiting for us.

HAPPY TWO MONTHS, TULKA.

I LOVE YOUUUUU. HEHEHEHEHE 🥰❤️`,

  insideJoke: "YOUR SECRET INSIDE JOKE ♡"
};


/* =========================================
   2. INITIAL SETUP
========================================= */

const $ = id => document.getElementById(id);

let completed = new Set();

let matched = 0;
let first = null;
let second = null;
let memoryLocked = false;

let quoteIndex = 0;
let quoteLocked = false;

let guessIndex = 0;
let guessLocked = false;

let currentSlide = 1;

let envelopeOpened = false;
let finalOpened = false;

let letterTimer = null;
let musicAudio = null;
let musicGain = null;
let musicInterval = null;
let musicMuted = false;


/* =========================================
   3. BACKGROUND STARS
========================================= */

function createStars() {
  const container = $("stars");

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 80; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";

    container.appendChild(star);
  }
}


/* =========================================
   4. LIVE RELATIONSHIP COUNTER
========================================= */

function updateCounter() {
  const counter = $("counter");

  if (!counter) return;

  const now = new Date();
  const start = CONFIG.startDate;

  if (now < start) {
    counter.textContent = "Our story starts soon ♡";
    return;
  }

  const diff = now - start;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;

  counter.textContent =
    `${days} days · ${hours} hours · ${minutes} min`;
}

updateCounter();
setInterval(updateCounter, 60000);


/* =========================================
   5. ENVELOPE OPENING
========================================= */

$("openEnvelope").addEventListener("click", () => {
  if (envelopeOpened) return;

  envelopeOpened = true;

  $("openEnvelope").classList.add("opened");

  $("openingLine").textContent = CONFIG.openingMessage;
  $("openingLine").classList.add("visible");

  setTimeout(() => {
    $("intro").classList.add("hidden");
    $("story").classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, 1600);
});


/* =========================================
   6. GAME SLIDE NAVIGATION
========================================= */

function showGameSlide(number) {
  if (number < 1 || number > 3) return;

  currentSlide = number;

  for (let i = 1; i <= 3; i++) {
    const slide = $("gameSlide" + i);

    slide.classList.toggle("hidden", i !== number);
    slide.classList.toggle("active", i === number);

    const dots = slide.querySelectorAll(".game-dot");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === number - 1);
    });
  }

  window.scrollTo({
    top: $("gamesContainer").getBoundingClientRect().top
      + window.scrollY - 25,
    behavior: "smooth"
  });
}

$("nextGame1").addEventListener("click", () => {
  showGameSlide(2);
});

$("previousGame2").addEventListener("click", () => {
  showGameSlide(1);
});

$("nextGame2").addEventListener("click", () => {
  showGameSlide(3);
});

$("previousGame3").addEventListener("click", () => {
  showGameSlide(2);
});


/* =========================================
   7. MEMORY MATCH GAME
========================================= */

function buildMemoryGame() {
  const cards = CONFIG.photos.flatMap((photo, index) => [
    {
      photo,
      pair: index,
      caption: CONFIG.captions[index]
    },
    {
      photo,
      pair: index,
      caption: CONFIG.captions[index]
    }
  ]);

  // Fisher-Yates shuffle

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  const grid = $("memoryGrid");

  grid.innerHTML = "";

  cards.forEach(card => {
    const button = document.createElement("button");

    button.className = "memory-card-button";
    button.setAttribute("aria-label", "Hidden memory card");

    button.addEventListener("click", () => {
      flipCard(button, card);
    });

    grid.appendChild(button);
  });

  matched = 0;
  first = null;
  second = null;
  memoryLocked = false;

  $("memoryFeedback").textContent = "Find all six pairs ♡";
}

function flipCard(button, card) {
  if (
    memoryLocked ||
    button.disabled ||
    button === first?.button ||
    completed.has("memory")
  ) {
    return;
  }

  button.classList.add("flipped");
  button.innerHTML = "";

  const image = document.createElement("img");

  image.src = card.photo;
  image.alt = "A memory from our story";

  button.appendChild(image);
  button.disabled = true;

  if (!first) {
    first = { button, card };
    return;
  }

  second = { button, card };

  if (first.card.pair === second.card.pair) {

    first.button.classList.add("matched");
    second.button.classList.add("matched");

    matched++;

    $("memoryFeedback").textContent =
      first.card.caption + " ♡";

    first = null;
    second = null;

    if (matched === CONFIG.photos.length) {
      $("memoryFeedback").textContent =
        "You found every pair! First key piece collected ♡";

      collectKey("memory", "piece1");
    }

  } else {

    memoryLocked = true;

    $("memoryFeedback").textContent =
      "Not a match! Try another pair ♡";

    const firstCard = first.button;
    const secondCard = second.button;

    setTimeout(() => {
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      firstCard.disabled = false;
      secondCard.disabled = false;

      first = null;
      second = null;

      memoryLocked = false;
    }, 950);
  }
}

$("resetMemory").addEventListener("click", () => {
  if (!completed.has("memory")) {
    buildMemoryGame();
  }
});


/* =========================================
   8. WHO SAID IT?
========================================= */

function showQuote() {
  if (quoteIndex >= CONFIG.quotes.length) return;

  const quote = CONFIG.quotes[quoteIndex];

  $("quoteText").textContent = quote.text;

  $("quoteProgress").textContent =
    `Message ${quoteIndex + 1} of ${CONFIG.quotes.length}`;

  $("saidFeedback").textContent = "Take a guess ♡";

  quoteLocked = false;

  $("youAnswer").disabled = false;
  $("herAnswer").disabled = false;
}

function answerQuote(answer) {
  if (quoteLocked || completed.has("said")) return;

  quoteLocked = true;

  const quote = CONFIG.quotes[quoteIndex];

  $("youAnswer").disabled = true;
  $("herAnswer").disabled = true;

  const correct = answer === quote.speaker;

  $("saidFeedback").textContent = correct
    ? "YOU GOT ITTT! You know your conversations ♡"
    : `A cute guess! It was ${quote.speaker === "her" ? CONFIG.herName : CONFIG.yourName}.`;

  quoteIndex++;

  if (quoteIndex === CONFIG.quotes.length) {

    $("saidFeedback").textContent =
      "All five messages completed. Second key piece collected! ♡";

    collectKey("said", "piece2");

  } else {

    setTimeout(showQuote, 1400);
  }
}

$("youAnswer").textContent = CONFIG.yourName;
$("herAnswer").textContent = CONFIG.herName;

$("youAnswer").addEventListener("click", () => {
  answerQuote("you");
});

$("herAnswer").addEventListener("click", () => {
  answerQuote("her");
});

showQuote();


/* =========================================
   9. GUESS THE MEMORY
========================================= */

function showGuess() {
  if (guessIndex >= CONFIG.guesses.length) return;

  const item = CONFIG.guesses[guessIndex];

  $("guessPhoto").src = item.photo;
  $("guessPhoto").classList.remove("revealed");

  $("guessQuestion").textContent = item.question;

  $("guessOptions").innerHTML = "";

  $("guessFeedback").textContent =
    `Memory ${guessIndex + 1} of ${CONFIG.guesses.length} ♡`;

  guessLocked = false;

  item.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.addEventListener("click", () => {
      answerGuess(index);
    });

    $("guessOptions").appendChild(button);
  });
}

function answerGuess(index) {
  if (guessLocked || completed.has("guess")) return;

  guessLocked = true;

  const item = CONFIG.guesses[guessIndex];

  $("guessPhoto").classList.add("revealed");

  $("guessFeedback").textContent =
    index === item.answer
      ? "YOU REMEMBERED! ♡"
      : `It was ${item.options[item.answer]}! Here's the memory anyway ♡`;

  [...$("guessOptions").children].forEach(button => {
    button.disabled = true;
  });

  guessIndex++;

  if (guessIndex === CONFIG.guesses.length) {

    setTimeout(() => {
      $("guessFeedback").textContent =
        "All three memories revealed! Third key piece collected ♡";

      collectKey("guess", "piece3");
    }, 1400);

  } else {

    setTimeout(showGuess, 1800);
  }
}

showGuess();


/* =========================================
   10. COLLECT KEY PIECES
========================================= */

function collectKey(game, piece) {
  if (completed.has(game)) return;

  completed.add(game);

  $(piece).classList.add("collected");

  $("keyMessage").textContent =
    `${completed.size} of 3 key pieces collected ♡`;

  if (completed.size === 3) {

    $("keyIcon").classList.add("unlocked");

    $("keyMessage").textContent =
      "The key is complete. Your final surprise is waiting. ❤️";

    $("openDoor").disabled = false;

    $("openDoor").textContent =
      "UNLOCK THE FINAL LETTER ♡";
  }
}


/* =========================================
   11. SECRET INSIDE JOKE
========================================= */

function revealInsideJoke() {
  const jokeCard = $("jokeCard");

  if (!jokeCard) return;

  jokeCard.textContent = CONFIG.insideJoke;
  jokeCard.classList.remove("hidden");

  setTimeout(() => {
    jokeCard.classList.add("hidden");
  }, 4000);
}

$("secretHeart").addEventListener("click", revealInsideJoke);

let titleClicks = 0;

document.querySelector(".intro h1").addEventListener("click", () => {
  titleClicks++;

  if (titleClicks === 5) {
    revealInsideJoke();
    titleClicks = 0;
  }
});


/* =========================================
   12. FINAL LETTER TYPING
========================================= */

function finishLetter() {
  if (letterTimer) {
    clearInterval(letterTimer);
    letterTimer = null;
  }

  $("letterText").textContent = CONFIG.letter;

  $("signature").classList.remove("pending");

  $("skipLetter").classList.add("hidden");
}

function typeLetter() {
  const target = $("letterText");

  target.textContent = "";

  $("signature").classList.add("pending");
  $("skipLetter").classList.remove("hidden");

  let index = 0;

  if (letterTimer) {
    clearInterval(letterTimer);
  }

  letterTimer = setInterval(() => {

    target.textContent += CONFIG.letter[index];

    index++;

    if (index >= CONFIG.letter.length) {
      finishLetter();
    }

  }, 35);
}

$("skipLetter").addEventListener("click", finishLetter);


/* =========================================
   13. SOFT SYNTHESIZED MUSIC
========================================= */

function playSoftMusic() {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    $("muteBtn").textContent = "♪ OFF";
    return;
  }

  musicAudio = new AudioContext();

  musicGain = musicAudio.createGain();

  musicGain.gain.value = musicMuted ? 0 : 0.45;

  musicGain.connect(musicAudio.destination);

  const notes = [
    392, 493.88, 587.33, 493.88,
    440, 523.25, 659.25, 523.25
  ];

  let i = 0;

  function playNote() {
    if (!musicAudio || musicAudio.state === "closed") return;

    const oscillator = musicAudio.createOscillator();
    const volume = musicAudio.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = notes[i % notes.length];

    volume.gain.setValueAtTime(
      0.0001,
      musicAudio.currentTime
    );

    volume.gain.exponentialRampToValueAtTime(
      0.035,
      musicAudio.currentTime + 0.15
    );

    volume.gain.exponentialRampToValueAtTime(
      0.0001,
      musicAudio.currentTime + 1
    );

    oscillator.connect(volume);
    volume.connect(musicGain);

    oscillator.start();
    oscillator.stop(musicAudio.currentTime + 1.1);

    i++;
  }

  playNote();

  musicInterval = setInterval(playNote, 1100);

  musicAudio.resume();
}

function toggleMusic() {
  musicMuted = !musicMuted;

  if (musicGain && musicAudio) {
    musicGain.gain.setTargetAtTime(
      musicMuted ? 0 : 0.45,
      musicAudio.currentTime,
      0.1
    );
  }

  $("muteBtn").textContent =
    musicMuted ? "♪ OFF" : "♪ ON";
}

$("muteBtn").addEventListener("click", toggleMusic);


/* =========================================
   14. FINAL DOOR
========================================= */

$("openDoor").addEventListener("click", () => {
  if (completed.size !== 3 || finalOpened) return;

  finalOpened = true;

  $("story").classList.add("hidden");
  $("finalScreen").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  typeLetter();

  playSoftMusic();
});


/* =========================================
   15. PRELOAD PHOTOS
========================================= */

function preloadPhotos() {
  const allPhotos = [
    ...CONFIG.photos,
    ...CONFIG.guesses.map(item => item.photo)
  ];

  allPhotos.forEach(path => {
    const image = new Image();
    image.src = path;
  });
}


/* =========================================
   16. START EVERYTHING
========================================= */

createStars();
preloadPhotos();
buildMemoryGame();
showGameSlide(1);
showQuote();
showGuess();

