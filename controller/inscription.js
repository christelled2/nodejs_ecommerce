module.exports = class inscription {
    printForm(req, res) {
        res.render('inscription')
    }

    async process(req,res) {
        var utilisateurModel = require('../model/Model/utilisateurModel.js')
        var utilisateur = new utilisateurModel();

        let formError = null

        let emailExists = await utilisateur.emailExists(req.body.email);
        if(emailExists) {
            formError = `Cet email est déjà enregistré dans notre base de données !`
        }
        
        // Si il y a eut une erreur on stop
        if(formError !== null) {
            res.render('inscription', {
                form : req.body,
                error : formError
            })
            return;
        }
        
        utilisateur.add(
            req.body.civilite, 
            req.body.nom, 
            req.body.prenom,
            req.body.email, 
            req.body.password
        )
        req.flash('info', 'Vous vous êtes bien inscrit.');
        res.redirect('/')
    }
}