"use strict";

let currentPage = 1;
let limitInfo = 10;
let votesRealTime = JSON.parse(localStorage.getItem('vote-tables')) || [];

const backgroundColor = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)'
];

const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

let typeSChart = 'bar' | 'line' | 'bubble' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'scatter';

// const chartJS =  document.querySelector('chart-bar-component[idChart="myChart"]');
// chartJS.labels = labels;

// Show Alert
const alertMessage = document.getElementById('alerts');

// Show table 
const titlesTable = [ 'EVENTO', 'CANDIDATO', 'CENTRO','MESA', 'TOTAL'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('myChart2').getContext('2d');
const ctx3 = document.getElementById('myChart3').getContext('2d');

const showChart = async (chart,data, labels, backgroundColor, borderColor, title = 'Cantidad de Votos', typeChart = 'bar') => {

  new Chart(chart, {
    type: typeChart,// line
    data: {
        labels,
        datasets: [{
            label: title ,
            data: data,
            backgroundColor,
            borderColor,
            hoverOffset: 4,
            borderWidth: 3
        }]
    },
    options: {
        animation: true,
        responsive: true,
        layout: {
          padding: 50
        },
        plugins: {
            legend: { position: 'top' },
            tooltip: { callbacks: { label: (tooltipItem) => `Votos: ${tooltipItem.raw}` } },
            subtitle: { display: false, text: 'Custom Chart Subtitle'},
            title: { display: true, text: title,  padding: { top: 10, bottom: 30} }
        },
        scale : { y: { beginAtZero: typeChart != 'pie' ? false : true } }
    }
});

}
const printList = async ( data, page = currentPage, total = 1) => {
    
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( alertMessage, 'No se encontraron registros', true );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, event_name, name, ubication_name, table_name, votes } = data[i];
    // const actions = [
    //   `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    // ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ event_name ,name, ubication_name, table_name, votes ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  
  createPagination(total, page);
}

// Show all registers in the table
const showData = async (current = currentPage) => {
    currentPage = current;
  const registers = await consulta( api + `vote-tables?page=${current}&limit=${limitInfo}`);
  const { data, page, total } = registers;
  localStorage.setItem("vote-tables", JSON.stringify(data));

  const tables = votesRealTime.map( ({ table_name }) => table_name );//Array de mesas
  const candidatesName = votesRealTime.map( ({ name }) => name );// Array de cnadidatos
  const centersName = votesRealTime.map( ({ ubication_name }) => ubication_name );// Array de cnadidatos
  
  const uniqueCandidates = candidatesName.filter((value, index, self) => self.indexOf(value) === index);
  
  const votes = votesRealTime.map( ({ votes }) => votes );// Array de votos
  const totalVotes = votes.reduce( ( a, b ) => a + b, 0);


  console.log(totalVotes);
  console.log(tables);
  console.log(centersName);
  console.log(uniqueCandidates);
  
  console.log(votesRealTime);
  
  showChart(ctx,[300, 500, 200, 100, 30,700], uniqueCandidates , backgroundColor, borderColor, 'Cantidad de Votos', 'bar' )
  showChart(ctx2,[300, 500, 200, 100, 30,700], uniqueCandidates, backgroundColor, borderColor, 'CANTIDAD TOTAL DE VOTOS', 'line' )
  showChart(ctx3,[300, 500, 200, 100, 30,700], uniqueCandidates, backgroundColor, borderColor, 'CANTIDAD TOTAL DE VOTOS', 'doughnut' )

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