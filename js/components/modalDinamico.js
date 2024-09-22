class ModalDinamic extends HTMLElement {
  constructor() {
    super();
    this.attributesComponents = [
      this.name = 'Ingresa tu titulo',
      this.classname = 'modal-dialog modal-fullscreen-lg-down',
      this.titleModal = 'Datos de Registro',
      this.message = ''
    ];
  }

  static get observedAttributes(){ return ['name', 'classname', 'titleModal', 'message']; }

  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }

    connectedCallback() {
        this.innerHTML = `
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="${this.classname}">            
          <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${this.titleModal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              
              <div class="modal-body">
                <div id="divMessage">${this.message}</div>
                <form class="row g-2 container" id="createRegister">
                    
                    <div class="col-md-12 ms-auto">
                      <label for="event" class="form-label">Evento</label>
                      <select class="form-select" id="event" name="event" >
                      <option selected disabled value="">Seleccione un Evento</option>
                      </select>
                      <div id="divErrorEvent"></div>
                    </div>


                    <div class="col-md-12 ms-auto">
                      <label for="tables" class="form-label">Mesas</label>
                      <select class="form-select" id="tables" name="tables" required>
                      <option selected disabled value="">Seleccione una Mesa</option>
                      </select>
                      <div id="divErrorTables"></div>
                    </div>
                    
                    <div id="formBodyDinamic"></div>

                  <div class="col-sm-12 d-grid gap-2">
                    <button class="btn btn-primary btn-lg" type="submit" id="save_register">Crear Registro</button>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>`;
    }
}

customElements.define('modal-dinamic-component', ModalDinamic);