document.getElementById('login-button').addEventListener('click', function() {
    // Redireciona o usuário para a página de login do Discord
    const clientId = '1340759181157732373';
    const redirectUri = encodeURIComponent('https://maelgamer998.github.io/siteplaynew/index.html');
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
