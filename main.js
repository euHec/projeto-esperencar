const agreed = document.querySelector('#agreed');
const button = document.querySelector('#button');
const cep = document.querySelector('#cep');
const rua = document.querySelector('#street');
const cidade = document.querySelector('#city');
const estado = document.querySelector('#state');
const bairro = document.querySelector('#district');

export const getAddress = async (cep) => {
  const addres = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const result = await addres.json();
  return result;
};

export const searchCep = async (value) => {
  const {address, district, city, state} = await getAddress(value);
  try {
    if (!address) { throw new Error('CEP não encontrado'); }
    rua.value = address; 
    bairro.value = district; 
    cidade.value = city;
    estado.value = state;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

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
