export const customeValidationMessage = () => {
  let elements = ["TEXTAREA", "INPUT"];
  let obj = {};

  for (let i = 0; i < elements.length; i++) {
    obj = document.getElementsByTagName(elements[i]);
    for (let i = 0; i < obj.length; i++) {
      obj[i].oninvalid = function(e) {
        e.target.setCustomValidity("");
        if (!e.target.validity.valid) {
          e.target.setCustomValidity(`${e.target.title}`);
        }
      };
      obj[i].oninput = function(e) {
        e.target.setCustomValidity("");
      };
    }
  }
};
