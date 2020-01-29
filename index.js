const express = require('express')
const app = express()
const config = require('./app/config.js')
const path = require('path')
const chalk = require('chalk');
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

const mongoose = require('mongoose')
mongoose.connect(
    config.mongodbConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log(chalk.blue('Connected to Database!'));
});

app.set('views',  path.join(__dirname, 'templates'))
app.set('view engine', 'pug')
app.use(express.static('/templates/index.pug' || path.join(__dirname, 'public')));

require('./app/route.js')(app)

app.listen(config.port)