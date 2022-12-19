// associar as dependências instaladas
const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser')
const cors = require('cors')
// inicializar app express
const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors())
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname,'/public')));


mongoose.set("strictQuery", true);
// Ligar á B.D.: 'test'->user da BD, ´nnn´->pass
mongoose.connect('mongodb+srv://Thiti:123321@pweb3.twkgtcg.mongodb.net/?retryWrites=true&w=majority');
// Confirma ligação na consola
mongoose.connection.on('connected', function () {
  console.log('Connected to Database '+'test');
});
// Mensagem de Erro
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// ‘END POINT INVÁLIDO!’
app.get('/', function(req, res){
  res.send('END POINT INVÁLIDO!');
});
// todo o url começado por ‘/api’ chama as rotas em ‘./routes/api’
const routes = require('./routes/api');
app.use('/api', routes);

// error handling middleware
app.use(function(err, req, res, next){
  console.log(err);
 // ‘res.status(422)’->muda o status
 res.status(422).send({error: err.message});
});

// rota raiz: renderiza a pagina onde criamos novo PI
app.get('/', function (req, res) {
  res.render('createPI');
});

let port = 5000;
// servidor á escuta no porto 5000
// 'process.env.port': caso usemos Heroku
app.listen(process.env.port || port, () =>{
  console.log('Servidor em execução no porto: '+ port);
});
