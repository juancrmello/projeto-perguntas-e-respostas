const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const perguntaModel = require('./database/pergunta');

connection.authenticate().then(() => {console.log('Conexão feita com o banco de dados!')}).catch((msgErro) => {console.log(msgErro)});

// Estou dizendo para o Express usar o EJs como View Engine
app.set('view engine', 'ejs');
// Estou dizendo para o Express que permita a utilização de arquivos estáticos, como css, imgs e etc
app.use(express.static('public'));
// Comando para conseguir ler os dados enviados para o express
app.use(bodyParser.urlencoded({extended: false}));
// Permite trabalhar com json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send(`Formulário recebido! Título: ${titulo} e Descrição: ${descricao}`);

})
app.listen(3000, () => {console.log("App rodando!")});