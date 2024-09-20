class SelectComponent extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.title = 'Title',  // default attribute value
        this.idname = 'selected',
        this.msg = `divError`,
        this.classname = 'col-md-12 ms-auto'
      ];
    }
  
    static get observedAttributes(){ return ['title','idname', 'msg', 'classname']; }
  
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
    connectedCallback() {
      this.innerHTML = `
      <div class="${this.classname}">
        <label for="${this.idname}" class="form-label">${this.title}</label>
        <select class="form-select" id="${this.idname}" name="${this.idname}" >
        <option selected disabled value="">Seleccione ${this.idname}</option>
        </select>
        <div id="${this.msg}"></div>
      </div>`;
    }
  }
  
  customElements.define('select-component', SelectComponent);