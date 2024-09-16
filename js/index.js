const welcomeUser = document.getElementById('hello-user');
const message = document.getElementById('message-welcome');
const userNameInput = user;

const hiUser = () => {

    welcomeUser.textContent = `Hola, ${ userNameInput }!`;
    message.textContent = `Bienvenido a la plataforma de VoteUp`

}

window.addEventListener("load", () => {
    isSession();
    hiUser();
  }
)