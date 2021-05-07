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
        // implementar
    },
    async alterarPerfil(_, { filtro, dados }) {
        // implementar
    }
}