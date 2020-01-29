module.exports = class inscription {
    printForm(req, res) {
        res.render('inscription')
    }

    process(req,res) {
        var utilisateurModel = require('../model/Model/utilisateurModel.js')
        var utilisateur = new utilisateurModel();
        
        utilisateur.add(
            req.body.civilite, 
            req.body.nom, 
            req.body.prenom,
            req.body.email, 
            req.body.password
        )
        res.redirect('/')
    }
}