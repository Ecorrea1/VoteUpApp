"use strict";

let votesRealTime = JSON.parse(localStorage.getItem('vote-tables')) || [];
let candidateValidator = false;
let eventValidator = false;
let tablesValidator = false;
let enabledValidator = false;

let selectedCandidate = 0;
let selectedTable = 0;
let selectedEvent = 0;
let currentPage = 1;
let limitInfo = 10;

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
// const idInput = document.getElementById('uid');
// const eventInput = document.getElementById('event');
const tablesInput = document.getElementById('tables');
// const candidateInput = document.getElementById('candidate');
// const votesInput = document.getElementById('votes');
// const enabledInput = document.getElementById('enabled');
const divDinamicInputs = document.getElementById('formBodyDinamic');
    
const printList = async ( data, page = currentPage, total = 1 ) => {
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
  // Crear y mostrar paginación
  createPagination(total, page);
}

// Show all registers in the table
const showData = async (current = currentPage) => {
  currentPage = current;
  const registers = await consulta( api + `vote-tables?ubication=${ubicationId}&page=${current}&limit=${limitInfo}`, table);
  const { data, page, total } = registers;
  localStorage.setItem("vote-tables",  JSON.stringify(registers.data) );

  //Como obtener solo el campo votes y sumarlos para dar un total de este array con objetos [{votes:13},{votes:12}] a [12,13]de valorRealTime
  const votes = votesRealTime.map( ({ votes }) => votes );
  const totalVotes = votes.reduce( ( a, b ) => a + b, 0);
  console.log(totalVotes);
  
  
  printList( data, page, total );
}


const sendInfo = async (id = '', action = 'CREATE'|'EDIT') => {

  // eventValidator = validateAllfields(eventInput, divErrorEvent, true);
  // tablesValidator = validateAllfields(tablesInput, divErrorTables, true);
  // candidateValidator = validateAllfields(candidateInput, divErrorCandidate, true);
  
  // if (!eventValidator) return console.log(`Ingrese un evento ${eventValidator}`);
  // if (!tablesValidator) return console.log('Ingrese una mesa');
  // if (!candidateValidator) return console.log(`Ingrese un candidato ${candidateValidator}`);
  
  // const data = {
  //   event_id: Number(selectedEvent),
  //   table_id: Number(selectedTable),
  //   candidate_id: Number(candidateInput.value),
  //   votes: Number(votesInput.value),
  //   enabled : true,
  //   user: userId
  // }


  // formRegister.

  const findDuplicateData = votesRealTime.find(item => 
    item.event_id === data.event_id &&
    item.table_id === data.table_id &&
    item.candidate_id === data.candidate_id
    // item.votes === votesRealTime.votes
  );
  
  if (findDuplicateData) return showError('', divMessage, 'ESTAS INGRESANDO LA MISMA MESA Y CANDIDATO', false, true);
  
  // const result = await createEditData( data, id );
  // if (!result) return showMessegeAlert(alertMessage, 'Error al editar el registro', true);
  // showMessegeAlert(alertMessage, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
  // showError('', divMessage, `VOTOS DE LA MESA REGISTRADOS`, false, true);
  // await showData();
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
  // eventInput.value =  selectedEvent || '';
  tablesInput.value = '';
  // candidateInput.value = '';
  // votesInput.value = 0;
  divDinamicInputs.innerHTML = "";
}

btnNewRegister.addEventListener('click', () => {
  clearForm();
  // toggleMenu('edit_register', false);
  toggleMenu('save_register', true);
});

formRegister.addEventListener('submit', function(e){
  e.preventDefault();
  //Comparar la mesa y el candidato con la lista guardada en el localhost
  // votesRealTime = JSON.parse(localStorage.getItem('vote-tables'));
  // selectedEvent =  eventInput.value;
  // selectedTable = tablesInput.value;
  // selectedCandidate = candidateInput.value;

  // const formulario = formRegister;
  // const elementos = formulario.elements;
  // const valores = {};
  
  // for (let i = 0; i < elementos.length; i++) {
  //     const elemento = elementos[i];
  //     if (elemento.type === 'checkbox') {
  //         valores[elemento.name] = elemento.checked;
  //     } else {
  //         valores[elemento.name] = elemento.value;
  //     }
  // }
  
  // console.table(valores);

  const formData = new FormData(this);
  const response = Object.fromEntries(formData.entries());
  console.log(response);  

  // await sendInfo('', 'CREATE');
});

// btnEditRegister.addEventListener('click', async (e) => await sendInfo( idInput.value, 'EDIT' ));

// candidateInput.addEventListener('change', function() {
  
//   const compareCandidate = JSON.parse(localStorage.getItem('candidate'));
//   const candidateList = compareCandidate.filter((candidate) => candidate.id === Number(this.value));
 
//   // Cambiar otro selected con candidateList al momento de hacer click
//   eventInput.value = candidateList[0].event_id;

// } )






  

  tablesInput.addEventListener("change", async function(){
    selectedTable = this.value;
    divDinamicInputs.innerHTML = "";
    const localdata = JSON.parse(localStorage.getItem('candidates')) || [];
    const response = localdata.length ? localdata : await consulta(`${api}candidates?commune=${communeId}`);
    if(!localdata.length) localStorage.setItem("candidate",  JSON.stringify(response.data) );
    
    // divDinamicInputs.innerHTML = "Cargando .....";
    // const candidates = data.map((candidate) => {
    //   return {
    //       id: candidate.id,
    //       name: candidate.name,
    //       commune: candidate.commune,
    //       event_id: candidate.event_id
    //     }
    //   }
    // );

    response.forEach(loadingCandidates);  
  });

  function loadingCandidates({ id, name }){
    // const url = 'https://api.github.com/repos/erickperezp/elecciones

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
      const input_apellido = D.create('input', { type: 'number', name: `${id}`, autocomplete: 'off', placeholder: 'Ingrese votos' , required: 'required'});
  
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
  // await showOptions('event', `${api}event?commune=${communeId}`);
  // await showOptions('candidate', `${api}candidates?commune=${communeId}`);
  await showOptions('tables', `${api}tables?ubication=${ubicationId}`);
});