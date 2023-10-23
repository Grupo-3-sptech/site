function verificarAdmin(){
    cargo = sessionStorage.CARGO_USUARIO
  
    if (cargo !== "Admin") {
        gerenciarUsuarios.style = 'display: none'
    }
  }

  function verificarAtendente(){
    cargo = sessionStorage.CARGO_USUARIO
  
    if (cargo !== "Atendente") {
        gerenciarCirurgias.style = 'display: none'
    }

  }

  function deslogar(){
    sessionStorage.clear();
  }
  