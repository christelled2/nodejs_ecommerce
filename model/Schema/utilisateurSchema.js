var mongoose = require('mongoose');

var utilisateurSchema = mongoose.Schema({
    civilite: { 
        type: String,
        enum: ['madame', 'monsieur']
        },
    nom: String,
    prenom:   String,
    email: String,
    password: String
  });

  module.exports = mongoose.model('utilisateur', utilisateurSchema)