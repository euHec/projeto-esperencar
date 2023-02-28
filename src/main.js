import '/src/style.css';
import { searchCep } from '/src/cepFunctions.js';

const agreed = document.querySelector('#agreed');
const button = document.querySelector('#button');
const cep = document.querySelector('#cep');

window.addEventListener("load", function() {
  const form = document.getElementById('formId');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Success!");
    })
  });
});

agreed.addEventListener('change', () => {
  if (agreed.checked === true) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
})

cep.addEventListener('change', () => {
  console.log(cep.value);
  searchCep(cep.value)
});
