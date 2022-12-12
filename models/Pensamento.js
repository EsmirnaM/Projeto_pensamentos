const { DataTypes, UnknownConstraintError } = require('sequelize')

const db = require('../db/conn')


const User = require('./User')
//User
const Pensamento = db.define('Pensamento', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    }
})

Pensamento.belongsTo(User)
User.hasMany(Pensamento)

module.exprts = Pensamento