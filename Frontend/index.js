let lista_produtos = document.getElementById("lista_produtos");

fetch('http://localhost:5000/produtos')

    .then(response => response.json())

    .then(produtos => {
        produtos.forEach(produto => {
            lista_produtos.innerHTML += `<li class="list-group-item">Id: ${produto.id}
            <div class="d-flex justify-content-between">
            <h4>Nome: ${produto.nome}  <br>  Quantidade: ${produto.quantidade}</h4>
            <div>
            <input type="number" class="form-control" id="numero_quantidade" >
            <button type="button" class="btn btn-primary" onclick="atualizar_quantidade('${produto.id}', true)">Aumentar</button>
            <button type="button" class="btn btn-warning" onclick="atualizar_quantidade('${produto.id}', false)">Diminuir</button>
            </div>
            </div>
            </li>
            <br>`
        });
    })

    .catch(error => console.log(error));

function atualizar_quantidade(id, aumentar) {
    fetch('http://localhost:5000/produtos/', {

    method: 'PUT',

    headers: {

        'Content-Type': 'application/json'

    },

    body: JSON.stringify(data)

})

    .then(response => response.json())

    .then(data => console.log(data))

    .catch(error => console.log(error));
}

