const inputFile = document.getElementById("input-excel");
const fileData = document.getElementById("excel-data");
const inputSendData = document.getElementById("send-data");

const selectAction = document.querySelector("#btn-selected-action"); // Selecciona el elemento con id="item"

let action = 'MESAS' | 'UBICACIONES' |  'EVENTOS' | 'USUARIOS';
// const rowsPerPage = 5;
// const pagination = document.getElementById('pagination');

inputFile.addEventListener("change", (e) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(e.target.files[0]);
  reader.onload = (e) => {
    const data = new Uint8Array(reader.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
    // Convertimos la hoja a formato JSON y luego imprimimos la lista
    printList(json);
    inputSendData.removeAttribute('disabled');
  };
});

function filterTable() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("myTable");
  const tr = table.getElementsByTagName("tr");

  // Filtramos las filas que no coinciden con la búsqueda
  Array.from(tr).forEach((row) => {
    const td = row.getElementsByTagName("td");
    const hasMatch = Array.from(td).some( ( cell ) => cell.textContent.toUpperCase().includes( filter ) );
    row.style.display = hasMatch ? "" : "none";
  });

  // Reiniciamos la paginación después del filtrado
  // setupPagination(table, pagination, rowsPerPage);
}

function printList(data) {
  const titles = data.shift();
  const thead = `<thead id="list_titles" class="table-dark"><tr>${titles.map((title) => `<th>${title}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${data.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>`;
  const table = `<table id="myTable" class='table table-striped table-xl table-bordered table-hover table-responsive-xxl' border="1">${thead}${tbody}</table>`;
  fileData.innerHTML = table;
  // Llamamos a setupPagination pasando el elemento de la tabla recién creado
  // setupPagination(document.getElementById('myTable'), pagination, rowsPerPage);
}

function filterTable() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("myTable");
  const tr = table.getElementsByTagName("tr");

  // Filtramos las filas que no coinciden con la búsqueda
  Array.from(tr).forEach((row) => {
    const td = row.getElementsByTagName("td");
    const hasMatch = Array.from(td).some((cell) =>
      cell.textContent.toUpperCase().includes(filter)
    );
    row.style.display = hasMatch ? "" : "none";
  });

  // Reiniciamos la paginación después del filtrado
  // setupPagination(table, pagination, rowsPerPage);
}

// document.getElementById('myInput').addEventListener('keyup', filterTable);

function setupPagination(table, pagination, rowsPerPage) {
  const rows = Array.from(table.getElementsByTagName("tr")).filter(
    (row) => row.style.display !== "none"
  );
  const pageCount = Math.ceil(rows.length / rowsPerPage);
  pagination.innerHTML = ""; // Limpiamos los enlaces de paginación existentes

  for (let i = 1; i <= pageCount; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.innerText = i;
    pageLink.addEventListener("click", function (e) {
      e.preventDefault();
      displayPage(i);
    });
    pagination.appendChild(pageLink);
  }

  displayPage(1); // Muestra la primera página al inicio
}

function displayPage(pageNumber) {
  const table = document.getElementById("myTable");
  const tr = Array.from(table.getElementsByTagName("tr")).filter((row) => row.style.display !== "none");
  const start = (pageNumber - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  tr.forEach((row, index) => (row.style.display = index >= start && index < end ? "" : "none"));

  const pageLinks = pagination.getElementsByTagName("a");
  Array.from(pageLinks).forEach((link) => link.classList.remove("active"));
  pageLinks[pageNumber - 1].classList.add("active");
}

// Función para convertir la tabla en un objeto JSON
const tableToJson = (table) => {
  const data = [];
  const headers = [];
  // Obtén los encabezados (th elements)
  Array.from(table.rows[0].cells).forEach((cell, i) => headers[i] = cell.textContent.toLowerCase().replace(/ /gi, ""));
  // Recorre las filas
  Array.from(table.rows)
    .slice(1)
    .forEach((row) => {
      const rowData = {};
      // Recorre las celdas
      Array.from(row.cells).forEach((cell, j) => rowData[headers[j]] = cell.textContent );
      data.push(rowData);
    });

  return data;
};


const printListV2 = async ( data ) => {

  const table = document.getElementById("table-data");
  const cells = document.getElementById('rows');
  cells.innerHTML = "";

  if ( data.length <= 0 || !data ) return cells.innerHTML = `<tr><td colspan="4" class="text-center"> No hay registros </td></tr>`;

  for (const i in data ) {
    const { id, result, message } = data[i];
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, result, message ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
}

selectAction.addEventListener('change', () =>{
  const [option] = selectAction.selectedOptions; // Obtiene el option seleccionado usando desestructuración
  action = option.value;
  // inputSendData.removeAttribute('disabled');
}); // Agrega un evento que se dispara cuando cambia el valor


const selectedAllInputs = () => ( inputFile.value === '' && year === '' &&  user === '' && action === '' ) ? false : true;

function allInputToDefault() {
  // Todos los selected por defecto en opcion 0
  selectAction.selectedIndex = 0;
  inputFile.value = '';
  year = '';
  user = '';
  action = '';
}


inputSendData.addEventListener("click", async (e) => {
  e.preventDefault();
  // const allSelectedInputs = selectedAllInputs();
  // if (!allSelectedInputs) return allInputToDefault()
  
  const table = document.getElementById("myTable");
  const data = tableToJson(table);
  table.innerHTML = "";
  console.log(data);
  // const result = await actionWithData( data, uid, 'tables' );
  // result.unshift({id:'ID', result: 'Resultado', message: 'Descripcion'}); // Sirve para agregar titulos al comienzo
  // return printListV2(result);
});
