const db = require('../../config/db')

module.exports = {
    async perfis() {
        return await db('perfis')
                        .then(res => res)
                        .catch(err => console.log(err.sqlMessage))
    },
    async perfil(_, { filtro }) {
        if (!filtro) return null;

        const {id, nome} = filtro;

        if (id) {
            return await db('perfis').where({id: id}).first()
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))
        } else if (nome) {

            return await db('perfis').where({nome: nome}).first()
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))
        } else {
            return -1
        }
        
    }
}