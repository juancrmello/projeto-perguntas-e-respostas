const express = require('express');
const app = express();

// Estou dizendo para o Express usar o EJs como View Engine
app.set('view engine', 'ejs');
// Estou dizendo para o Express que permita a utilização de arquivos estáticos, como css, imgs e etc
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
})
app.listen(3000, () => {console.log("App rodando!")});