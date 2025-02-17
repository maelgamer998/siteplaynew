function atualizarUsuario() {
  let userData = localStorage.getItem("discord_user");

  if (userData) {
    let user = JSON.parse(userData);
    let userBox = document.getElementById("user-box");

    if (userBox) {
      userBox.innerHTML = `
        <img src="${user.avatar}" alt="Avatar" style="width: 40px; height: 40px; border-radius: 50%;">
        <span>${user.username}</span>
      `;
    }
  }
}

// Chamar a função quando a página carregar
document.addEventListener("DOMContentLoaded", atualizarUsuario);
