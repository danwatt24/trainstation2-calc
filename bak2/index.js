function neededChanged(recipe, required, supply, forRecipe) {
  required = required.value || 0;
  const have = supply.sum();
  const needed = Math.ceil(Math.max(required - have, 0) / recipe.produces);

  const available = forRecipe.reduce((obj, el) => {
    obj[el.name] = el.value || 0;
    return obj;
  }, {});


  for (const ingredient of recipe.ingredients) {
    const selector = `span[name='${ingredient.name}'][for='${recipe.name}']`;
    const node = document.querySelector(selector);
    const amountAvailable = available[ingredient.name] || 0;
    node.innerHTML = Math.max(needed * ingredient.amount - amountAvailable, 0);
  }
}

window.onload = () => {
  for (const recipe of recipes) {

    const needed = [];
    const supply = [];
    const forRecipe = [];
    const callback = () => neededChanged(recipe, needed[0], supply, forRecipe);
    const selector = `input[name='${recipe.name}'], input[for='${recipe.name}']`;
    for (const input of [...document.querySelectorAll(selector)]) {
      input.addEventListener("change", callback);
      input.addEventListener("keyup", callback);
      if (input.className === "needed")
        needed.push(input);
      else if (input.getAttribute('for'))
        forRecipe.push(input);
      else
        supply.push(input);
    }
  }
};
