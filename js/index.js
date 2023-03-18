// ===================Global Variables==================
const documentHtml = document;
let mainContainer = documentHtml.getElementById("mainContainer");
let mainRow = documentHtml.getElementById("mainRow");
let secondRow = documentHtml.getElementById("secondRow");
// ======================Loader=====================
$(document).ready(() => {
  $("#loading").slideUp(1000);
  $("body").css("overflow-y", "scroll");
});

// ======================Side Nav=====================
// console.log($(".sidenav .menu").outerWidth());
$(".sidenav .icons .openBtn .fa-bars").click(openNav);
$(".sidenav .icons .openBtn .fa-xmark").click(closeNav);
function openNav() {
  $(".sidenav").css({ left: `0`, transition: "all 1s" });
  $(".sidenav .menu ul li").slideDown(1200);
  $(".sidenav .icons .openBtn .fa-bars").addClass("d-none");
  $(".sidenav .icons .openBtn .fa-xmark").removeClass("d-none");
}
function closeNav() {
  $(".sidenav").css({ left: `-280.445px`, transition: "all 1s" });
  $(".sidenav .icons .openBtn .fa-bars").removeClass("d-none");
  $(".sidenav .icons .openBtn .fa-xmark").addClass("d-none");
}

// ======================Main Display function=====================
function displayMealMain(meal) {
  let box = "";
  for (let i = 0; i < meal.length; i++) {
    box += `<div class="col-md-3">
    <div onclick="getMealDetails('${meal[i].idMeal}')" class="mealBox position-relative overflow-hidden rounded-2">
      <img class="w-100" src="${meal[i].strMealThumb}" alt="logo" />
      <div class="layer">
        <h3>${meal[i].strMeal}</h3>
      </div>
    </div>
  </div>`;
  }
  mainRow.innerHTML = box;
  secondRow.innerHTML = "";
}

// ======================Search=====================
function search() {
  closeNav();
  mainRow.innerHTML = `
      <div class="col-md-6 ">
          <input onkeyup="nameSearch(this.value)" class="form-control mb-4 bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="letterSearch(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
    `;
  secondRow.innerHTML = "";
}

function displayMeal(meal) {
  let box = "";
  for (let i = 0; i < meal.length; i++) {
    box += `<div class="col-md-3">
    <div onclick="getMealDetails('${meal[i].idMeal}')" class="mealBox position-relative overflow-hidden rounded-2">
      <img class="w-100" src="${meal[i].strMealThumb}" alt="logo" />
      <div class="layer">
        <h3>${meal[i].strMeal}</h3>
      </div>
    </div>
  </div>`;
  }
  secondRow.innerHTML = box;
}

async function nameSearch(names) {
  $("#loading").fadeIn(300);
  // names == "" ? (names = "ch") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${names}`
  );
  data = await response.json();
  // console.log(data.meals);
  if (data.meals) {
    displayMeal(data.meals);
  } else {
    displayMeal([]);
  }
  $("#loading").fadeOut(300);
}
nameSearch("");

async function letterSearch(letter) {
  $("#loading").fadeIn(300);
  letter == "" ? (letter = "c") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  data = await response.json();
  if (data.meals) {
    displayMeal(data.meals);
  } else {
    displayMeal([]);
  }
  $("#loading").fadeOut(300);
}

// ======================Categories=====================
async function getCategories() {
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  data = await response.json();
  // console.log(data.categories);
  displayCategories(data.categories);
  $("#loading").fadeOut(300);
}
// getCategories();

function displayCategories(category) {
  let box = "";
  for (let i = 0; i < category.length; i++) {
    box += `<div class="col-md-3">
  <div onclick="displayCategoryMeals('${
    category[i].strCategory
  }') "class="mealBox position-relative overflow-hidden rounded-2">
    <img class="w-100" src="${category[i].strCategoryThumb}" alt="logo" />
    <div class="layer">
      <h3>${category[i].strCategory}</h3>
      <p class="fs-6">${category[i].strCategoryDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}</p>
    </div>
  </div>
</div>`;
  }
  mainRow.innerHTML = box;
  secondRow.innerHTML = "";
}

async function displayCategoryMeals(category) {
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  data = await response.json();
  // console.log(data.meals);
  if (data.meals) {
    displayMealMain(data.meals);
  } else {
    displayMealMain([]);
  }
  $("#loading").fadeOut(300);
}

// ======================Areas=====================
async function getareas() {
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  data = await response.json();
  // console.log("Api Data", data.meals);
  displayareas(data.meals);
  $("#loading").fadeOut(300);
}
// getareas();

