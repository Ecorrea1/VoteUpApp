const name = localStorage.getItem('name');
const typeRole = Number(localStorage.getItem('role'));

const roles = {
    1: ['read'],
    3: ['read', 'write', 'update'],
    2: ['read', 'write', 'update','delete']
};

const loggedInUser = {
    name: name,
    role: typeRole, // Este valor debería ser dinámico según el usuario autenticado,
    pages: JSON.parse(localStorage.getItem('pages')).map(item => item.page)
};

// function checkAccess(resource) {
//     const userRole = loggedInUser.role;
//     const accessRights = roles[userRole];
//     return (accessRights.includes(resource)) ? true : false;
// }

// function checkAccessPage(){
//     const userPages = loggedInUser.pages;
//     const accessCorrect = userPages.filter( e => e.page);
//     return (accessCorrect.includes(window.location.pathname.split('/')[1].split('.')[0])) ? true : false;
// }

const accessResource = (accessRights, resource ) => (accessRights.includes(resource)) ? true : false; 

function redirigirSegunRol() {
    
    const checkAccess = accessResource(roles[loggedInUser.role], 'read');
    const checkAccessPage = accessResource(loggedInUser.pages.filter( e => e.page), window.location.pathname.split('/')[1].split('.')[0]);

    if (checkAccess == false || !checkAccessPage == false) return window.location.href = '/index.html';

}

// Llama a la función cuando se carga la página
window.addEventListener('load', redirigirSegunRol);
