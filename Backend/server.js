const express = require('express'); // Importa o Express
const cors = require('cors'); // Importa o CORs

const app = express(); //Cria o servidor

const port = 3000; //Variavel para armazenar a porta

//Para permitir receber json nas requisições
app.use(express.json());
app.use(cors());

const produtos = [
    {"id": "001", "nome": "Televisão", "quantidade": 4},
    {"id": "002", "nome": "Controle Remoto Televisão", "quantidade": 15},
    {"id": "003", "nome": "Sofá", "quantidade": 2}
]