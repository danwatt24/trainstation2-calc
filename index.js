function calculateChanges(recipe, needed, supply, availableIngredients) {

}

function steelNeededChanged(steelNeeded, steelSupply, forSteel) {
  const recipe = {
    name: 'steel',
    produces: 40,
    ingredients: [{
        name: "ironOre",
        amount: 10,
      },
      {
        name: "coal",
        amount: 30,
      },
      {
        name: "time",
        amount: 5,
      }
    ]
  };

  const have = steelSupply.sum();
  const required = steelNeeded.value || 0;
  const needed = Math.ceil(Math.max(required - have, 0) / recipe.produces);

  const available = forSteel.reduce((obj, el) => {
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
  const steelNeeded = [];
  const steelSupply = [];
  const forSteel = [];
  const callback = () => steelNeededChanged(steelNeeded[0], steelSupply, forSteel);
  const selector = "input[name='steel'], input[for='steel']";
  for (const input of [...document.querySelectorAll(selector)]) {
    input.addEventListener("change", callback);
    input.addEventListener("keyup", callback);
    if (input.className === "needed")
      steelNeeded.push(input);
    else if (input.getAttribute('for'))
      forSteel.push(input);
    else
      steelSupply.push(input);
  }

};