function displayareas(area) {
  let box = "";
  for (let i = 0; i < area.length; i++) {
    // console.log("Elements in Api data array", area[i]);
    box += `<div class="col-md-3 mb-3">
  <div onclick="displayAreaMeals('${area[i].strArea}')" class="mealBox rounded-2">
  <div><i class="fa-solid fa-house fs-1 mb-2"></i></div>
  <h3>${area[i].strArea}</h3>
  </div>
</div>`;
    // console.log(box);
  }
  mainRow.innerHTML = box;
  secondRow.innerHTML = "";
}

async function displayAreaMeals(area) {
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  data = await response.json();
  // console.log(data.meals);
  if (data.meals) {
    displayMealMain(data.meals);
  } else {
    displayMealMain([]);
  }
  $("#loading").fadeOut(300);
}

// ======================Ingredients=====================
async function getIngredients() {
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  data = await response.json();
  console.log(data.meals);
  displayIngredients(data.meals);
  $("#loading").fadeOut(300);
}
// getIngredients();

function displayIngredients(ingredient) {
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `<div class="col-md-3">
  <div onclick="displayIngredientMeals('${
    ingredient[i].strIngredient
  }')" class="mealBox rounded-2">
  <div><i class="fa-solid fa-drumstick-bite"></i></div>
  <h3>${ingredient[i].strIngredient}</h3>
  <p>${
    ingredient[i].strDescription
      ? ingredient[i].strDescription.split(" ").slice(0, 20).join(" ")
      : "There is no description for this"
  }</p>
  </div>
</div>`;
  }
  mainRow.innerHTML = box;
  secondRow.innerHTML = "";
}

async function displayIngredientMeals(ingredient) {
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  data = await response.json();
  // console.log(data.meals);
  if (data.meals) {
    displayMealMain(data.meals);
  } else {
    displayMealMain([]);
  }
  $("#loading").fadeOut(300);
}

// ====================Meal Details===================
async function getMealDetails(id) {
  $("#loading").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  data = await response.json();
  console.log(data.meals);
  displayMealDetails(data.meals);
  $("#loading").fadeOut(300);
}
// getMealDetails("52773");

