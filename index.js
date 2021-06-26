const express = require('express');
const app = express();

// Estou dizendo para o Express usar o EJs como View Engine
app.set('view engine', 'ejs');

app.get('/:nome/:lang', (req, res) => {

    var nome = req.params.nome;

    var lang = req.params.lang;

    res.render('index', {
        nome,
        lang,
        empresa: "juancrmello",
        inscritos: 100000
    });

});

app.listen(3000, () => {console.log("App rodando!")});