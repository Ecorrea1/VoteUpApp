const mesasTotales = JSON.parse(localStorage.getItem('tables'));  // get data from local storage
const mesasIngresadas = mesasTotales.filter(e => e.enabled == 0);  // get data from local storage
// const mesasFaltantes = JSON.parse(localStorage.getItem());  // get data from local storage
console.log(mesasTotales);
const votes = mesasTotales.map( ({ total }) => total );
const totalVotes = votes.reduce( ( a, b ) => a + b, 0);




const showData = async () => {
    const response = await consulta( api + `tables`);
    const { ok, msg, data } =  response;
    const filteredData = data.filter( item => item.enabled === true && item.ubication_id == ubicationId)  
    localStorage.setItem("tables",  JSON.stringify( data ) );
    localStorage.setItem("tablesSearch",  JSON.stringify(filteredData));

}

window.addEventListener("load", async () => {
    isSession();
    await showData();
    // const fader = document.getElementById('fader');
    // fader.classList.add("close");
    // fader.style.display = 'none';
});

