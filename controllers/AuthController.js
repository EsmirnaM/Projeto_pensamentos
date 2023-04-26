const User = require('../models/User')

const bcrypt = require('bcryptjs')


module.exports = class AuthController{
    static login(req, res) {
        res.render('auth/login')
    };

    static register(req, res) {
        res.render('auth/register')
    };

    static async registerPost(req, res) {
       
        const {name, email, password, confirmpassword } = req.body

        // Validação do password

        if (password != confirmpassword) {
            // mensagem
            req.flash('message', 'As senhas não conferem, porfavor verifique e tente novamente')
            res.render('auth/register')

            return
            
        }
    };
}   
