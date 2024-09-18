class ModalVotes extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.name = 'Ingresa tu titulo',
        this.classname = 'modal-dialog modal-dialog-centered',
        this.titleModal = 'Datos de Registro'
      ];
    }
  
    static get observedAttributes(){ return ['name', 'classname', 'titleModal']; }
  
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
  
      connectedCallback() {
          this.innerHTML = `
          <div class="modal fade" id="myModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
          <div class="${this.classname}">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">${this.titleModal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                  <div class="col-md-12 ms-auto">
                    <label for="event" class="form-label">Evento</label>
                    <select class="form-select" id="event" name="event" >
                    <option selected disabled value="">Seleccione un Evento</option>
                    </select>
                    <div id="divErrorEvent"></div>
                  </div>
                  
                  <div class="col-md-12 ms-auto">
                    <label for="tables" class="form-label">Mesas</label>
                    <select class="form-select" id="tables" name="tables" >
                    <option selected disabled value="">Seleccione una Mesa</option>
                    </select>
                    <div id="divErrorUbication"></div>
                  </div>
              
                </div>
              <div class="modal-footer">
                <button class="btn btn-primary" data-bs-target="#myModal2" data-bs-toggle="modal">Ingresar Candidato</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="myModal2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
          <div class="${this.classname}">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">${this.titleModal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                 <form class="row g-2 container" id="createRegister">

                  <div class="col-md-12 ms-auto">
                    <label for="candidate" class="form-label">Candidato</label>
                    <select class="form-select" id="candidate" name="candidate" >
                    <option selected disabled value="">Seleccione un candidato</option>
                    </select>
                    <div id="divErrorCandidate"></div>
                  </div>

                  <div class="col-md-12">
                    <label for="votes" class="form-label">Total de Votos</label>
                    <input type="number" class="form-control text-uppercase" id="votes" name="votes" placeholder="Ingrese cantidad de votos" required>
                    <div id="divErrorVotes"></div> 
                  </div>

                  <input type="text" class="d-none" id="uid" name="uid">

                  <div class="col-sm-12 d-grid gap-2">
                    <button class="btn btn-primary btn-lg" type="submit" id="save_register">Crear Registro</button>
                  </div>

                </form>
              
                </div>
              <div class="modal-footer">
                <button class="btn btn-primary" data-bs-target="#myModal" data-bs-toggle="modal">Cambiar Sala</button>
              </div>
            </div>
          </div>
        </div>`;
      }
  }
  
  customElements.define('modal-dual-component', ModalVotes);