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
        document.getElementById("login-button").addEventListener("click", function(){
            const clientId = '1340759181157732373';
            const redirectUri = 'https://playnew.site';
            const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=identify`;

            window.location.href = authUrl;
        });

        window.addEventListener("load", function() {
            const hash = window.location.hash.substr(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get("access_token") || localStorage.getItem("access_token");

            if (accessToken) {
                localStorage.setItem("access_token", accessToken);
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    document.getElementById("login-section").style.display = "none";
                    document.getElementById("user-avatar").src = data.avatar ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';
                    document.getElementById("dropdown-avatar").src = data.avatar ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';
                    document.getElementById("user-name").textContent = data.username;
                    document.getElementById("user-profile").style.display = "block";
                })
                .catch(console.error);
            }
        });

        document.getElementById("user-avatar").addEventListener("click", function() {
            const dropdownMenu = document.getElementById("dropdown-menu");
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
            
            // Ajusta a posição do dropdown se estiver fora da tela
            const rect = dropdownMenu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                dropdownMenu.style.right = '10px'; // Ajuste conforme necessário
            }
        });

        document.getElementById("logout-button").addEventListener("click", function(){
            localStorage.removeItem("access_token");
            document.getElementById("login-section").style.display = "block";
            document.getElementById("user-profile").style.display = "none";
        });
