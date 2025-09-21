const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORs

const app = express(); //Cria o servidor


const port = 3000; //Variavel para armazenar a porta

//Para permitir receber json nas requisições


app.use(express.json());
app.use(cors());


const produtos = [
    {"id": 1, "nome": "Televisão", "quantidade": 4},
    {"id": 2, "nome": "Controle Remoto Televisão", "quantidade": 15},
    {"id": 3, "nome": "Sofá", "quantidade": 2}
]

let proximo_id = 4;

app.get("/produtos", (request, response) => {
    response.send(produtos);
})

app.get("/produtos/informacoes/:id", (request, response) => {
    const id = req.params.id
    const informacoes_produto = produtos.findIndex(produto_achar => produto_achar.id == id)
    response.send(informacoes_produto);
})

app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = req.body;
    produto.id = id;
    const posicao = produtos.findIndex(produto_achar => produto_achar.id == id);

    if (posicao != null) {
        produtos[posicao] = produto;
        res.status(200).send(produto);
    } else {
        res.status(404).send("Produto não encontrado!")
    }
})

app.post("/produtos/cadastrar", (req, res) => {
    const novoProduto = req.body;
    novoProduto.id = proximo_id++;
    produtos.push(novoProduto);

    res.status(201).send(novoProduto);
})

app.delete("/produtos/deletar/:id", (req, res) => {
    const id_int = req.params.id;
    const indice = produtos.findIndex(produto_achar => produto_achar.id == id_int);

    if (indice == null) {
        res.status(404).send("Produto não existente.")
    } else {
        produtos.splice(indice, 1);
        res.status(200).send("Produto apagado.")
    }
})

//Faz rodar
app.listen(port, ()  => {
    console.log("http://localhost:3000")
})