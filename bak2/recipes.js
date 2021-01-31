const smeltingPlant = [steel, copper];
const ironMill = [nails];

const recipes = [
  ...smeltingPlant,
  ...ironMill,
];

for (const recipe of recipes) {
  recipe.displayName = camelCaseToWords(recipe.name);
}
