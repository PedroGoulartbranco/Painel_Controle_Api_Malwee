let lista_produtos = document.getElementById("lista_produtos");

fetch('http://localhost:5000/produtos')

    .then(response => response.json())

    .then(produtos => {
        produtos.forEach(produto => {
            lista_produtos.innerHTML += `<li class="list-group-item">Id: ${produto.id}
            <div class="d-flex justify-content-between">
            <h4>Nome: ${produto.nome}  <br>  Quantidade: ${produto.quantidade}</h4>
            </div>
            </li>`
        });
    })

    .catch(error => console.log(error));