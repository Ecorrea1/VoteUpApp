class ChartBar extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.idChart = 'myChart', //Aqui puedes darle Definiciones por defecto
        this.titleChart = 'Cantidad de votos de Votos',
        this.alto = '200',
        this.ancho = '320',
        this.labels =['Rojo', 'Azul', 'Amarillo', 'Verde', 'Púrpura', 'Naranja'],
        this.backgroundColor = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          
        this.borderColorChart = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],

        this.dataChart = [54, 14, 54, 22, 2, 3]
    ];
    }
    
    // static get observedAttributes(){ return ['idChart','titleChart', 'alto', 'ancho', 'labels', 'backgroundColor', 'dataChart']; }
    static get observedAttributes(){ return ['idChart', 'titleChart', 'alto', 'ancho', 'labels', 'backgroundColor', 'borderColorChart', 'dataChart']; }
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
    connectedCallback() {
        this.innerHTML = `
        <canvas id="${this.idChart}" width="${this.ancho}" height="${this.alto}"></canvas>  
        `;
        this.loadingData();

    }


    loadingData(){
        const ctx = document.getElementById(this.idChart).getContext('2d');

        new Chart(ctx, {
            type: 'bar',// line
            data: {
                labels : this.labels,
                datasets: [{
                    label: this.titleChart,
                    data: this.dataChart,
                    backgroundColor: this.backgroundColor,
                    borderColor: this.borderColorChart,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: (tooltipItem) => `Votos: ${tooltipItem.raw}` } }
                },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

  }
  
  customElements.define('chart-bar-component', ChartBar);