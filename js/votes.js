"use strict";

let votesRealTime = [];
let candidateValidator = false;
let eventValidator = false;
let tablesValidator = false;
let enabledValidator = false;

let selectedCandidate = 0;
let selectedTable = 0;
let selectedEvent = 0;

const divErrorEvent = document.getElementById('divErrorEvent');
const divErrorCandidate = document.getElementById('divErrorCandidate');
const divErrorTables = document.getElementById('divErrorTables');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alerts');
const divMessage = document.getElementById('divMessage');

const btnNewRegister =document.getElementById('btn_create_register');
const btnEditRegisterAction =document.getElementById('btnEditRegister');

const myModal = new bootstrap.Modal('#myModal', { keyboard: false });
const modalRegister = document.getElementById('myModal');
const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

// Show table 
const titlesTable = [ 'Nombre', 'Mesa', 'total'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const eventInput = document.getElementById('event');
const tablesInput = document.getElementById('tables');
const candidateInput = document.getElementById('candidate');
const votesInput = document.getElementById('votes');
const enabledInput = document.getElementById('enabled');
    
const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( alertMessage, 'No se encontraron registros', true );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, table_name, votes } = data[i];
    const actions = [
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ name, table_name, votes ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  // paginado( Math.ceil( data.length / limit ) );
}

// Show all registers in the table
const showData = async () => {
  const registers = await consulta( api + `vote-tables?ubication=${ubicationId}`);
  localStorage.setItem("vote-tables",  JSON.stringify(registers.data.filter((e => e.enabled == true))) );
  localStorage.setItem("vote-tables-Search",  JSON.stringify(registers.data ));
  printList( registers.data );
}


const sendInfo = async (id = '', action = 'CREATE'|'EDIT') => {

  eventValidator = validateAllfields(eventInput, divErrorEvent, true);
  tablesValidator = validateAllfields(tablesInput, divErrorTables, true);
  candidateValidator = validateAllfields(candidateInput, divErrorCandidate, true);
  
  if (!eventValidator) return console.log(`Ingrese un evento ${eventValidator}`);
  if (!tablesValidator) return console.log('Ingrese una mesa');
  if (!candidateValidator) return console.log(`Ingrese un candidato ${candidateValidator}`);
  
  const data = {
    event_id: Number(selectedEvent),
    table_id: Number(selectedTable),
    candidate_id: Number(candidateInput.value),
    votes: Number(votesInput.value),
    enabled : true,
    user: userId
  }

  const findDuplicateData = votesRealTime.find(item => 
    item.event_id === data.event_id &&
    item.table_id === data.table_id &&
    item.candidate_id === data.candidate_id
    // item.votes === votesRealTime.votes
  );
  
  if (findDuplicateData) return showError('', divMessage, 'ESTAS INGRESANDO LA MISMA MESA Y CANDIDATO', false, true);
  
  const result = await createEditData( data, id );
  if (!result) return showMessegeAlert(alertMessage, 'Error al editar el registro', true);
  showMessegeAlert(alertMessage, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
  showError('', divMessage, `VOTOS DE LA MESA REGISTRADOS`, false, true);
  await showData();
  // bootstrap.Modal.getInstance(modalRegister).hide();
  // document.querySelector(".modal-backdrop").remove();
}

const createEditData = async ( data, uid = '') => {  
  const query = uid == '' ? 'vote-tables' : `vote-tables/${ uid }`
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

  // toggleMenu('edit_register', true);
  toggleMenu('save_register', false);
  
  const data = await consulta( api + 'vote-tables/' + uid );    
  const { event_id, table_id, candidate_id, votes, enabled } = data;

  idInput.value = uid;
  eventInput.value = event_id;
  tablesInput.value = table_id;
  candidateInput.value = candidate_id;
  votesInput.value = votes;
  enabledInput.value = enabled;

  myModal.show();
}
function clearForm() {
  idInput.value = '';
  eventInput.value =  selectedEvent || '';
  tablesInput.value = selectedTable || '';
  candidateInput.value = '';
  votesInput.value = 0;
}

btnNewRegister.addEventListener('click', () => {
  clearForm();
  // toggleMenu('edit_register', false);
  toggleMenu('save_register', true);
});

document.querySelector(`#save_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  //Comparar la mesa y el candidato con la lista guardada en el localhost
  votesRealTime = JSON.parse(localStorage.getItem('vote-tables'));
  selectedEvent =  eventInput.value;
  selectedTable = tablesInput.value;
  selectedCandidate = candidateInput.value;
  

  await sendInfo('', 'CREATE');
});

// btnEditRegister.addEventListener('click', async (e) => await sendInfo( idInput.value, 'EDIT' ));


// Al abrir la pagina
window.addEventListener("load", async () => {
  await onLoadSite();
  await showOptions('event', `${api}event?commune=${communeId}`);
  await showOptions('tables', `${api}tables?ubication=${ubicationId}`);
  await showOptions('candidate', `${api}candidates?commune=${communeId}`);
});