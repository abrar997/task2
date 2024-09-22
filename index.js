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
    } else {
      item.classList.add("previous");
    }
  });

  // items[index].classList.add("active");
  pagination.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function updateIndex(newIndex) {
  index = (newIndex + items.length) % items.length;
  showSlides();
}

function nextSlide() {
  updateIndex(index + 1);
}

function prevSlide() {
  updateIndex(index - 1);
  showSlides();
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
    console.log("clicked");
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