function displayMealDetails(meal) {
  let ingredients = "";
  for (let i = 0; i < 20; i++) {
    if (meal[0][`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info my-2 me-2 p-1">${
        meal[0][`strMeasure${i}`]
      } ${meal[0][`strIngredient${i}`]}</li>`;
    }
  }

  let tags = "";
  if (meal[0].strTags) {
    tags = meal[0].strTags.split(",");
  } else {
    tags = [];
  }
  // console.log(tags);
  let tag = "";
  for (let i = 0; i < tags.length; i++) {
    tag += `<li class="alert alert-danger my-2 me-2 p-2">${tags[i]}</li>`;
  }
  // console.log(tag);

  mainRow.innerHTML = `
  <div class="col-md-4">
  <div>
    <img class="w-100 rounded-4" src="${meal[0].strMealThumb}" alt="image" />
  </div>
  <h2 class="mt-2"><span class="fw-bolder"> ${meal[0].strMeal}<span/></h3>
  </div>
  <div class="col-md-8">
  <h2><span class="fw-bolder">Instructions<span/></h3>
  <p>${meal[0].strInstructions}</p>
  <h3><span class="fw-bolder">Area:</span> ${meal[0].strArea}</h3>
  <h3>
    <span class="fw-bolder">Category:</span> ${meal[0].strCategory}
  </h3>
  <h3><span class="fw-bolder">Recipes: <span/></h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
  ${ingredients}</ul>
  <h3><span class="fw-bolder">Tags: <span/></h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">
  ${tag}</ul>
  <a target="_blank" href="${meal[0].strSource}" class="btn btn-success me-2">Source</a>
  <a target="_blank" href="${meal[0].strYoutube}" class="btn btn-danger">Youtube</a>
</div>
  `;
  secondRow.innerHTML = "";
}

// ======================Contact=====================
function displayContact() {
  mainRow.innerHTML = `
  <div id="contact">
  <div
    class="d-flex justify-content-center align-items-center vh-100 w-100"
  >
    <div class="container w-75 mx-auto text-center">
      <div class="row gy-4 mb-4">
        <div class="col-md-6">
          <input
            class="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
          />
          <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
            Special characters and numbers not allowed
          </div>
        </div>
        <div class="col-md-6">
          <input
            class="form-control"
            type="mail"
            name="mail"
            id="mail"
            placeholder="Enter Your Mail"
          />
          <div id="mailAlert" class="alert alert-danger w-100 mt-2 d-none">
            Please enter a valid mail
          </div>
        </div>
        <div class="col-md-6">
          <input
            class="form-control"
            type="number"
            name="number"
            id="phone"
            placeholder="Enter Your Phone"
          />
          <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter a valid Phone Number
          </div>
        </div>
        <div class="col-md-6">
          <input
            class="form-control"
            type="number"
            name="age"
            id="age"
            placeholder="Enter Your Age"
          />
          <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter a valid age
          </div>
        </div>
        <div class="col-md-6">
          <input
            class="form-control"
            type="password"
            name="password"
            id="pass"
            placeholder="Enter Your Password"
          />
          <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid password *Minimum eight characters, at least one
            letter and one number:*
          </div>
        </div>
        <div class="col-md-6">
          <input
            class="form-control"
            type="password"
            name="repassword"
            id="repass"
            placeholder="Repassword"
          />
          <div
            id="repassAlert"
            class="alert alert-danger w-100 mt-2 d-none"
          >
            Enter a valid repassword
          </div>
        </div>
      </div>
      <button id="submit" class="btn btn-outline-danger" disabled>
        Submit
      </button>
    </div>
  </div>
</div>
  `;
  const pname = documentHtml.getElementById("name");
  const mail = documentHtml.getElementById("mail");
  const phone = documentHtml.getElementById("phone");
  const age = documentHtml.getElementById("age");
  const pass = documentHtml.getElementById("pass");
  const repass = documentHtml.getElementById("repass");
  const submit = documentHtml.getElementById("submit");

  // ======== Events ==========
  pname.addEventListener("keyup", nameValidation);
  mail.addEventListener("keyup", mailValidation);
  phone.addEventListener("keyup", phoneValidation);
  age.addEventListener("keyup", ageValidation);
  pass.addEventListener("keyup", passValidation);
  repass.addEventListener("keyup", repassValidation);

  let focus = false;
  pname.addEventListener("focus", () => {
    focus = true;
  });
  // ======== Validation =========
  function nameValidation() {
    const validName = /^[a-zA-Z ]+$/;
    if (!focus) {
      $("#nameAlert").addClass("d-none");
    } else {
      if (validName.test(pname.value)) {
        pname.classList.add("is-valid");
        $("#nameAlert").addClass("d-none").removeClass("d-block");
        return true;
      } else {
        $("#nameAlert").addClass("d-block").removeClass("d-none");
        return false;
      }
    }
  }

  function mailValidation() {
    const validMail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (validMail.test(mail.value)) {
      mail.classList.add("is-valid");
      $("#mailAlert").addClass("d-none").removeClass("d-block");
      return true;
    } else {
      $("#mailAlert").addClass("d-block").removeClass("d-none");
      return false;
    }
  }

  function phoneValidation() {
    const validPhone = /^01[0125][0-9]{8}$/;
    if (validPhone.test(phone.value)) {
      phone.classList.add("is-valid");
      $("#phoneAlert").addClass("d-none").removeClass("d-block");
      return true;
    } else {
      $("#phoneAlert").addClass("d-block").removeClass("d-none");
      return false;
    }
  }

  function ageValidation() {
    const validAge = /^([1-7][0-9]|80)$/;
    if (validAge.test(age.value)) {
      age.classList.add("is-valid");
      $("#ageAlert").addClass("d-none").removeClass("d-block");
      return true;
    } else {
      $("#ageAlert").addClass("d-block").removeClass("d-none");
      return false;
    }
  }

  function passValidation() {
    const validPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (validPass.test(pass.value)) {
      pass.classList.add("is-valid");
      $("#passAlert").addClass("d-none").removeClass("d-block");
      return true;
    } else {
      $("#passAlert").addClass("d-block").removeClass("d-none");
      return false;
    }
  }

  function repassValidation() {
    if (repass.value === pass.value) {
      repass.classList.add("is-valid");
      $("#repassAlert").addClass("d-none").removeClass("d-block");
      return true;
    } else {
      $("#repassAlert").addClass("d-block").removeClass("d-none");
      return false;
    }
  }

  function enableBtn() {
    if (
      nameValidation() &&
      mailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passValidation() &&
      repassValidation()
    ) {
      submit.removeAttribute("disabled");
      return true;
    } else {
      submit.setAttribute("disabled", true);
      return false;
    }
  }
}
