class ModalUbications extends HTMLElement {
  constructor() {
    super();
    this.attributesComponents = [
      this.name = 'Ingresa tu titulo',
      this.classname = 'modal-dialog',
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
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="${this.classname}">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${this.titleModal}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <form class="row g-2 container" id="createRegister">
                  
                <div class="col-md-12">
                    <label for="name" class="form-label">Nombre</label>
                    <input type="text" class="form-control text-uppercase" id="name" name="name" placeholder="Ingrese nombre completo" required>
                    <div id="divErrorName"></div> 
                  </div>
                  
                  <div class="col-md-12">
                      <label for="name-pacto" class="form-label">Nombre de Pacto</label>
                      <textarea class="form-control" placeholder="Ingresa nombre de pacto" id="name-pacto"></textarea>
                      <label for="floatingTextarea2">Ingresa la descripcion</label>
                      <div id="divErrorNamePacto"></div>                  
                  </div>

                  <div class="col-md-6">
                    <label for="number-candidate" class="form-label">Numero de Candidato</label>
                    <input type="number" class="form-control text-uppercase" id="number-candidate" name="number-candidate" placeholder="Ingrese numero de candidato" required>
                    <div id="divErrornumber-candidate"></div> 
                  </div>

                  <div class="col-md-6 ms-auto">
                    <label for="commune" class="form-label">Comuna</label>
                    <select class="form-select" id="commune" name="commune" >
                    <option selected disabled value="">Seleccione una Comuna</option>
                    </select>
                    <div id="divErrorCommune"></div>
                  </div>
                  
                  <div class="col-md-12 ms-auto">
                    <label for="event" class="form-label">Evento</label>
                    <select class="form-select" id="event" name="event" required>
                    <option selected disabled value="">Seleccione un evento</option>
                    </select>
                    <div id="divErrorEvent"></div>
                  </div>

                  <div class="col-md-12 ms-auto">
                    <label for="enabled" class="form-label">Habilitado</label>
                    <select class="form-select" id="enabled" name="enabled" required>
                      <option selected value="true">ACTIVO</option>
                      <option value="false">DESACTIVADO</option>
                    </select>
                    <div id="divErrorenabled"></div>
                  </div>

                  <input type="text" class="d-none" id="uid" name="uid">

                  <div class="col-sm-12 d-grid gap-2">
                    <button class="btn btn-primary btn-lg" type="submit" id="save_register">Crear Registro</button>
                    <button class="btn btn-primary btn-lg d-none" type="button" id="edit_register">Editar Registro</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>`;
    }
}

customElements.define('modal-ubications-component', ModalUbications);