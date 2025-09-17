
let lista_produtos = document.getElementById("lista_produtos");
let todos_produtos = [];

function carregar_produtos() {
    
    fetch('http://localhost:5000/produtos')

    .then(response => response.json())

    .then(produtos => {
        lista_produtos.innerHTML = "";
        produtos.forEach(produto => {
            todos_produtos = produtos;
            lista_produtos.innerHTML += `<li class="list-group-item">Id: ${produto.id}
            <div class="d-flex justify-content-between">
            <h4>Nome: ${produto.nome}  <br>  Quantidade: ${produto.quantidade}</h4>
            <div>
            <input type="number" class="form-control" id="numero_quantidade_${produto.id}" >
            <button type="button" class="btn btn-primary" onclick="aumentar_quantidade('${produto.id}')">Aumentar</button>
            <button type="button" class="btn btn-warning" onclick="aumentar_quantidade('${produto.id}')">Diminuir Fazer</button>
            </div>
            </div>
            </li>
            <br>`
        });
    })

    .catch(error => console.log(error));
}



function aumentar_quantidade(id) {
        let numero_digitado = document.getElementById(`numero_quantidade_${id}`).value;
        numero_digitado = parseInt(numero_digitado)
    
        let indice_produto_escolhido = todos_produtos.findIndex(produto_achar => produto_achar.id == id)
        let produto_escolhido = todos_produtos[indice_produto_escolhido]
        fetch(`http://localhost:5000/produtos/${id}`, {
    
        method: 'PUT',
    
        headers: {
    
            'Content-Type': 'application/json'
    
        },
    
        body: JSON.stringify({
            id: produto_escolhido.id,
            nome: produto_escolhido.nome,
            quantidade: produto_escolhido.quantidade + numero_digitado
        })
    
    })
    
        .then(response => response.json())
    
        .then(data => {
            carregar_produtos();
        })
    
        .catch(error => console.log(error));
    }

window.onload = function () {
        carregar_produtos(); 
}
    