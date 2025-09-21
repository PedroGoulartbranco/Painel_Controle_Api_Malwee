function adicionar_produto(event){
     event.preventDefault();
     let nome = event.target.nome_form.value;
     let quantidade = event.target.quantidade_form.value;
     if (verificar_quantidade(quantidade)) {
        alert("foi")
     } else {
        alert("Por favor, digite uma quantidade positiva.")
     }
}

function verificar_quantidade(quantidade) {
    if (quantidade <= 0) {
        return false;
    } else {
        return true;
    }
}
