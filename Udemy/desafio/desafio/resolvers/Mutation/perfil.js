const db = require('../../config/db')
const { perfil: ObterPerfil } = require('../Query/perfil')

module.exports = {
    async novoPerfil(_, { dados }) {
        const perfilExistente = await db('perfis').where({nome: dados.nome}).first()

        if (perfilExistente) {
            throw new Error("Perfil já Existente")
        }
        // const [ id ] =  await db('perfis').insert({ ...dados })
        //                         .then(res => res)
        //                         .then(res => console.log(res))   
        //                         .catch(err => console.log(err.sqlMessage))
        // return await db('perfis').where({ id }).first()
        
        try {
            const [ id ] = await db('perfis').insert({ ...dados })

            return db('perfis').where({ id }).first()
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirPerfil(_, { filtro }) {
        try {
            const perfilExistente = await ObterPerfil(_, { filtro })

            if (!perfilExistente) {
                throw new Error("Perfil não encontrado para exclusão")
            }

            await db('perfis').where({ id : perfilExistente.id }).delete()
                        .then((res) => console.log(res))
                        .catch(err => console.log(err.sqlMessage))
                        
        } catch (e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao excluir Perfil")
        }
    },
    async alterarPerfil(_, { filtro, dados }) {
        const perfilExistente = await db('perfis').where({id: filtro.id}).first()

        if (!perfilExistente) {
            throw new Error("Perfil não encontrado para edição")
        }

        await db('perfis').where({ id: perfilExistente.id })
                    .update({
                        nome: dados.nome,
                        rotulo: dados.rotulo
                    })
                    .then((res) => console.log(res))
                    .catch(err => console.log(err.sqlMessage))
    }
}