const Pensamentos = require ('../models/Pensamento')
const User = require ('../models/User')


module.exports = class PensamentoController {
    static async showPensamentos(req, res){
        res.render('pensamentos/home')
    }

    static async dashboard(req, res) {
        res.render('pensamentos/dashboard')
    }

    static createPensamento(req, res) {
        res.render('pesamentos/create')
    }

    static async createPensamentoSave(req, res) {

        const pensamento = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {

            await pensamento.create(pensamento)

            req.flash('message', 'pensamento creaido com sucesso!')

            req.session.save(() => {
            res.redirect('/pesamentos/dashboard')
            })
            
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
        
    }
}