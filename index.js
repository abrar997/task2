var items = document.querySelectorAll(".item");
var nextBtn = document.querySelector(".next-btn");
var prevBtn = document.querySelector(".prev-btn");
var pagination = document.querySelectorAll(".dot");
let index = 0;
let interval;
var isDragging = false;
let startX = 0;
let currentX = 0;

//slide showing and transition with class
function showSlides() {
  items.forEach((item, i) => {
    item.classList.remove("active", "previous", "next");
    if (i === index) {
      item.classList.add("active");
    } else if (i > index) {
      item.classList.add("next");
    } else if (i === (index - 1 + items.length) % items.length) {
      item.classList.add("previous");
    } else {
      item.classList.add("next");
    }
  });

  pagination.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

// controller to next and previous slide
function updateIndex(newIndex) {
  stopInterval();
  index = (newIndex + items.length) % items.length;
  showSlides();
}

// for next slide
function nextSlide() {
  updateIndex(index + 1);
}

// add event to next btn
nextBtn.addEventListener("click", function () {
  nextSlide();
  stopInterval();
  startInterval();
});

// for prev slide
function prevSlide() {
  updateIndex(index - 1);
}

// add event to prev btn
prevBtn.addEventListener("click", () => {
  prevSlide();
  stopInterval();
  startInterval();
});

// autoplay
function startInterval() {
  interval = setInterval(nextSlide, 3500);
}

// stop autoplay
function stopInterval() {
  clearInterval(interval);
}

// move when drag
items.forEach((item) => {
  item.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX;
    item.addEventListener("mousemove", function (move) {
      if (!isDragging) return;
      currentX = move.clientX;
    });
    item.addEventListener("mouseup", function () {
      if (isDragging) {
        if (startX - currentX > 50) {
          nextSlide();
        } else if (startX - currentX < 50) {
          prevSlide();
        }
        isDragging = false;
      }
    });
    item.addEventListener("mouseleave", function () {
      isDragging = false;
    });
  });
});

// pagination
pagination.forEach((item, i) => {
  item.addEventListener("click", () => {
    index = i;
    showSlides();
    stopInterval();
    startInterval();
  });
});

//add event to control autoplay
items.forEach((item) => {
  item.addEventListener("mouseenter", stopInterval);
  item.addEventListener("mouseleave", startInterval);
});

showSlides(index);
startInterval();
