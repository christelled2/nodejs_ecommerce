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
        })
    }
}

