document.createElementWithOptions = function (element, options = {}) {
  return Object.assign(document.createElement(element), options);
};

function objectMapper(obj, act = () => {}) {
  Object.entries(obj).map(([k, v]) => act(k, v));
}

function camelCaseToWords(name) {
  const result = name.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function displayRecipe(recipeName, recipe) {
  const container = document.getElementById("recipe");
  container.querySelector("#recipeName").innerHTML = camelCaseToWords(recipeName);

  const ingredientsContainer = container.querySelector("#ingredients");
  ingredientsContainer.innerHTML = "";
  objectMapper(recipe.ingredients, (ingredientName, amount) => {

    const ingredientDisplay = document.createElementWithOptions("div", {
      id: `${recipeName}_${ingredientName}`,
      innerHTML: amount,
    });

    const ingredientContainer = document.createElementWithOptions("div", {
      innerText: `${camelCaseToWords(ingredientName)}`,
      style: "margin-right:40px;",
    })
    ingredientContainer.appendChild(ingredientDisplay);
    ingredientsContainer.appendChild(ingredientContainer);
  });
}

function getParsedValue(id, options = {}) {
  options = {
    defaultValue: 0,
    updateElement: true,
    ...options,
  };

  const {
    defaultValue,
    updateElement,
  } = options;
  const el = document.getElementById(id);
  const value = parseInt(el.value) || defaultValue;
  if (updateElement) el.value = value;
  return value;
}

function changeEvent(ev) {
  const desired = getParsedValue("amountNeeded");
  if (!desired) return;

  const available = getParsedValue("inventory");
  const recipe = selectedRecipe;
  const recipeName = selectedRecipeName;

  const ingredients = recipe.ingredients;

  const required = Math.max(desired - available, 0);
  const needed = Math.ceil(required / recipe.amount);

  const results = {};
  objectMapper(ingredients, (name, amount) => {
    results[name] = amount * needed;
  });
  const container = document.getElementById("ingredients");
  objectMapper(results, (ingredientName, amount) => {
    container.querySelector(`[id='${recipeName}_${ingredientName}']`).innerHTML = amount;
  });
}

let selectedRecipe;
let selectedRecipeName;

function categorySelectedEvent(e) {

  const target = e.target;
  selectedRecipeName = target.options[target.selectedIndex].value;
  selectedRecipe = selectedCategory[selectedRecipeName];
  displayRecipe(selectedRecipeName, selectedRecipe);
}

let selectedCategory;

function categoriesSelectedEvent(e) {
  const target = e.target
  const categoryName = target.options[target.selectedIndex].value;
  selectedCategory = recipes[categoryName];

  const categorySelect = document.getElementById("category");
  addOptionsToSelect(categorySelect, Object.keys(selectedCategory));
}

function addEventListeners(id, func) {
  const el = document.getElementById(id);
  ["keyup", "change"].forEach(ev => el.addEventListener(ev, func));
  return el;
}

function addOptionsToSelect(select, options, clear = true) {
  if (clear) {
    for (let i = select.options.length - 1; i >= 0; i--)
      select.remove(i);
  }

  options.forEach(opt => {
    const option = document.createElementWithOptions("option", {
      value: opt,
      innerHTML: camelCaseToWords(opt)
    });
    select.options.add(option);
  });
}

function calcSelectSize() {
  const categoryCount = Object.keys(recipes).length;
  let recipeCount = 0;
  Object.values(recipes).forEach(val => {
    const count = Object.keys(val).length;
    if (count > recipeCount)
      recipeCount = count;
  });

  return Math.max(categoryCount, recipeCount);
}

window.onload = () => {
  addEventListeners("amountNeeded", changeEvent);
  addEventListeners("inventory", changeEvent);
  const categories = addEventListeners("categories", categoriesSelectedEvent);
  addOptionsToSelect(categories, Object.keys(recipes));
  const category = addEventListeners("category", categorySelectedEvent);

  categories.size = category.size = calcSelectSize();

  categories.selectedIndex = 0;
  categories.dispatchEvent(new Event("change"));

  category.selectedIndex = 0;
  category.dispatchEvent(new Event("change"));
};
