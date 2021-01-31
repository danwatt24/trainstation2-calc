const ironOreNeeded = {};
const coalNeeded = {};
const steelNeeded = {};

function initIronPowder() {
  const recipeName = "ironPowder";
  const ingredients = [
    {
      amounts: ironOreNeeded,
      update: updateIronOre,
      required: 30
    }
  ];
  // result
  const include = document.getElementById(`${recipeName}Include`);
  const wanted = document.getElementById(`${recipeName}Wanted`);

  // events
  include.addEventListener("change", e => {
    const checked = !!e.target.checked;
    wanted.disabled = !checked;
    
    if(checked) {
      ironOreNeeded[recipeName] = 0;
    } else {
      delete ironOreNeeded[recipeName];
    }
    updateIronOre();
  });

  wanted.addEventListener("input", e => {
    const val = parseFloat(e.target.value) || 0;
    const amount = Math.ceil(val / 30);
    ironOreNeeded[recipeName] = 30 * amount;
    updateIronOre();
  });
}

function initSteel() {
  const ingredients = [
    {
      amounts: ironOreNeeded,
      update: updateIronOre,
      required: 10,
    },
    {
      amounts: coalNeeded,
      update: updateCoal,
      required: 30,
    }
  ];

  // result
  const steelInclude = document.getElementById("steelInclude");
  const steelWanted = document.getElementById("steelWanted");

  // events
  steelInclude.addEventListener("change", e => {
    const checked = !!e.target.checked;
    steelWanted.disabled = !checked;
    if(checked) {
      ironOreNeeded["steel"] = 0;
      coalNeeded["steel"] = 0;
    } else {
      delete ironOreNeeded["steel"];
      delete coalNeeded["steel"];
    }
    updateIronOre();
    updateCoal();
  });

  steelWanted.addEventListener("input", e => {
    const val = parseFloat(e.target.value) || 0;
    const amount = Math.ceil(val / 40);
    ironOreNeeded["steel"] = amount * 10;
    coalNeeded["steel"] = amount * 30;
    updateIronOre();
    updateCoal();
  });
}

function initNails() {
  // result
  const nailsInclude = document.getElementById("nailsInclude");
  const nailsWanted = document.getElementById("nailsWanted");

  // events
  nailsInclude.addEventListener("change", e => {
    const checked = !!e.target.checked;
    nailsWanted.disabled = !checked;
    if(checked) {
      steelNeeded["nails"] = 0;
    } else {
      delete steelNeeded["nails"];
    }
    updateSteel();
  });

  nailsWanted.addEventListener("input", e => {
    const val = parseFloat(e.target.value) || 0;
    const amount = Math.ceil(val / 40);
    steelNeeded["nails"] = amount * 40;
    updateSteel();
  });
}

function updateIronOre() {
  updateResouce("ironOre", ironOreNeeded);
}

function updateCoal() {
  updateResouce("coal", coalNeeded);
}

function updateSteel() {
  updateResouce("steel", steelNeeded);
}

function updateResouce(resource, amounts) {
  const label = document.getElementById(`${resource}Label`);
  label.style.display = Object.keys(amounts).length ? "block" : "none";

  let amount = 0;
  for(const key in amounts) {
    amount += amounts[key];
  }

  const needed = document.getElementById(`${resource}Needed`);
  needed.innerText = amount;
}

window.onload = () => {
  initIronPowder();
  initSteel();
  initNails();
};