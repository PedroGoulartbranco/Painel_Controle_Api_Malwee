const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORs

const app = express(); //Cria o servidor

const port = 5000; //Variavel para armazenar a porta

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());

const produtos = [
    {"id": "001", "nome": "Televisão", "quantidade": 4},
    {"id": "002", "nome": "Controle Remoto Televisão", "quantidade": 15},
    {"id": "003", "nome": "Sofá", "quantidade": 2}
]

let proximo_id = 

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

})

//Faz rodar
app.listen(port, ()  => {
    console.log("http://localhost:5000")
})