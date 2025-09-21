function adicionar_produto(event){
     event.preventDefault();
     let nome = event.target.nome_form.value;
     let quantidade = event.target.quantidade_form.value;
     if (verificar_quantidade(quantidade)) {
        fetch('http://localhost:3000/produtos/cadastrar', {

    method: 'POST',

    headers: {

        'Content-Type': 'application/json'

    },

    body: JSON.stringify({
        "nome": nome,
        "quantidade": quantidade
    })


})

    .then(response => response.json())

    .then(data => {
        window.location.href= '../index.html'
    })

    .catch(error => console.log(error));
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
