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
