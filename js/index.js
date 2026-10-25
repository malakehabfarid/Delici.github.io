let sideBarBox = document.querySelector(".side-bar-popup .box"),
  navbarEle = document.querySelector("nav.navbar"),
  navLinks = document.querySelectorAll(
    ".nav-links .nav-link a, .side-bar-popup .links ul li a",
  ),
  carousel = document.querySelector("#M-carousel"),
  nextCarousel = document.querySelector("#M-carousel .next"),
  prevCarousel = document.querySelector("#M-carousel .prev"),
  indicators = document.querySelectorAll(".M-carousel-indicator"),
  slides = document.querySelectorAll(".M-carousel-item"),
  popupBox = document.querySelectorAll(".popUp .box"),
  sections = document.querySelectorAll(
    "#Home, #AboutUs, #OurStory, #SpecialDish, #Menu, #OurChefs, #ContactUs",
  ),
  form = document.querySelector("#ContactUs .container .box1 .form form"),
  inputs = document.querySelectorAll(
    "#ContactUs .container .box1 .form form input, #ContactUs .container .box1 .form form textarea",
  ),
  regexInputs = {
    name: /^[a-zA-Z]+(\s){0,}?$/,
    email: /^[A-Za-z_][A-Za-z_0-9\.]+@(gmail|yahoo)\.(com|io|org)$/,
    message: /[a-zA-Z]+/gm,
  },
  resetIcon = document.querySelector(
    "#ContactUs .container .box1 .form form .reset",
  ),
  menuNavbar = document.querySelectorAll(
    "#Menu .container .content .categories ul li",
  ),
  loadingPage = document.querySelector(".landing-page"),
  menuContainer = document.querySelector("#menuContainer"),
  leftColumn = document.querySelector("#part1 .item"),
  rightColumn = document.querySelector("#part2 .item"),
  searchInput = document.querySelector("#Search"),
  cancelBtn = document.querySelector("i.cancel");

updateMenuLinkActive(menuContainer.dataset.mealCategory);
showMeals();

sideBarBox.addEventListener("click", function (e) {
  e.stopPropagation();
});

checkScrolledNavbar();
updateActiveOnScroll();

popupBox.forEach(function (box) {
  box.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// move active class
navLinks.forEach(function (navLink) {
  navLink.addEventListener("click", function () {
    let section = this.dataset.section;
    setActiveLink(section);
  });
});

window.addEventListener("scroll", function () {
  sections.forEach(function (section) {
    updateActiveOnScroll();
  });
  moveNavbarScroll();
});

nextCarousel.addEventListener("click", function () {
  let currentSlide = carousel.querySelector(".M-carousel-item.active"),
    newSlide =
      currentSlide.nextElementSibling ??
      carousel.querySelector(".M-carousel-item:first-child"),
    currentName = newSlide.dataset.colorName;

  currentSlide.classList.remove("active");
  newSlide.classList.add("active");
  updateIndicators();
});

prevCarousel.addEventListener("click", function () {
  let currentSlide = carousel.querySelector(".M-carousel-item.active"),
    newSlide =
      currentSlide.previousElementSibling ??
      carousel.querySelector(".M-carousel-item:last-child"),
    currentName = newSlide.dataset.colorName;

  currentSlide.classList.remove("active");
  newSlide.classList.add("active");
  updateIndicators();
});

indicators.forEach((indicator) => {
  indicator.addEventListener("click", function () {
    let targetIndex = indicator.dataset.index;

    indicators.forEach(function (indicator) {
      indicator.classList.remove("active");
    });
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    indicator.classList.add("active");
    document
      .querySelector(`.M-carousel-item[data-index="${targetIndex}"]`)
      ?.classList.add("active");
  });
});

window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    loadingPage.classList.add("hide");
    setTimeout(function () {
      loadingPage.classList.add("d-none");
    }, 10);
  }, 3500);
});

let progressPar = document.querySelector(".scroll-progress");
window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY,
    scrollHeight = document.documentElement.scrollHeight - window.innerHeight,
    scrollPercentage = (scrollTop / scrollHeight) * 100;
  progressPar.style.width = scrollPercentage + "%";
});

menuNavbar.forEach(function (link) {
  link.addEventListener("click", function () {
    let selectedCategory = this.dataset.category;
    menuContainer.dataset.mealCategory = selectedCategory;
    updateMenuLinkActive(selectedCategory);
    showMeals();
  });
});

searchInput.addEventListener("keyup", function () {
  function search(searchValue) {
    let selectedCategory = menuContainer.dataset.mealCategory,
      categoryMeals = allMenu.filter(function (meal) {
        return meal.type === selectedCategory;
      }),
      filteredMeals = categoryMeals.filter(function (meal) {
        return meal.name.toLowerCase().includes(searchValue.toLowerCase());
      });
    showMeals(filteredMeals);
    isNoMeals(filteredMeals);
  }
  search(this.value);
});

cancelBtn.addEventListener("click", function () {
  searchInput.value = "";
});
