document.createElementWithOptions = function (element, options = {}) {
  return Object.assign(document.createElement(element), options);
};

function objectMapper(obj, act = () => {}) {
  Object.entries(obj).map(([k, v]) => act(k, v));
}

function objectIterator(obj, act = () => {}) {
  console.log(Object.map(obj));
}

function camelCaseToWords(name) {
  const result = name.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function minutesToSeconds(minutes) {
  return minutes * 60;
}

Array.prototype.sum = function (attribute = "value", initialValue = 0) {
  return this.reduce((amount, el) => {
    if (!el) return amount;
    return amount + parseFloat(el[attribute] || el.getAttribute(attribute) || 0);
  }, initialValue);
};
