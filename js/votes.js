"use strict";

let votesRealTime = JSON.parse(localStorage.getItem('vote-tables')) || [];
let totalVotes = 0;

let candidateValidator = false;
let eventValidator = false;
let tablesValidator = false;
let enabledValidator = false;

let selectedCandidate = 0;
let selectedTable = 0;
let selectedEvent = 1;
let currentPage = 1;
let limitInfo = 10;

const divErrorEvent = document.getElementById('divErrorEvent');
const divErrorCandidate = document.getElementById('divErrorCandidate');
const divErrorTables = document.getElementById('divErrorTables');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alerts');
const divMessage = document.getElementById('divMessage');
const totalVotesInput = document.getElementById('totalVotes');

const btnNewRegister =document.getElementById('btn_create_register');
const btnEditRegisterAction =document.getElementById('btnEditRegister');

const myModal = new bootstrap.Modal('#myModal', { keyboard: false });
const modalRegister = document.getElementById('myModal');
const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

// Show table 
const titlesTable = [ 'MESA', 'Nombre', 'total'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
// const idInput = document.getElementById('uid');
const eventInput = document.getElementById('event');
const tablesInput = document.getElementById('tablesSearch');
// const votesInput = document.getElementById('votes');
const divDinamicInputs = document.getElementById('formBodyDinamic');
    
const printList = async ( data, page = currentPage, total = 1 ) => {
  table.innerHTML = "";
    
  if( data.length === 0 || !data ) {
    showMessegeAlert( alertMessage, 'No se encontraron registros', true );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { table_name, name, votes } = data[i];
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ table_name, name, votes ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  createPagination(total, page); 
}

// Show all registers in the table
const showData = async (current = currentPage) => {
  currentPage = current;
  const registers = await consulta( api + `vote-tables?ubication=${ubicationId}&order=c.number_candidate&asc=ASC&page=${current}&limit=${limitInfo}`, table);
  const { data, page, total } = registers;
  // localStorage.setItem("vote-tables",  JSON.stringify(registers.data) );
  //Como obtener solo el campo votes y sumarlos para dar un total de este array con objetos [{votes:13},{votes:12}] a [12,13]de valorRealTime
  const votes = data.map( ({ votes }) => votes );
  totalVotes = votes.reduce( ( a, b ) => a + b, 0);
  totalVotesInput.innerHTML = `TOTAL DE VOTOS : ${totalVotes}`;


  await searchTablesEnabled();

  printList( data, page, total );
}

const searchTablesEnabled = async () => {
  const tables = await consulta( api + `tables?ubication_id=${ubicationId}&enabled=1`); 
  const { ok, msg, data } =  tables;
  localStorage.setItem("tablesSearch",  JSON.stringify(data));

  await showOptions('tablesSearch', `${api}tables?ubication_id=${ubicationId}&enabled=1`);
}

const sendInfo = async (id = '', data, action = 'CREATE'|'EDIT') => {

  // eventValidator = validateAllfields(eventInput, divErrorEvent, true);
  // tablesValidator = validateAllfields(tablesInput, divErrorTables, true);
  // candidateValidator = validateAllfields(candidateInput, divErrorCandidate, true);
  
  // if (!eventValidator) return console.log(`Ingrese un evento ${eventValidator}`);
  // if (!tablesValidator) return console.log('Ingrese una mesa');
  // if (!candidateValidator) return console.log(`Ingrese un candidato ${candidateValidator}`);

  // const findDuplicateData = votesRealTime.find(item => 
  //   item.event_id === data.event_id &&
  //   item.table_id === data.table_id &&
  //   item.candidate_id === data.candidate_id
  //   // item.votes === votesRealTime.votes
  // );
  
  // if (findDuplicateData) return showError('', divMessage, 'ESTAS INGRESANDO LA MISMA MESA Y CANDIDATO', false, true);
  
  const result = await createEditData( data, id );
  if (!result) return showMessegeAlert(alertMessage, 'Error al editar el registro', true);
  showMessegeAlert(alertMessage, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
  showError('', divMessage, `VOTOS DE LA MESA REGISTRADOS`, false, true);

  await showData();
  clearForm();

  bootstrap.Modal.getInstance(modalRegister).hide();
  document.querySelector(".modal-backdrop").remove();
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
  

  // toggleMenu('edit_register', true);
  toggleMenu('save_register', false);
  
  const data = await consulta( api + 'vote-tables/' + uid );    
  const { event_id, table_id, candidate_id, votes, enabled } = data;

  // idInput.value = uid;
  // eventInput.value = event_id;
  // tablesInput.value = table_id;
  // candidateInput.value = candidate_id;
  // votesInput.value = votes;
  // enabledInput.value = enabled;

  myModal.show();
}
function clearForm() {
  // idInput.value = '';
  // eventInput.value =  ``;
  tablesInput.value = '';
  // candidateInput.value = '';
  // votesInput.value = 0;
  divDinamicInputs.innerHTML = "";
}

btnNewRegister.addEventListener('click', () => {
  clearForm();
  toggleMenu('save_register', true);
});

formRegister.addEventListener('submit', async function(e){
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  const result = Object.keys(data)
  .filter(key => key !== 'tablesSearch')
  .map(key => ({
    event_id: Number(selectedEvent),
    table_id: Number(data.tablesSearch),
    candidate_id: Number(key),
    votes: Number(data[key]),
    enabled: true,
    user: userId
  }));

  await sendInfo('', result,'CREATE');

});

// eventInput.addEventListener("change", function() {
//   selectedEvent = Number(this.value)
//   tablesInput.value = "";
//   divDinamicInputs.innerHTML = "";
//   totalVotesInput.innerHTML = "";
// }
// );

tablesInput.addEventListener("change", async function(){
  selectedTable = this.value;
  divDinamicInputs.innerHTML = "Cargando ....";  
  setTimeout(async() => { 

    let response = JSON.parse(localStorage.getItem('candidates')) || [];
    if(response.length === 0 || response=== undefined){
      const result = await consulta(`${api}candidates?commune=${communeId}`);
      // const result = await consulta(`${api}candidates?commune=${communeId}&event=${selectedEvent}`);
      localStorage.setItem("candidates",  JSON.stringify(result.data) );
    }

    response = JSON.parse(localStorage.getItem('candidates'));
    const data = response.filter(e => e.event_id === selectedEvent)
    divDinamicInputs.innerHTML = data.length !== 0 ? "" : "NO HAY DATOS"; 
    data.length !== 0 ? data.forEach(loadingCandidates) : console.log('no hay datos');
  }, timer) 
});
function loadingCandidates({ id, name }) {
    //crear el div que contiene los 2 sub-divs
    const div_principal = D.create('div');
    //crear el div para el span e input del nombre
    const div_nombre = D.create('div');

    //crear el div para el span e input del apellido
    const div_apellido = D.create('div');

    //crear los span de nombre y apellido
    const span_nombre = D.create('span', { innerHTML: 'Candidato' } );
    const span_apellido = D.create('span', { innerHTML: 'Votos' });

    //crear los inputs de nombre y apellido
    const input_nombre = D.create('input', { type: 'text', name: `${id} - CANDIDATO: ${name}`, autocomplete: 'off', value: `${name}`, disabled: 'disabled', required: 'required'} );
    const input_apellido = D.create('input', { type: 'number', class: 'votesInputs', name: `${id}`, autocomplete: 'off', placeholder: 'Ingrese votos' , required: 'required'});

    //crear un botoncito de eliminar este div 
    // const borrar = D.create('a', { href: 'javascript:void(0)', innerHTML: 'x', onclick: function( ){ D.remove(div_principal); } } );

    //agregar cada etiqueta a su nodo padre
    D.append(span_nombre, div_nombre);
    D.append(input_nombre, div_nombre);
    D.append([span_apellido, input_apellido], div_apellido);
    D.append([div_nombre, div_apellido], div_principal);
    //agregar el div del primer comentario al contenedor con id #container
    D.append(div_principal, D.id('formBodyDinamic') );
}

// Al abrir la pagina
window.addEventListener("load", async () => {  
  await onLoadSite();
});