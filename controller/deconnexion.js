module.exports = class Deconnexion {
    process(req,res) {
        req.session.destroy();
        req.flash('info', 'Vous êtes bien déconnecté(e).');
        res.redirect("/")
    }
}