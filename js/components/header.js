class Header extends HTMLElement {
  constructor() {
      super();
      this.attributesComponents = [
        this.name = 'VoteUP',
        this.classname = 'navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body'
      ];
  }

  static get observedAttributes() { return ['name', 'classname']; }

  attributeChangedCallback(attribute, _, newAttr) {
      this.attributesComponents = [...this.attributesComponents, attribute];
      this[attribute] = newAttr;
  }

  connectedCallback() {
      this.innerHTML = `
      <header>
        <nav class="${this.classname}" data-bs-theme="dark">
          <div class="container-fluid">
            <a class="navbar-brand" id="url" href="/index.html">${this.name}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="pages">
                <li class="nav-item dropdown" id="logistic">
                           <a id="url" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Logistica</a>
                           <ul class="dropdown-menu">
                               <li><a id="url" name="event" class="dropdown-item" href="/event.html">Eventos</a></li>
                               <li><a id="url" name="candidates" class="dropdown-item" href="/candidates.html">Candidatos</a></li>
                               <li><a id="url" name="ubication" class="dropdown-item" href="/ubication.html">Ubicaciones</a></li>
                               <li><a id="url" name="tables" class="dropdown-item" href="/tables.html">Mesas</a></li>
                           </ul>
                       </li>
                       <li class="nav-item dropdown" id="register">
                           <a id="url" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Registros</a>
                           <ul class="dropdown-menu">
                               <li><a id="url" name="votes" class="dropdown-item" href="/votes.html">Registro de votos</a></li>
                               <li><a id="url" name="dashboard" class="dropdown-item" href="/dashboard.html">Panel de control</a></li>
                               <li><a id="url" name="uploader" class="dropdown-item" href="/uploader.html">Subida de datos</a></li>
                           </ul>
                       </li>
                       <li class="nav-item dropdown" id="config">
                           <a id="url" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Configuracion</a>
                           <ul class="dropdown-menu">
                               <li><a id="url" name="users" class="dropdown-item" href="/users.html">Usuarios</a></li>
                               <li><a id="url" name="role" class="dropdown-item" href="/role.html">Roles</a></li>
                           </ul>
                       </li>
              </ul>
                
                <ul id="user-info" class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a id="url" class="nav-link dropdown-toggle" name="url-login" href="/login.html" role="button" data-bs-toggle="dropdown" aria-expanded="false"> !Hola </a>
                        <ul class="dropdown-menu">
                            <li><a id="url" name="user" class="dropdown-item" href="/user.html" href="#">Editar</a></li>
                            <li><a class="dropdown-item" name="close-session" onclick="closeSession()">Cerrar Sesion</a></li>
                        </ul>
                    </li>
                </ul>

            </div>
          </div>
        </nav>
    </header>
      `;

      this.ocultarPaginasPorPermiso();
  }

  ocultarPaginasPorPermiso() {
    const pagesArray = JSON.parse(localStorage.getItem('pages') ) .map(item => item.page);
    const paginasPermitidas = pagesArray || ['user', 'close-session'];
    const items = document.querySelectorAll('#pages .nav-item');
    const pages = document.querySelectorAll('#pages .nav-item .dropdown-item');
    const userInfo = document.querySelectorAll('#user-info .nav-item .dropdown-item');


    items.forEach(page => {
        const pageId = page.id;
        if (!paginasPermitidas.includes(pageId)) {
            page.style.display = 'none';
        }
    });

    pages.forEach(page => {
      const pageName = page.getAttribute('name');
      if (!paginasPermitidas.includes(pageName)) {
          page.style.display = 'none';
      }
  });

    userInfo.forEach(page => {
      const pageName = page.getAttribute('name');
      if (!paginasPermitidas.includes(pageName)) {
          page.style.display = 'none';
      }
  });

}
}

customElements.define('header-component', Header);
