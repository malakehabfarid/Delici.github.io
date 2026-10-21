
function openSideBar() {
    let sideBarEle = document.querySelector(".side-bar-popup");
    sideBarEle.classList.add('active');
    setTimeout(function() {
        sideBarEle.classList.add('show');
    }, 10);
}

function closeSideBar() {
    let sideBarEle = document.querySelector(".side-bar-popup");
    sideBarEle.classList.remove('show');
    setTimeout(function() {
        sideBarEle.classList.remove('active');
    }, 1000);
}

function openBookPopup() {
    let popupEle = document.querySelector(".popupBook");
    popupEle.classList.add('active');
    setTimeout(function() {
        popupEle.classList.add('show');
    }, 10);
}

function closeBookPopup() {
    let popupEle = document.querySelector(".popupBook");
    popupEle.classList.remove('show');
    setTimeout(function() {
        popupEle.classList.remove('active');
    }, 1000);
}

function openMenuPopup() {
    let popupEle = document.querySelector(".popupMenu");
    popupEle.classList.add('active');
    setTimeout(function() {
        popupEle.classList.add('show');
    }, 10);
}

function closeMenuPopup() {
    let popupEle = document.querySelector(".popupMenu");
    popupEle.classList.remove('show');
    setTimeout(function() {
        popupEle.classList.remove('active');
    }, 1000);
}

