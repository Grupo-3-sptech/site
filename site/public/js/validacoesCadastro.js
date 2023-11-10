// Função para adicionar a máscara ao CPF
function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os primeiros 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona ponto após os próximos 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen e os últimos dígitos

    
    return cpf;
  }
  
  // Event listener para formatar enquanto digita
  document.getElementById('cpf_input').addEventListener('input', function (e) {
    let input = e.target;
    let value = input.value;
    if(value.length > 14){
        value = value.slice(0,14);
    }
    value = formatCPF(value);
    input.value = value;
  });

  document.getElementById('telefone_input').addEventListener('input', function (e) {
    let input = e.target;
    let value = input.value;
    if(value.length > 11){
        value = value.slice(0,11);
    }
    input.value = value;
  });
  
    // Event listener para formatar enquanto digita
    document.getElementById('cpf_input_edit').addEventListener('input', function (e) {
      let input = e.target;
      let value = input.value;
      if(value.length > 14){
          value = value.slice(0,14);
      }
      value = formatCPF(value);
      input.value = value;
    });
  
    document.getElementById('telefone_input_edit').addEventListener('input', function (e) {
      let input = e.target;
      let value = input.value;
      if(value.length > 11){
          value = value.slice(0,11);
      }
      input.value = value;
    });
  
