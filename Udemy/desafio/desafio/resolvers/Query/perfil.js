const db = require('../../config/db')

module.exports = {
    async perfis() {
        try {
            return await db('perfis')
                        .then(res => res)
        } catch (e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao buscar perfis");
        }
    },
    async perfil(_, { filtro }) {
        if (!filtro) return null;

        const {id, nome} = filtro;

        try {
            if (id) {
                return await db('perfis').where({id: id}).first()
                                .then(res => res)
            } else if (nome) {
    
                return await db('perfis').where({nome: nome}).first()
                                .then(res => res)
            } else {
                return -1
            }
        } catch (e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao buscar perfil - Perfil não encontrado");
        }
    }
}