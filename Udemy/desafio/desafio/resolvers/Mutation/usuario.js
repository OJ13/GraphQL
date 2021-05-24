const db = require('../../config/db')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const usuarioExistente = await db('usuarios').where({ email: dados.email}).first();

            if (usuarioExistente) {
                throw new Error("Usuário já existente")
            }

            const novoUsuario = {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                perfis: dados.perfis
            }

            await db('usuarios').insert(novoUsuario)
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))
                            .finally(() => db.destroy())

        } catch (e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao criar Usuário")
        }
    },
    async excluirUsuario(_, { filtro }) {
        const usuarioExistente = await db('usuarios').where({ email: filtro.email}).first();

        if (usuarioExistente) {
            throw new Error("Usuário não encontrado para exclusão")
        }

        await db('usuarios').where({ id: usuarioExistente.id }).delete()
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))

    },
    async alterarUsuario(_, { filtro, dados }) {
        const usuarioExistente = await db('usuarios').where({ email: filtro.email}).first();

        if (usuarioExistente) {
            throw new Error("Usuário não encontrado para edição")
        }

        await db('usuarios').where({ id: usuarioExistente.id })
                        .update({
                            nome: dados.nome,
                            email: dados.email,
                            senha: dados.senha,
                            perfis: dados.perfis                
                        })
                        .then(res => res)
                        .catch(err => console.log(err.sqlMessage))

    }
}