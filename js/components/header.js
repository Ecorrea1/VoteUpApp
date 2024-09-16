class Header extends HTMLElement {
  constructor() {
    super();
    this.attributesComponents = [
      this.name = 'Ingresa tu titulo',
      this.classname = 'navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary" data-bs-theme="dark'
    ];
  }
  static get observedAttributes(){ return ['name', 'classname']; }
  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }

    connectedCallback() {
      this.innerHTML = `
      <header>
      <nav class="${this.classname}">
          <div class="container-fluid">
            <a class="navbar-brand" id="url" href="/index.html">
              <img src="assets/movida-logo-light.png" alt="${this.name}" width="32" height="32">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"></button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav" id="pages">
      
                <li class="nav-item dropdown" id="logistic">
                  <a id="url" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Logistica</a>
                  <ul class="dropdown-menu">
                    <li><a id="url" class="dropdown-item" href="/logistic.html">Eventos</a></li>
                    <li><a id="url" class="dropdown-item" href="/ubication.html">Ubicaciones</a></li>
                  </ul>
                </li>
                
                <li class="nav-item dropdown" id="register">
                  <a id="url" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Registros</a>
                  <ul class="dropdown-menu">
                    <li><a id="url" class="dropdown-item" href="/users.html">Usuarios</a></li>
                    <li><a id="url" class="dropdown-item" href="/missionary.html">Participantes</a></li>
                    <li><a id="url" class="dropdown-item" href="/church.html">Iglesias</a></li>
                  </ul>
                </li> 
                
                <li class="nav-item dropdown" id="config">
                  <a id="url" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Configuracion</a>
                  <ul class="dropdown-menu">
                    <li><a id="url" class="dropdown-item" href="/role.html">Roles</a></li>
                  </ul>
                </li>
                
                
              </ul>
            </div>
            
            
            
              <div class="d-flex">
                <ul class="navbar-nav me-auto mb-2  mb-lg-0">
                  <li class="nav-item dropdown">
                    <a id="url" class="nav-link dropdown-toggle" name="url-login" href="/login.html" role="button" data-bs-toggle="dropdown" aria-expanded="false"> !Hola </a>
                    <ul class="dropdown-menu">
                    <li><a id="url" class="dropdown-item" href="/user.html" href="#">Editar</a></li>
                    <li><a class="dropdown-item" onclick="closeSession()">Cerrar Sesion</a></li>
                    </ul>
                  </li>              
                </ul>
              </div>

          </div>
        
        </nav>
        </header>  
      `;
    }
}

customElements.define('header-component', Header);