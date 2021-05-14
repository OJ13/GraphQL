const db = require('../../config/db')

module.exports = {
    async usuarios() {
        try {
            return await db('usuarios')
                        .then(res => res)
        }catch(e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao buscar usuários");
        }
    },
    async usuario(_, { filtro }) {
        try {
            if (!filtro) return null
        
            const { id, email} = filtro;

            if (id) {
                return await db('usuarios').where({id : id}).first()
                                .then(res => res)
            } else if (email) {
                return await db('usuarios').where({email: email}).first()
                                .then(res => res)
            } else {
                return -1
            }
        } catch(e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao buscar usuário");
        }
        
    },
}