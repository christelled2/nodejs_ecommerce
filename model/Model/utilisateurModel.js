const utilisateurSchema = require('../Schema/utilisateurSchema.js')


module.exports = class utilisateurModel {

    add(civilite, nom, prenom, email, password) {
        let hash = require('crypto').createHash('sha1').update(password).digest('hex')
        utilisateurSchema.create({
            civilite,
            nom,
            prenom,
            email,
            password: hash
    })}

    emailExists(email) {
        return new Promise((resolve, rejected) => {
                // On recherche l'email
                utilisateurSchema.findOne({ email }).exec((err, utilisateur) => {
                // Si il y a une erreur (pas de résultat)
                if (err !== null || utilisateur === null) resolve(false);
                resolve(true);
            })
        })
    }

    connexion(email, password) {
        return new Promise((resolve, rejected) => {
            let hash = require('crypto').createHash('sha1').update(password).digest('hex')
            // On recherche l'email
            utilisateurSchema.findOne({ email, password : hash }).exec((err, utilisateur) => {
            // Si il y a une erreur (pas de résultat)
            if (err !== null || utilisateur === null) rejected(new Error('Identification échouée'));
            resolve(utilisateur);
        })
    })
    }

}