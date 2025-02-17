function atualizarUsuario() {
  let userData = localStorage.getItem("discord_user");

  if (userData) {
    let user = JSON.parse(userData);
    let userBox = document.getElementById("user-box");

    if (userBox) {
      userBox.innerHTML = `
        <img src="${user.avatar}" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%;">
        <div id="user-menu">
          <img src="${user.avatar}" alt="Avatar">
          <span>${user.username}</span>
          <button onclick="logout()">Sair</button>
        </div>
      `;

      // Adicionar eventos para mostrar e esconder o menu
      userBox.addEventListener("mouseenter", () => {
        document.getElementById("user-menu").style.display = "block";
      });

      userBox.addEventListener("mouseleave", () => {
        document.getElementById("user-menu").style.display = "none";
      });
    }
  }
}

// Função para logout
function logout() {
  localStorage.removeItem("discord_user");
  window.location.reload(); // Recarrega a página para remover os dados do usuário
}

// Chamar a função quando a página carregar
document.addEventListener("DOMContentLoaded", atualizarUsuario);
