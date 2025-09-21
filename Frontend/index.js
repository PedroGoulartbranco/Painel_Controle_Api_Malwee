
let lista_produtos = document.getElementById("lista_produtos");
let todos_produtos = [];

function carregar_produtos() {
    
    fetch('http://localhost:3000/produtos')

    .then(response => response.json())

    .then(produtos => {
        lista_produtos.innerHTML = "";
        produtos.forEach(produto => {
            todos_produtos = produtos;
            lista_produtos.innerHTML += `<li class="list-group-item">Id: ${produto.id}
            <div class="d-flex justify-content-between">
            <h4>Nome: ${produto.nome}  <br>  Quantidade: <div id='id_quantidade_${produto.id}'>${produto.quantidade}</div></h4>
            <div>
            <input type="number" class="form-control" id="numero_quantidade_${produto.id}" >
            <button type="button" class="btn btn-primary" onclick="aumentar_quantidade('${produto.id}')">Aumentar</button>
            <button type="button" class="btn btn-warning" onclick="diminuir_quantidade('${produto.id}')">Diminuir</button>
            <button type="button" class="btn btn-danger" onclick="deletar(${produto.id}, '${produto.nome}')">Deletar</button>
            </div>
            </div>
            </li>
            <br>`
            if (produto.quantidade < 10) {
                let div_quantidade = document.getElementById(`id_quantidade_${produto.id}`);
                div_quantidade.classList.add("deixar_vermelho")
            }
        });
    })

    .catch(error => console.log(error));
}

function verificar_numero_positvo(id) {
    let numero_digitado = document.getElementById(`numero_quantidade_${id}`).value;
    if (numero_digitado > 0) {
        return true
    } else {
        return false
    }
}

function aumentar_quantidade(id) {
        let valor_valido = verificar_numero_positvo(id);
        if (!valor_valido) {
            alert("Por favor, digite um número acima de 0 por favor!")
        } else {
            let numero_digitado = document.getElementById(`numero_quantidade_${id}`).value;
        numero_digitado = parseInt(numero_digitado)
    
        let indice_produto_escolhido = todos_produtos.findIndex(produto_achar => produto_achar.id == id)
        let produto_escolhido = todos_produtos[indice_produto_escolhido]
        fetch(`http://localhost:3000/produtos/${id}`, {
    
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
        }

function verificar_se_pode_diminuir(id) {
    let numero_digitado = document.getElementById(`numero_quantidade_${id}`).value;
    let indice_produto = todos_produtos.findIndex(produto_achar => produto_achar.id == id);
    produto_atual = todos_produtos[indice_produto];

    if (numero_digitado < 0) {
        numero_digitado *= -1
    }
    if (numero_digitado > produto_atual.quantidade) {
        return false;
    } else {
        return true;
    }
}

function diminuir_quantidade(id) {
    let pode_diminuir = verificar_se_pode_diminuir(id);
    if (!pode_diminuir) {
        alert("Por favor, digite um número menor!")
    } else {
        let numero_digitado = document.getElementById(`numero_quantidade_${id}`).value;
    let indice_produto = todos_produtos.findIndex(produto_achar => produto_achar.id == id);
    let produto_escolhido = todos_produtos[indice_produto];
    if (numero_digitado < 0) {
        numero_digitado *= -1;
    }
    fetch(`http://localhost:3000/produtos/${id}`, {
    
        method: 'PUT',
    
        headers: {
    
            'Content-Type': 'application/json'
    
        },
    
        body: JSON.stringify({
            id: produto_escolhido.id,
            nome: produto_escolhido.nome,
            quantidade: produto_escolhido.quantidade - numero_digitado
        })
    
    })
    
        .then(response => response.json())
    
        .then(data => {
            carregar_produtos();
        })
    
        .catch(error => console.log(error));
    }

    
}

function deletar(id, nome) {
    let confirmar = confirm(`Deseja mesmo excluir o produto ${nome} ?`);
    if (confirmar) {
        fetch(`http://localhost:3000/produtos/deletar/${id}`, {
        
            method: 'DELETE',
        
        })
        
            .then(response => {
                if (response.ok) {
                    alert(`Produto ${nome} apagado com sucesso.`);
                    window.location.reload();
                    return;
                }
                alert("Algo deu errado")
            })
    
        
            .catch(error => console.log(error));
    }
    } 


window.onload = function () {
        carregar_produtos(); 
}
    