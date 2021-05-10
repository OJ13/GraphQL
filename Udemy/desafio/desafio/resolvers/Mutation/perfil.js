const db = require('../../config/db')

module.exports = {
    async novoPerfil(_, { dados }) {
        const perfilExistente = await db('perfis').where({nome: dados.nome}).first()

        if (perfilExistente) {
            throw new Error("Perfil já Existente")
        }

        const novo = {
            nome: dados.nome,
            rotulo: dados.rotulo
        }

        await db('perfis').insert(novo)
                .then(res => res)
                .catch(err => console.log(err.sqlMessage))
                .finally(() => db.destroy())
    },
    async excluirPerfil(_, { filtro }) {
        const perfilExistente = await db('perfis').where({id: filtro.id}).first()

        if (perfilExistente) {
            throw new Error("Perfil não encontrado para exclusão")
        }

        await db('perfis').where({ id : perfilExistente.id }).delete()
                    .then((res) => console.log(res))
                    .catch(err => console.log(err.sqlMessage))
                    .finally(() => db.destroy())
    },
    async alterarPerfil(_, { filtro, dados }) {
        const perfilExistente = await db('perfis').where({id: filtro.id}).first()

        if (perfilExistente) {
            throw new Error("Perfil não encontrado para edição")
        }

        await db('perfis').where({ id: perfilExistente.id })
                    .update({
                        nome: dados.nome,
                        rotulo: dados.rotulo
                    })
                    .then((res) => console.log(res))
                    .catch(err => console.log(err.sqlMessage))
                    .finally(() => db.destroy())
    }
}