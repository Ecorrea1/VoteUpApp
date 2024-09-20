"use strict";
let nameValidator = false;
let descriptionValidator = false;
let enabledValidator = false;

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alert-msg');
const divMessage = document.getElementById('divMessage');

const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const addressInput = document.getElementById('address');
const emailInput = document.getElementById('email');
const codeInput = document.getElementById('code');
const phoneInput = document.getElementById('phone');
const nationalityInput = document.getElementById('nationality');
const communeInput = document.getElementById('commune');
const ubicationInput = document.getElementById('ubication');
// const roleInput = document.getElementById('rol');
    

// Show all registers in the table
const showData = async () => {
  const response = await consulta( api + `user/${ userId }`);
  const { ok, msg, data } = response; 
    if (!ok) return showMessegeAlert(alertMessage, `Error al obtener el registro : ${msg}`, true);
  updateStore('user', data, true);
  const { id, name, email, address, commune_id, ubication_id, code, phone } = data;

  idInput.value = id;
  nameInput.value =  name;
  addressInput.value = address;
  emailInput.value =  email;
  codeInput.value = code;
  phoneInput.value = phone;
  communeInput.value = commune_id;
  ubicationInput.value = ubication_id;

}

const sendInfo = async (uid = 0) => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  if (!nameValidator) return console.log('Ingrese Nombre');
  
  const data = {
    name: nameInput.value.toUpperCase(),
    email: emailInput.value,
    address: addressInput.value.toUpperCase(),
    code: codeInput.value,
    phone: Number(phoneInput.value),
    // role: Number(roleInput.value),
    // country_id: Number(nationalityInput.value),
    commune_id: Number(communeInput.value),
    ubication_id: Number(ubicationInput.value),
    user: userId
  }
  
  const result = await actionWithData( data, uid, 'user' );
  if (!result) return showMessegeAlert( alertMessage, 'Error al editar el registro', true);
  
  localStorage.setItem("email", emailInput.value);
  localStorage.setItem("name", nameInput.value.toUpperCase());
  localStorage.setItem("commune-id", Number(communeInput.value));
  localStorage.setItem("ubication-id", Number(ubicationInput.value));
  
  showMessegeAlert( alertMessage, 'Perfil Actualizado');

  return await showData();
}

function clearForm() {
  formRegister.reset();
}

btnEditRegister.addEventListener('click', async (e) => await sendInfo(idInput.value));
const showOptionsCode = async ( select, endpoint = 'country') => {
  const selectElement = document.getElementById( select );
  selectElement.value = "";
  let options = JSON.parse(localStorage.getItem( select )) || [];
  
  if (!options.length) {
    const response = await consulta( api + endpoint );  
    const { ok, msg, data } = response; 
    if (!ok) return showMessegeAlert(alertMessage, `Error al obtener el registro : ${msg}`, true);
    options = data;
    localStorage.setItem( select, JSON.stringify( options ));
  }
  // Iteramos sobre el array de opciones
  options.filter(c => c.code !== '').forEach(option => {
    
    const { id, code } = option;
    const optionElement = `<option value="${ code }" code=${id} >${ code }</option>`;
    selectElement.innerHTML += optionElement;
  });
};

window.addEventListener("load", async () => {
  // await showOptions('rol', api + `role`);
  // await showOptions('nationality', api + `country`);
  await showOptions('commune', api + `commune?country=${country}`);
  await showOptions('ubication', api + `ubication?commune=${communeId}`);
  await showOptionsCode('code');
  await showData()
});