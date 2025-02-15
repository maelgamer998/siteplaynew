//
//  COPIAR IP
//
var ip = document.querySelector('#ip');
var ipSpan = ip.querySelector('span');
var ipTextarea = ip.querySelector('textarea');
ip.addEventListener('click', function () {
  ip.classList.add('is-active');
  setTimeout(() => {
    ip.classList.remove('is-active');
  }, 1500);

  ipTextarea.classList.add('is-active');
  ipTextarea.value = ipSpan.innerHTML;
  ipTextarea.select();
  ipTextarea.setSelectionRange(0, 99999);
  document.execCommand("copy");
  ipTextarea.classList.remove('is-active');
});

//
//  STATUS DO SERVIDOR
//
$.getJSON('https://api.minetools.eu/ping/' + ip.innerText + '/25565', function(data) {
  if (data.error) {
    $('#status').html('<i class="fas fa-times"></i> Servidor offline');
    $('#motd').html('-');
    $('#online').html('-');
  } else {
    $('#status').html('<i class="fas fa-check"></i> Servidor online');
    $('#motd').html(data.description.replace(/§(.+?)/gi, ''));
    $('#online').html(data.players.online);
  }
});

//
//  MENU MOBILE
//
$('.navbar-burger').on('click', function() {
  document.querySelector('.navbar-menu').classList.toggle('is-active');
});

//
//  CHAT
//
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight; // Rolagem automática
    }
});

// Para permitir enviar mensagens com a tecla Enter
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

const descriptions = {
    membro1: {
        title: "Nome do Membro 1",
        description: "Esse é um dos administradores do servidor PlayNew. Ele cuida da moderação e eventos."
    },
    membro2: {
        title: "Nome do Membro 2",
        description: "Esse membro ajuda na construção e criação de mapas incríveis para o servidor!"
    }
};

function openPopup(memberId) {
    document.getElementById("popup-title").innerText = descriptions[memberId].title;
    document.getElementById("popup-description").innerText = descriptions[memberId].description;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
