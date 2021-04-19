const db = require('../config/db')

//excluir por Id
// db('usuarios').where({ id: 1})
//     .delete()
//     .then(res => console.log(res))
//     .finally(() => db.destroy())

//todos os perfis
db('perfis')
    .delete()
    .then(res => console.log(res))
    .finally(() => db.destroy())
