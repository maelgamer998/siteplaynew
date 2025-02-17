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

    document.addEventListener("DOMContentLoaded", function () {
    var burger = document.querySelector(".navbar-burguer");
    var menu = document.querySelector(".navbar-menu");

    if (burger && menu) {
        burger.addEventListener("click", function () {
            burger.classList.toggle("is-active");
            menu.classList.toggle("is-active");
        });
    }
});
// Função para obter parâmetros da URL (para pegar o token após o login)
function getAccessToken() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('access_token');
}

// Função para buscar dados do usuário
function fetchDiscordUser(token) {
    fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(user => {
        // Exibir informações do usuário no site
        document.getElementById('user-avatar').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        document.getElementById('user-name').textContent = user.username;
        document.getElementById('user-info').style.display = 'block';

        // Esconder botão de login
        document.getElementById('login-btn').style.display = 'none';

        // Salvar usuário no localStorage para manter a sessão
        localStorage.setItem('discordUser', JSON.stringify(user));
        localStorage.setItem('discordToken', token);
    })
    .catch(error => console.error('Erro ao obter dados do usuário:', error));
}

// Verificar se há um token na URL (quando o usuário faz login pela primeira vez)
const token = getAccessToken();
if (token) {
    // Remover o token da URL para segurança
    window.history.replaceState({}, document.title, window.location.pathname);
    fetchDiscordUser(token);
}

// Se o usuário já estiver logado (dados salvos no localStorage), restaurar sessão
const savedUser = localStorage.getItem('discordUser');
const savedToken = localStorage.getItem('discordToken');

if (savedUser && savedToken) {
    const user = JSON.parse(savedUser);
    document.getElementById('user-avatar').src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    document.getElementById('user-name').textContent = user.username;
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('login-btn').style.display = 'none';
}
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('discordUser');
    localStorage.removeItem('discordToken');
    location.reload(); // Recarrega a página para remover os dados do usuário
});

// Exibir botão de logout se o usuário estiver logado
if (savedUser) {
    document.getElementById('logout-btn').style.display = 'inline-block';
}
// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  const profilePic = document.getElementById('profilePic');
  const profileMenu = document.getElementById('profileMenu');
  const logoutBtn = document.getElementById('logoutBtn');

  // Mostrar o menu ao passar o mouse sobre a foto
  profilePic.addEventListener('mouseover', function() {
    profileMenu.style.display = 'block';
  });

  // Esconder o menu ao sair da foto de perfil
  profilePic.addEventListener('mouseout', function() {
    profileMenu.style.display = 'none';
  });

  // Mostrar o menu ao clicar na foto
  profilePic.addEventListener('click', function() {
    profileMenu.style.display = (profileMenu.style.display === 'block') ? 'none' : 'block';
  });

  // Logout (apenas exemplo de funcionalidade)
  logoutBtn.addEventListener('click', function() {
    alert('Você foi desconectado.');
    // Aqui você pode adicionar o código para desconectar o usuário
  });
});
