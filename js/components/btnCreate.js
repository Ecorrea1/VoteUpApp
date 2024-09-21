class ChartBar extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.id = 'myChart', //Aqui puedes darle Definiciones por defecto
        this.width = '400',
        this.height = '100'
      ];
    }
    
    static get observedAttributes(){ return ['id', 'classname']; }
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
    connectedCallback() {
      this.innerHTML = `
      <canvas id="myChart" width="400" height="100"></canvas>  
      `;
    }
  }
  
  customElements.define('chart-bar', ChartBar);