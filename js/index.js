const welcomeUser = document.getElementById('hello-user');
const message = document.getElementById('message-welcome');
const userNameInput = user;

 const btnVoteUp  = document.getElementById('voteUp');



const hiUser = () => {

  welcomeUser.textContent = `Hola, ${ userNameInput }!`;
  message.textContent = `Bienvenido a la plataforma de VoteUp`



}



btnVoteUp.addEventListener('click', () => {

  return window.location.href = `${ url }/votes.html`;

});


window.addEventListener("load", () => {
    isSession();
    hiUser();
  }
)