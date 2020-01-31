module.exports = class Connexion {
    print(req, res)
    {
        res.render('connexion')
    }

    process(req,res) {
        var utilisateurModel = require('../model/Model/utilisateurModel.js')
        var utilisateur = new utilisateurModel();
        let formError = null

        //console.log(req.body.email, req.body.password)

        let connexion = utilisateur.connexion(req.body.email, req.body.password).then((user) => {
            //console.log(user)
            req.session.user = {
                id : user._id,
                nom : user.nom,
                prenom: user.prenom,
                email: user.email
            }
            
            req.flash('info', 'Vous êtes bien connecté(e).');
            res.redirect("/")
        }).catch((error) => {
            console.log(error.message);
            res.redirect("/connexion")
        })
 

    }
}