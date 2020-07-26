const createRecipe = (name, amount, time, ingredients) => {
  return {
    [name]: {
      amount,
      ingredients: {
        ...ingredients,
        time
      },
    },
  };
};

const recipes = {};

Object.assign(recipes.smeltingPlant = {},
  createRecipe("steel", 40, 5, {
    ironOre: 10,
    coal: 30,
  }),
  createRecipe("copper", 80, 30, {
    copperOre: 40,
    coal: 40,
  }),
);

Object.assign(recipes.ironMill = {},
  createRecipe("ironPowder", 30, 3, {
    ironOre: 30,
  }),
  createRecipe("nails", 40, 10, {
    steel: 40,
  }),
  createRecipe("sawBlades", 70, 20, {
    steel: 40,
    ironPower: 30,
  }),
  createRecipe("copperWire", 110, 25, {
    copper: 80,
    copperOre: 30,
  }),
  createRecipe("sheetSteel", 70, 30, {
    steel: 40,
    ironOre: 30,
  }),
);

Object.assign(recipes.sawMill = {},
  createRecipe("timber", 40, 15, {
    wood: 40
  }),
  createRecipe("barrel", 210, 30, {
    wood: 100,
    copperWire: 110,
  }),
  createRecipe("plywood", 160, 60, {
    glue: 100,
    wood: 60,
  }),
  createRecipe("pallet", 120, 15, {
    timber: 80,
    nails: 40
  }),
);

Object.assign(recipes.furnitureAndTextile = {},
  createRecipe("chair", 120, 30, {
    timber: 80,
    nails: 40,
  }),
  createRecipe("table", 150, 60, {
    timber: 80,
    sawBlade: 70,
  }),
  createRecipe("closet", 200, 30, {
    plywood: 160,
    nails: 40,
  }),
);

Object.assign(recipes.chemicalAndRefinery = {},
  createRecipe("gasoline", 50, 30, {
    crudeOil: 50,
  }),
  createRecipe("glue", 100, 20, {
    crudeOil: 50,
    wood: 50
  }),
);

Object.assign(recipes.foodProcessing = {},
  createRecipe("flour", 60, 20, {
    grain: 60,
  }),
  createRecipe("milk", 80, 30, {
    livestock: 80,
  }),
);

Object.assign(recipes.spaceshipFactory = {},
  createRecipe("rocketFuel", 60, 5, {
    liquidOxygen: 60,
  }),
  createRecipe("silicaFiber", 80, 5, {
    silicon: 120,
  }),
  createRecipe("heatShieldTile", 100, 15, {
    silicaFiber: 60,
    carbonFiber: 40
  }),
  createRecipe("spaceSuit", 120, 20, {
    silicaFiber: 40,
    carbonFiber: 40,
    rocketFuel: 40,
  }),
  createRecipe("rocketEngine", 140, 30, {
    silicaFiber: 60,
    rocketFuel: 40,
    steel: 40
  }),
  createRecipe("microchip", 120, 20, {
    silicon: 40,
    copper: 40,
    steel: 40
  }),
);