function updateIndicators() {
 
  let activeSlide = document.querySelector('.M-carousel-item.active'),
    currentIndex = activeSlide.dataset.index;

  indicators.forEach(function(indicator){
    if (indicator.dataset.index === currentIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

function setActiveLink(sectionName) {
    navLinks.forEach(function(navLink) {
        let parentEle = navLink.closest("li");
        if (parentEle) {
            parentEle.classList.remove("active");
            if (navLink.dataset.section === sectionName) {
                parentEle.classList.add("active");
            }
        }
    });
}

function getSectionName(sectionId) {
    let sectionNames = {
        Home: "home",
        AboutUs: "about",
        OurStory: "story",
        SpecialDish: "dish",
        Menu: "menu",
        OurChefs: "chef",
        ContactUs: "contact"
    };
    return sectionNames[sectionId];
}

function updateActiveOnScroll() {
    let scrollPosition = window.scrollY + 150,
        currentSection = sections[0];
    sections.forEach(function (section) {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section;
        }
    });
    if (currentSection) {
        let sectionLink = document.querySelector(
            `.nav-links a[data-section="${getSectionName(currentSection.id)}"]`
        );
        if (sectionLink) {
            setActiveLink(sectionLink.dataset.section);
        }
    }
}

let lastScrollPosition = window.scrollY;
function moveNavbarScroll() {
    // Add background after scrolling
    if (window.scrollY > 10) {
        navbarEle.classList.add("scrolled");
    } else {
        navbarEle.classList.remove("scrolled");
    }
    // Hide navbar when scrolling down
    if (window.scrollY > lastScrollPosition && window.scrollY > 50) {
        navbarEle.classList.add("hide-navbar");
    } else if (window.scrollY < lastScrollPosition) {
        navbarEle.classList.remove("hide-navbar");
        // navbarEle.classList.add("scrolled");
    }// Show navbar when scrolling up
    lastScrollPosition = window.scrollY;
}

function checkScrolledNavbar() {
  if (window.scrollY > 10) {
    navbarEle.classList.add("scrolled");
  } else {
    navbarEle.classList.remove("scrolled");
  }
}

function updateMenuLinkActive(selectedCategory) {
    menuNavbar.forEach(function (link) {
        link.classList.remove('active');
        if (link.dataset.category === selectedCategory) {
            link.classList.add('active');
        } 
    });
}

function createMeal (meal) {
    return `
        <div class="meal row center" data-meal-category="${meal.type}" >
            <div class="col-4 col-lg-3 center">
                <div class="image center position-relative" data-id="${meal.id}" data-type="${meal.type}">
                    <div class="mealImage" style="background-image: url('images/${meal.images[0]}')"></div>
                    <div class="layout center fs-4"><i class="fa-regular fa-square-plus w-25" onclick="openMenuPopup(); showMeal(${meal.id});"></i></div>
                </div>
            </div>
            <div class="col-8 col-lg-9 center">
                <div class="desc ">
                    <div class="d-flex flex-column flex-sm-row align-items-sm-center flex-md-row align-items-md-center column-gap-3 mb-2">
                        <h5 class="mealName m-0"> ${meal.name}</h5>
                        <div class="descLine d-none d-sm-block d-md-block"></div>
                        <h5 class="mealPrice m-0">$${Number(meal.price).toFixed(2)}</h5>
                    </div>
                    <p class="mb-0">
                        ${meal.miniDescription}
                    </p>
                </div>
            </div>
        </div>
    `;
}

function showMeals(meal){
    let selectedCategory = menuContainer.dataset.mealCategory,
        categoryMeals = allMenu.filter(function(meal){
            return meal.type === selectedCategory;
        }),
        middleIndex = Math.ceil(categoryMeals.length / 2),
        leftMeals = categoryMeals.slice(0, middleIndex),
        rightMeals = categoryMeals.slice(middleIndex),
        meals = document.querySelector("#Menu .container .content .menuContent .meals");
    leftColumn.innerHTML = leftMeals.map(function(meal){
        return createMeal(meal);
    }).join("");
    rightColumn.innerHTML = rightMeals.map(function(meal){
        return createMeal(meal);
    }).join("");
}

function search(searchValue) {
    let filteredMeals = allMenu.filter(function (meal) {
        return meal.name.toLowerCase().includes(searchValue.toLowerCase());  
    });
    showMeals(filteredMeals);
}

let currentMealId,
    currentCategory;
function getMeal(mealId) {
    return allMenu.filter((meal) => meal.id == mealId)[0];
}

function showMeal(mealId) {
    let meal = getMeal(mealId),
        popupMenuContent = document.querySelector(
        `.popUp[data-name="meal"] .box .content`
        );
    currentMealId = meal.id; 
    currentCategory = allMenu.filter((item) => {
        return item.type === meal.type;
    });   
    popupMenuContent.innerHTML = `
        <h2 class="display-6 text-light mb-3" id="mealName">${meal.name}</h2>
        <div class="image-carousel position-relative">
            <div class="meal-image"><img class="img-fluid" src="./images/${meal.images[0]}" alt="Menu"></div>
            <div class="meal-price px-2 py-1 px-sm-3 py-sm-2 rounded-start"><h5 class="mb-0 fw-bolder">$${meal.price}</h5></div>
            <button class="prev center" onclick="showPreviousMeal();"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="next center" onclick="showNextMeal();"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="meal-desc">
            <p>${meal.description}</p>
        </div>
        `;
    openMenuPopup("meal");
}

function showPreviousMeal() {
    let currentIndex = currentCategory.findIndex((meal) => meal.id == currentMealId),
        previousIndex = (currentIndex - 1 + currentCategory.length) % currentCategory.length;
    showMeal(currentCategory[previousIndex].id);
}

function showNextMeal() {
    let currentIndex = currentCategory.findIndex((meal) => meal.id == currentMealId),
        nextIndex = (currentIndex + 1) % currentCategory.length;
    showMeal(currentCategory[nextIndex].id);
}

function checkInput (input) {
    let inputName = input.name,
        inputValue = input.value,
        isEmpty = inputValue === "",
        errorEle = document.querySelector(`p.alert-msg[data-error-name ="${inputName}"]`),
        isInvalid = !regexInputs[inputName].test(inputValue),
        errorMessage = "";
    
    if (isEmpty){
        errorMessage = "This field is required.";
    }else if (isInvalid){
        errorMessage = "Invalid field."
    }
    if(isEmpty || isInvalid){
        //false
        input.classList.add("is-invalid");
        errorEle.textContent = errorMessage;
        errorEle.classList.remove("d-none");
        input.classList.remove("is-valid");
        input.dataset.valid = false;

    }else{
        //true
        input.classList.remove("is-invalid");
        errorEle.classList.add("d-none");
        input.classList.add("is-valid");
        input.dataset.valid = true;
    }

}

//reset form 
function resetForm() {
    form.reset();
    inputs.forEach(function (input) {
        input.classList.remove("is-valid");
        input.classList.remove("is-invalid");
        document.querySelector(`p.alert-msg[data-error-name="${input.name}"]`).classList.add("d-none");
    });
    form.setAttribute('data-type', 'add');
    iconResetRemove(); 
}

function iconReset() {
    resetIcon.classList.remove('d-none');
}

function iconResetRemove() {
    resetIcon.classList.add('d-none');
}