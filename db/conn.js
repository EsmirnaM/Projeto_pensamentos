const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('pensamentos', 'root','semsenha',  {
    host: 'localhost',
    dialect: 'mysql',
    port:'4407',
    
   
})

try {
    
    sequelize.authenticate()
    console.log('conectamos ao sequelize')
} catch (error) {
    console.log('Não foi possível conectar')
}

module.exports = sequelize