module.exports = (app) => {

    app.get('/', (req, res) => {
        let Controller = require("../controller/home.js")
        let Home = new Controller()
        console.log(req.session.user)
        Home.print(req, res)
    })

    app.get('/connexion', (req, res) => {
        let Controller = require("../controller/connexion.js")
        let Connexion = new Controller()
        Connexion.print(req, res)
    })

    app.post('/connexion', (req, res) => {
        let Controller = require("../controller/connexion.js")
        let Connexion = new Controller()
        Connexion.process(req, res)
    })

    app.get('/deconnexion', (req, res) => {
        let Controller = require("../controller/deconnexion.js")
        let Deconnexion = new Controller()
        Deconnexion.process(req, res)
    })
    
    app.get('/inscription', (req, res) => {
        let Controller = require("../controller/inscription.js")
        let Register = new Controller()
        Register.printForm(req, res)
    })
    
    app.post('/inscription', (req, res) => {
        let Controller = require("../controller/inscription.js")
        let Register = new Controller()
        Register.process(req, res)
        
    })
}