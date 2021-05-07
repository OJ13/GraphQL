const db = require('../../config/db')

module.exports = {
    async perfis() {
        return await db('perfis')
                        .then(res => res)
                        .catch(err => console.log(err.sqlMessage))
                        .finally(() => db.destroy())
    },
    async perfil(_, { filtro }) {
        const {id, nome} = filtro;

        if (id) {
            return await db('perfis').where({id: id})
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))
                            .finally(() => db.destroy())
        } else if (nome) {
            return await db('perfis').where({nome: nome})
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))
                            .finally(() => db.destroy())
        } else {
            return -1
        }
        
    }
}