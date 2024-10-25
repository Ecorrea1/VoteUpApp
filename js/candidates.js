"use strict";
let nameValidator = false;
let descriptionValidator = false;
let enabledValidator = false;
let tablesValidator = false;

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorTables = document.getElementById('divErrorTables');
const divErrorCommune = document.getElementById('divErrorCommune');
const divErrorEvent = document.getElementById('divErrorEvent');
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
const titlesTable = [ 'N. Candidato','Nombre', 'Pacto', 'Habilitado', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const namePactoInput = document.getElementById('name-pacto');
const numberCandidateInput = document.getElementById('number-candidate');
const communeInput = document.getElementById('commune');
const eventInput = document.getElementById('event');
const enabledInput = document.getElementById('enabled');

const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( alertMessage, 'No se encontraron registros', true );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }
  
  for (const i in data ) {
    console.log(data[i]);
    const { id, name, namePacto, numberCandidate, enabled } = data[i];
    const actions = [
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ numberCandidate, name, namePacto || '-',  showBadgeBoolean(enabled), showbtnCircle(actions)  ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }

}

// Show all registers in the table
const showData = async () => {
  const registers = await consulta( api + `candidates?commune=${communeId}`);
//   localStorage.setItem("candidates",  JSON.stringify(registers.data.filter((e => e.enabled === true))) );
  localStorage.setItem("candidates",  JSON.stringify(registers.data ));
  printList( registers.data );
}


const sendInfo = async (idCristal = '', action = 'CREATE'|'EDIT') => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  if (!nameValidator) return console.log('Ingrese Nombre');
  
  const data = {
    name: nameInput.value.toUpperCase(),
    pacto: namePactoInput.value == '' ? false : true,
    namePacto: namePactoInput.value || '',
    numberCandidate: numberCandidateInput.value,
    commune_id: Number(communeInput.value),
    event_id: Number(eventInput.value),
    enabled :enabled.value,
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
  const query = uid == '' ? 'candidates' : `candidates/${ uid }`
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
  
  const response = await consulta( api + 'candidates/' + uid ); 
  const { ok, msg, data } = response; 
  if (!ok) return showMessegeAlert(alertMessage, `Error al obtener el registro : ${msg}`, true);   
  const { name, namePacto, numberCandidate, event_id, commune_id, enabled } = data;

  idInput.value = uid;
  nameInput.value =  name;
  namePactoInput.value = namePacto || '';
  numberCandidateInput.value = numberCandidate;
  communeInput.value = commune_id;
  eventInput.value = event_id;
  enabledInput.value = enabled;

  myModal.show();
}
function clearForm() {
  idInput.value = '';
  nameInput.value = '';
  namePactoInput.value = '';
  numberCandidateInput.value = '';
  communeInput.value = communeId;
  eventInput.value = '';
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
  await showOptions('event', api + `event?commune=${communeId}`);
});