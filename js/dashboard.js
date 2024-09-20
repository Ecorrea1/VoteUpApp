"use strict";

let currentPage = 1;
let limitInfo = 10;

// Show Alert
const alertMessage = document.getElementById('alerts');

// Show table 
const titlesTable = [ 'EVENTO', 'CANDIDATO', 'CENTRO','MESA', 'TOTAL'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');


const printList = async ( data, page = currentPage, total = 1) => {
    
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( alertMessage, 'No se encontraron registros', true );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  let totalVotes = 0;
  for (const i in data ) {
    const { id, event_name, name, ubication_name, table_name, votes } = data[i];
    // const actions = [
    //   `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    // ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ event_name ,name, ubication_name, table_name, votes ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
    totalVotes += votes;
  }
  
//   document.getElementById('total-votes').innerText = totalVotes;
  console.log('Total de votos: ' + totalVotes);
  
  // Crear y mostrar paginación
  createPagination(total, page);

}

// Show all registers in the table
const showData = async (current = currentPage) => {
    currentPage = current;
  const registers = await consulta( api + `vote-tables?page=${current}&limit=${limitInfo}`);
  const { data, page, total } = registers;
  localStorage.setItem("vote-tables", JSON.stringify(data));
  printList( data, page, total );
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

// Al abrir la pagina
window.addEventListener("load", async () => {
  await onLoadSite();
//   await showOptions('event', `${api}event?commune=${communeId}`);
//   await showOptions('tables', `${api}tables?ubication=${ubicationId}`);
//   await showOptions('candidate', `${api}candidates?commune=${communeId}`);
});