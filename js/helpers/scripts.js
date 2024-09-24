Apex.grid = {
    padding: {
      right: 0,
      left: 0
    }
  }
  
  Apex.dataLabels = {
    enabled: false
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

  // data for the sparklines that appear below header area
  const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];
  
  // the default colorPalette for this dashboard
  // var colorPalette = ['#01BFD6', '#5564BE', '#F7A600', '#EDCD24', '#F74F58'];
  const colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']
  
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
      text: `${mesasTotales.length - mesasIngresadas.length}`,
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
      text: `${mesasIngresadas.length}`,
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
      text: `${totalVotes}`,
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
  
  const monthlyEarningsOpt = {
    chart: {
      type: 'area',
      height: 260,
      background: '#eff4f7',
      sparkline: {
        enabled: true
      },
      offsetY: 20
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    series: [{
      data: randomizeArray(sparklineData)
    }],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    yaxis: {
      min: 0,
      max: 130
    },
    colors: ['#dce6ec'],
  
    title: {
      text: 'Total Earned',
      offsetX: -30,
      offsetY: 100,
      align: 'right',
      style: {
        color: '#7c939f',
        fontSize: '16px',
        cssClass: 'apexcharts-yaxis-title'
      }
    },
    subtitle: {
      text: '$135,965',
      offsetX: -30,
      offsetY: 100,
      align: 'right',
      style: {
        color: '#7c939f',
        fontSize: '24px',
        cssClass: 'apexcharts-yaxis-title'
      }
    }
  }
  
  
  new ApexCharts(document.querySelector("#spark1"), spark1).render();
  new ApexCharts(document.querySelector("#spark2"), spark2).render();
  new ApexCharts(document.querySelector("#spark3"), spark3).render();
  
  const monthlyEarningsChart = new ApexCharts(document.querySelector("#monthly-earnings-chart"), monthlyEarningsOpt);
  
  
  const optionsArea = {
    chart: {
      height: 340,
      type: 'area',
      zoom: {
        enabled: false
      },
    },
    stroke: {
      curve: 'straight'
    },
    colors: colorPalette,
    series: [
      {
        name: "Blog",
        data: [{
          x: 0,
          y: 0
        }, {
          x: 4,
          y: 5
        }, {
          x: 5,
          y: 3
        }, {
          x: 9,
          y: 8
        }, {
          x: 14,
          y: 4
        }, {
          x: 18,
          y: 5
        }, {
          x: 25,
          y: 0
        }]
      },
      {
        name: "Social Media",
        data: [{
          x: 0,
          y: 0
        }, {
          x: 4,
          y: 6
        }, {
          x: 5,
          y: 4
        }, {
          x: 14,
          y: 8
        }, {
          x: 18,
          y: 5.5
        }, {
          x: 21,
          y: 6
        }, {
          x: 25,
          y: 0
        }]
      },
      {
        name: "External",
        data: [{
          x: 0,
          y: 0
        }, {
          x: 2,
          y: 5
        }, {
          x: 5,
          y: 4
        }, {
          x: 10,
          y: 11
        }, {
          x: 14,
          y: 4
        }, {
          x: 18,
          y: 8
        }, {
          x: 25,
          y: 0
        }]
      }
    ],
    fill: {
      opacity: 1,
    },
    title: {
      text: 'Daily Visits Insights',
      align: 'left',
      style: {
        fontSize: '18px'
      }
    },
    markers: {
      size: 0,
      style: 'hollow',
      hover: {
        opacity: 5,
      }
    },
    tooltip: {
      intersect: true,
      shared: false,
    },
    xaxis: {
      tooltip: {
        enabled: false
      },
      labels: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      stepSize: 3,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#78909c'
        }
      }
    },
    legend: {
      show: false
    }
  }
  
  const chartArea = new ApexCharts(document.querySelector('#area'), optionsArea);
  chartArea.render();
  
  const optionsBar = {
    chart: {
      type: 'bar',
      height: 380,
      width: '100%',
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
      }
    },
    colors: colorPalette,
    series: [{
      name: "Clothing",
      data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51, 42, 56],
    }, {
      name: "Food Products",
      data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
    }],
    labels: [10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#78909c'
        }
      }
    },
    title: {
      text: 'Monthly Sales',
      align: 'left',
      style: {
        fontSize: '18px'
      }
    }
  
  }
  
  const chartBar = new ApexCharts(document.querySelector('#bar'), optionsBar);
  chartBar.render();
  
  
  const optionDonut = {
    chart: {
        type: 'donut',
        width: '100%',
        height: 400
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: '75%',
        },
        offsetY: 20,
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
    series: [21, 23, 19, 14, 6],
    labels: ['Clothing', 'Food Products', 'Electronics', 'Kitchen Utility', 'Gardening'],
    legend: {
      position: 'left',
      offsetY: 80
    }
  }
  
  const donut = new ApexCharts(
    document.querySelector("#donut"),
    optionDonut
  )
  donut.render();
  
  
  function trigoSeries(cnt, strength) {
    let data = [];
    for (var i = 0; i < cnt; i++) {
        data.push((Math.sin(i / strength) * (i / strength) + i / strength+1) * (strength*2));
    }
  
    return data;
  }
  

  const optionsLine = {
    chart: {
      height: 340,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    plotOptions: {
      stroke: {
        width: 4,
        curve: 'smooth'
      },
    },
    colors: colorPalette,
    series: [
      {
        name: "Day Time",
        data: trigoSeries(52, 20)
      },
      {
        name: "Night Time",
        data: trigoSeries(52, 27)
      },
    ],
    title: {
      floating: false,
      text: 'Customers',
      align: 'left',
      style: {
        fontSize: '18px'
      }
    },
    subtitle: {
      text: '168,215',
      align: 'center',
      margin: 30,
      offsetY: 40,
      style: {
        color: '#222',
        fontSize: '24px',
      }
    },
    markers: {
      size: 1
    },
  
    grid: {
  
    },
    xaxis: {
      labels: {
        show: false
      },
      axisTicks: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 2,
      labels: {
        show: false
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false
      },
      min: 0,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetY: -20,
      offsetX: -30
    }
  
  }
  
  const chartLine = new ApexCharts(document.querySelector('#line'), optionsLine);
  
  // a small hack to extend height in website sample dashboard
  chartLine.render().then(function () {
    const ifr = document.querySelector("#wrapper");
    if (ifr.contentDocument) {
      ifr.style.height = ifr.contentDocument.body.scrollHeight + 20 + 'px';
    }
  });
  
  
  // on smaller screen, change the legends position for donut
  const mobileDonut = function() {
    if($(window).width() < 768) {
      donut.updateOptions({
        plotOptions: {
          pie: {
            offsetY: -15,
          }
        },
        legend: {
          position: 'bottom'
        }
      }, false, false)
    }
    else {
      donut.updateOptions({
        plotOptions: {
          pie: {
            offsetY: 20,
          }
        },
        legend: {
          position: 'left'
        }
      }, false, false)
    }
  }
  
  $(window).resize(function() {
    mobileDonut()
  });