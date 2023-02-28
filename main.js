import Swal from 'sweetalert2'


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

const scriptURL = "https://script.google.com/macros/s/AKfycby3bznOIrqTh5YyDWJ9RQtFJVjdCRo98aouaPpzM4_1inc3SKaL2hTEf5EvppzAfNZg/exec";
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(async response =>
      Swal.fire({
        title: 'Sucesso!',
        text: 'Inscrição realizada',
        icon: 'success',
        confirmButtonText: 'Ok'
      }, await response.json()))
    .catch(error => Swal.fire({
      title: 'Oops...',
      text: `${error.message}`,
      icon: 'success',
      confirmButtonText: 'Ok'
    }))
})

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
