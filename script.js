const words = [
    "Web Developer",
    "Sales Specialist",
    "Lead Generation Expert",
    "IT Student"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typingEl = document.getElementById("typing");

function type() {

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingEl.textContent = currentWord.substring(0, charIndex);

    let speed = deleting ? 60 : 120;

    if (!deleting && charIndex === currentWord.length) {
        speed = 1200;          // pause at the end of the word
        deleting = true;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }

    setTimeout(type, speed);
}

if (typingEl) {
    type();
}


/* =======================================================
   2. IMAGE SLIDER
   ======================================================= */

const slides = document.getElementById("slides");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsBox = document.getElementById("dots");

if (slides) {

    const images = slides.querySelectorAll("img");
    const total = images.length;

    let current = 0;
    let timer;

    /* --- create one dot per image --- */
    for (let i = 0; i < total; i++) {

        const dot = document.createElement("button");
        dot.className = "dot";

        dot.addEventListener("click", function () {
            current = i;
            showSlide();
            resetTimer();
        });

        dotsBox.appendChild(dot);
    }

    const dots = dotsBox.querySelectorAll(".dot");

    /* --- move the strip and update dots --- */
    function showSlide() {

        slides.style.transform = "translateX(" + (-current * 100) + "%)";

        dots.forEach(function (dot, i) {
            dot.classList.toggle("active", i === current);
        });
    }

    function nextSlide() {
        current = (current + 1) % total;
        showSlide();
    }

    function prevSlide() {
        current = (current - 1 + total) % total;
        showSlide();
    }

    nextBtn.addEventListener("click", function () {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener("click", function () {
        prevSlide();
        resetTimer();
    });

    /* --- autoplay every 4 seconds --- */
    function startTimer() {
        timer = setInterval(nextSlide, 4000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    showSlide();
    startTimer();
}


/* =======================================================
   3. ACCORDION
   ======================================================= */

const headers = document.querySelectorAll(".accordion-header");

headers.forEach(function (header) {

    header.addEventListener("click", function () {

        const body = header.nextElementSibling;
        const isOpen = header.classList.contains("active");

        /* close every item first (only one open at a time) */
        headers.forEach(function (h) {
            h.classList.remove("active");
            h.nextElementSibling.style.maxHeight = null;
        });

        /* open the clicked one, unless it was already open */
        if (!isOpen) {
            header.classList.add("active");
            body.style.maxHeight = body.scrollHeight + "px";
        }
    });
});
