const Pensamento = require ('../models/Pensamento')
const User = require ('../models/User')

module.exports = class PensamentoController {
    static async showPensamentos(req, res){

        const pensamentosData = Pensamento.findAll({
            include: User,
        })

        const pensamentos = pensamentosData.map((result) => result.get({ plain: true}))
        res.render('pensamentos/home', {pensamentos})
    }

    static async dashboard(req, res) {

        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Pensamento,
            plain: true,
        })

        //check if user exists

        if(!user) {
            res.redirect('/login')
        }

        const pensamentos = user.Pensamentos.map((result) => result.dataValues)

        let emptyPensamentos = false

        if(pensamentos.length === 0) {
            emptyPensamentos = true
        }

    
        res.render('pensamentos/dashboard'), { pensamentos }
    }

    static createPensamento(req, res) {
        res.render('pensamentos/create')
    }

    static async createPensamentoSave(req, res) {

        const pensamento = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {

            await Pensamento.create(pensamento)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
            res.redirect('/pesamentos/dashboard')
            })
            
        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }
        
    }

    static async removePensamento(req, res){

        const id = req.body.id;
        const UserId = req.session.userid

        try {

            await Pensamento.destroy({where: {id: id, UserId: UserId}})
            
            req.flash('message', 'Pensamento removido com sucesso!')

            req.session.save(() => {
                res.redirect('/pesamentos/dashboard')
            })

        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }

    }

    static async updatePensamento(req, res) {

        const id = req.params.id

        const pensamento = await Pensamento.findOne({ where: { id: id }})
    
        res.render('pensamentos/edit', { pensamento })
    }

    static async updatePensamentoSave(req, res) {

        const id = req.body.id

        const pensamento = {
            title: req.body.title
        }

        try {

            await Pensamento.update( pensamento, { where: { id: id }})
            
            req.flash('message', 'Pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/pesamentos/dashboard')
            })

        } catch (error) {
            console.log('Aconteceu um erro: ' + error)
        }

        
    }
}