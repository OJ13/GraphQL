const db = require('../../config/db')
const { perfil: ObterPerfil } = require('../Query/perfil')
const { usuario: ObterUsuario } = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const usuarioExistente = await db('usuarios').where({ email: dados.email}).first();

            if (usuarioExistente) {
                throw new Error("Usuário já existente")
            }

            const idPerfis = [];
            if (dados.perfis) {
                for(perfilFitro of dados.perfis) {
                    const perfil = await ObterPerfil(_, { filtro: { ...perfilFitro } });

                    if (perfil) {
                        idPerfis.push(perfil.id);
                    }
                }
            }

            delete dados.perfis

            const [id] = await db('usuarios').insert({ ...dados }).then(res => res)

            for(perfil_id of idPerfis) {
                await db('usuarios_perfis').insert({ perfil_id, usuario_id: id })
            }

            return db('usuarios').where({ id }).first();
        } catch (e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao criar Usuário")
        }
    },
    async excluirUsuario(_, { filtro }) {
        try {
            const usuarioExistente = await ObterUsuario(_, { filtro })

            if (usuarioExistente) {
                await db('usuarios_perfis').where({ usuario_id: usuarioExistente.id }).delete();
                await db('usuarios').where({ id: usuarioExistente.id }).delete()
            } else {
                throw new Error("Usuário não encontrado para exclusão")
            }
            return usuarioExistente
        } catch (e) {
            console.log(e.sqlMessage)
            throw new Error("Erro ao excluir Usuário")
        }
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