var items = document.querySelectorAll(".item");
var nextBtn = document.getElementById("btn-next");
var prevBtn = document.getElementById("btn-prev");
var pagination = document.querySelectorAll(".dot");
let index = 0;
let interval;

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

function updateIndex(newIndex) {
  stopInterval();
  index = (newIndex + items.length) % items.length;
  showSlides();
  startInterval();
}

function nextSlide() {
  updateIndex(index + 1);
}

function prevSlide() {
  updateIndex(index - 1);
}

function startInterval() {
  interval = setInterval(nextSlide, 4000);
}
function stopInterval() {
  clearInterval(interval);
}

pagination.forEach((item, i) => {
  item.addEventListener("click", () => {
    index = i;
    showSlides();
    stopInterval();
    startInterval();
  });
});

nextBtn.addEventListener("click", function () {
  nextSlide();
  stopInterval();
  startInterval();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopInterval();
  startInterval();
});

items.forEach((item) => {
  item.addEventListener("mouseenter", stopInterval);
  item.addEventListener("mouseleave", startInterval);
});

showSlides(index);
startInterval();
