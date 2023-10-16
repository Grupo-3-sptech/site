function verificarAdmin(){
    cargo = sessionStorage.CARGO_USUARIO
  
    if (cargo !== "Admin") {
        gerenciarUsuarios.style = 'display: none'
    }
  }