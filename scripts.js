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
document.getElementById('login-button').addEventListener('click', function() {
    // Redireciona o usuário para a página de login do Discord
    const clientId = 'SEU_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.origin + '/callback');
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=identify`;
});

window.onload = function() {
    // Verifica se há um token de acesso no URL (depois do redirecionamento do Discord)
    const hash = window.location.hash;
    if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
            fetch('https://discord.com/api/users/@me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => response.json())
            .then(user => {
                localStorage.setItem('discord_user', JSON.stringify(user));
                showUserProfile(user);
            });
        }
    }

    // Verifica se há dados do usuário no armazenamento local
    const storedUser = localStorage.getItem('discord_user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        showUserProfile(user);
    }
};

function showUserProfile(user) {
    document.getElementById('login-section').style.display = 'none';
    const userProfile = document.getElementById('user-profile');
    userProfile.style.display = 'block';
    const avatar = document.getElementById('user-avatar');
    avatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    avatar.addEventListener('click', function() {
        const dropdownMenu = document.getElementById('dropdown-menu');
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
        document.getElementById('dropdown-avatar').src = avatar.src;
        document.getElementById('user-name').textContent = user.username;
    });
    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('discord_user');
        location.reload();
    });
}
        const CLIENT_ID = '1340759181157732373';
        const REDIRECT_URI = 'https://maelgamer998.github.io/siteplaynew/index.html';
        const AUTH_URL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=identify`;

        document.getElementById('login-button').onclick = function() {
            window.location.href = AUTH_URL;
        };

        window.onload = function() {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);

            if (params.has('access_token')) {
                const accessToken = params.get('access_token');
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('login-section').style.display = 'none';
                    document.getElementById('user-avatar').src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
                    document.getElementById('user-name').innerText = data.username;
                    document.getElementById('user-profile').style.display = 'block';
                })
                .catch(error => console.error('Error fetching user data:', error));
            }
        };

        document.getElementById('logout-button').onclick = function() {
            document.getElementById('user-profile').style.display = 'none';
            document.getElementById('login-section').style.display = 'block';
            window.location.hash = '';
        };
