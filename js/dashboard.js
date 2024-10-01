const RELOAD_DASHBOARD = JSON.parse(localStorage.getItem('reload')) | false;

const showData = async () => {
 
  const result = await consulta( api + `dashboard`);
  const { ok, msg, data } =  result;
  
  if (!ok) return console.log('Error:', msg);

  localStorage.setItem("dashboard",  JSON.stringify( data[0] ) );   
  const DASHBOARD = JSON.parse(localStorage.getItem('dashboard'));
  const DATA_CANDIDATES = Object.entries(data[1]).map(([key, value]) => `${key} - ${value}`);
  const votacionesTotales = Object.values(data[1]);
  const {total_mesas, total_mesas_listas, total_votos} = DASHBOARD
  renderApex({total_mesas, total_mesas_listas, total_votos, candidatos: DATA_CANDIDATES, votacionesTotales});
}

const randomizeArray = (arg) => {
    const array = arg.slice();
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

function renderApex(data = {}){

    Apex.grid = { padding: { right: 0, left: 0 }}
    Apex.dataLabels = { enabled: false }
    // data for the sparklines that appear below header area
    const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
    // the default colorPalette for this dashboard
    // var colorPalette = ['#01BFD6', '#5564BE', '#F7A600', '#EDCD24', '#F74F58'];
    const colorPalette = ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0', '#FF5733', '#C70039', '#900C3F', '#581845', '#DAF7A6'];
    
    const spark1 = {
        chart: {
          id: 'sparkline1',
          group: 'sparklines',
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 1,
        },
        series: [{
          name: 'Mesas por ingresar',
          data: randomizeArray(sparklineData)
        }],
        labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
        yaxis: {
          min: 0
        },
        xaxis: {
          type: 'datetime',
        },
        colors: ['#DCE6EC'],
        title: {
          text: `${data.total_mesas - data.total_mesas_listas}`,
          offsetX: 30,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
          }
        },
        subtitle: {
          text: 'Mesas aun por ingresar',
          offsetX: 30,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
          }
        }
      }
      const spark2 = {
        chart: {
          id: 'sparkline2',
          group: 'sparklines',
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 1,
        },
        series: [{
          name: 'Mesas terminadas',
          data: randomizeArray(sparklineData)
        }],
        labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
        yaxis: {
          min: 0
        },
        xaxis: {
          type: 'datetime',
        },
        colors: ['#DCE6EC'],
        title: {
          text: `${data.total_mesas_listas}`,
          offsetX: 30,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
          }
        },
        subtitle: {
          text: 'Mesas ingresadas',
          offsetX: 30,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
          }
        }
      }
      const spark3 = {
        chart: {
          id: 'sparkline3',
          group: 'sparklines',
          type: 'area',
          height: 160,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'straight'
        },
        fill: {
          opacity: 1,
        },
        series: [{
          name: 'Votaciones por ingresos',
          data: randomizeArray(sparklineData)
        }],
        labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          min: 0
        },
        colors: ['#008FFB'],
        //colors: ['#5564BE'],
        title: {
          text: `${data.total_votos}`,
          offsetX: 30,
          style: {
            fontSize: '24px',
            cssClass: 'apexcharts-yaxis-title'
          }
        },
        subtitle: {
          text: 'Votaciones por ingreso',
          offsetX: 30,
          style: {
            fontSize: '14px',
            cssClass: 'apexcharts-yaxis-title'
          }
        }
      }  
      const optionDonut = {
        chart: {
            type: 'donut',
            width: '100%',
            height: 400
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          pie: {
            customScale: 0.9,
            donut: {
              size: '70%',
            },
            offsetY: 0,
          },
          stroke: {
            colors: undefined
          }
        },
        colors: colorPalette,
        title: {
          text: 'Votaciones Totales',
          style: {
            fontSize: '18px'
          }
        },
        series: data.votacionesTotales,
        labels: data.candidatos,
        legend: {
          position: 'left',
          offsetY: 40
        }
      }

    new ApexCharts(document.querySelector("#spark1"), spark1).render();
    new ApexCharts(document.querySelector("#spark2"), spark2).render();
    new ApexCharts(document.querySelector("#spark3"), spark3).render();
    new ApexCharts(document.querySelector("#donut"), optionDonut ).render();

}


const reloadDashboard = async () => {

  const response = await consulta(api + 'auth/RLDB');
  const {ok} = response;
  
  if (!ok) {
    localStorage.setItem("reload", JSON.stringify(false));
    return;
  }

  localStorage.setItem("reload", JSON.stringify(true));
  window.location.reload(true);
  
}

// setInterval(async function(){ 
//   // if (!RELOAD_DASHBOARD)  return console.log('No esta habilitado esta feature flags');
//   await reloadDashboard();
// }, 10000);

setInterval(async function(){ await reloadDashboard();}, 300000);

window.addEventListener("load", async () => {
    isSession();
    await showData();
});

