const express = require('express')
const app = express()
const config = require('./app/config.js')

const path = require('path')
const chalk = require('chalk');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

var mongoose = require('mongoose');
mongoose.connect(
    config.mongodbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var utilisateurSchema = new mongoose.Schema({
    civilite: { 
        type: String,
        enum: ['madame', 'monsieur']
        },
    nom: String,
    prenom:   String,
    email: String,
    password: String
  });

app.set('views',  path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
app.use(express.static('/templates/index.pug' || path.join(__dirname, 'public')));
 
app.get('/', function(req, res) {
    res.render('index')
})

app.get('/inscription', function(req, res) {
    res.render('inscription')
})

app.post('/inscription', (req, res) => {
    console.log(chalk.blue(req.body.nom))
    res.send(req.body.nom)

    
    var utilisateurModel = mongoose.model('Utilisateur', utilisateurSchema)
    var utilisateur = new utilisateurModel({
        civilite: req.body.civilite,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: require('crypto').createHash('sha1').update(req.body.password).digest('hex')
    })
    utilisateur.save(function (err, utilisateur) {
        if (err) return console.error(err);
      });

})
 
app.listen(config.port)