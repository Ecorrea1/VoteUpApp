"use strict";
let nameValidator = false;
let descriptionValidator = false;
let enabledValidator = false;
let tablesValidator = false;

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorTables = document.getElementById('divErrorTables');
const divErrorCommune = document.getElementById('divErrorCommune');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alerts');

const btnNewRegister =document.getElementById('btn_create_register');
const btnEditRegisterAction =document.getElementById('btnEditRegister');

const myModal = new bootstrap.Modal('#myModal', { keyboard: false });
const modalRegister = document.getElementById('myModal');
const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

// Show table 
const titlesTable = [ 'Nombre', 'Descripcion', 'Candidatos', 'Habilitado', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const optionsInput = document.getElementById('options');
const communeInput = document.getElementById('commune');
const enabledInput = document.getElementById('enabled');
    
const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( alertMessage, 'No se encontraron registros', true );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, description, options, enabled } = data[i];
    const actions = [
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ name, description, options,  showBadgeBoolean(enabled), showbtnCircle(actions)  ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  // paginado( Math.ceil( data.length / limit ) );
}

// Show all registers in the table
const showData = async () => {
  const registers = await consulta( api + `event?commune=${communeId}`);
  localStorage.setItem("event",  JSON.stringify(registers.data.filter((e => e.enabled === true))) );
  localStorage.setItem("eventSearch",  JSON.stringify(registers.data ));
  printList( registers.data );
}


const sendInfo = async (idCristal = '', action = 'CREATE'|'EDIT') => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  if (!nameValidator) return console.log('Ingrese Nombre');
  
  const data = {
    name: nameInput.value.toUpperCase(),
    description: descriptionInput.value,
    enabled :enabled.value,
    options: optionsInput.value,
    commune_id: Number(communeInput.value),
    user: userId
  }

  const result = await createEditData( data, idCristal );
  if (!result) return showMessegeAlert(alertMessage, 'Error al editar el registro', true);
  await showData();
  bootstrap.Modal.getInstance(modalRegister).hide();
  document.querySelector(".modal-backdrop").remove();
  showMessegeAlert(alertMessage, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
}

const createEditData = async ( data, uid = '') => {  
  const query = uid == '' ? 'event' : `event/${ uid }`
  return await fetch( api + query , {
    method: uid ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => response.ok)
  .catch(err => {
    console.error(err)
    return false;
  });
}

async function showModalCreateOrEdit( uid ) {
  formRegister.reset();

  toggleMenu('edit_register', true);
  toggleMenu('save_register', false);
  
  const data = await consulta( api + 'event/' + uid );    
  const { name, description, options, commune_id, enabled } = data;

  idInput.value = uid;
  nameInput.value =  name;
  descriptionInput.value = description ?? '';
  optionsInput.value = options;
  communeInput.value = commune_id;
  enabledInput.value = enabled;

  myModal.show();
}
function clearForm() {
  idInput.value = '';
  nameInput.value = '';
  descriptionInput.value = '';
  optionsInput.value = '';
  communeInput.value = communeId;
  enabledInput.value = true;
}

btnNewRegister.addEventListener('click', () => {
  clearForm();
  toggleMenu('edit_register', false);
  toggleMenu('save_register', true);
});

document.querySelector(`#save_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  await sendInfo('', 'CREATE');
});

btnEditRegister.addEventListener('click', async (e) => await sendInfo( idInput.value, 'EDIT' ));

// Al abrir la pagina
window.addEventListener("load", async () => {
  await onLoadSite();
  await showOptions('commune', api + `commune?country=${country}`);
});