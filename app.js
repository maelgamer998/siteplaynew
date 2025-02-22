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
