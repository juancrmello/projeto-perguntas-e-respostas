const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/pergunta');
const Resposta = require('./database/Resposta');

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

    Pergunta.findAll({ raw: true, order: [['id', 'DESC']] }).then(perguntas => {

        res.render('index', {
            perguntas: perguntas
        });
    });
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

app.post('/salvarpergunta', (req, res) => {
    
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        description: descricao
    }).then(() => {
        res.redirect('/');
    })

});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { // Pergunta encontrada
            
            Resposta.findAll({
                where: { perguntaId : pergunta.id },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
            
        } else { // Pergunta não encontrada
            res.redirect('/');
        }
    });
});

app.post('/responder', (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+perguntaId);
    });
})
app.listen(3000, () => {console.log("App rodando!")});