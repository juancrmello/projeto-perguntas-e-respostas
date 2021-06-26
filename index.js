const express = require('express');
const app = express();

// Estou dizendo para o Express usar o EJs como View Engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    res.render('home');

});

app.listen(3000, () => {console.log("App rodando!")});