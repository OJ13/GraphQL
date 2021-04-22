const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {
    const verificarUsuario = await db('usuarios').where({ email: email }).first()
    
    if (verificarUsuario) {
        await db('usuarios').where({ id: verificarUsuario.id })
                    .update({ nome : nome, email : email, senha : senha })
                    .then(() => console.log(`Usuário  do id: ${verificarUsuario.id} alterado com Sucesso`))
                    .catch(err => console.log(err.sqlMessage))
    } else {
        const novoUsuario = {
            nome: nome, email: email, senha: senha
        }
        await db('usuarios').insert(novoUsuario)
            .then('Novo usuário criado com Sucesso')
            .catch(err => console.log(err.sqlMessage))
    }
}

async function salvarPerfil(nome, rotulo) {
    const verificarPerfil = await db('perfil').orWhere({ nome : nome }).orWhere({ rotulo : rotulo }).first()

    if (verificarPerfil) {
        await db('pefil').where({ id: verificarPerfil.id })
                .update({
                    nome: nome, rotulo: rotulo
                })
                .then(() => console.log(`Perfil de id: ${verificarPerfil.id} alterado com Sucessso`))
                .catch(err => console.log(err.sqlMessage))
    } else {
        const novoPerfil = { nome : nome, rotulo : rotulo };
        await db('perfil').insert(novoPerfil)
                .then(() => console.log('Novo perfil Criado com Sucesso'))
                .catch(err => console.log(err.sqlMessage))
    }
}

async function adicionarPerfis(usuario, ...perfis) {

}

async function executar() {
    const usuario1 = await salvarUsuario('Rocky Balboa', 'rocky.balboa@email.com', '123456')
    const usuario2 = await salvarUsuario('Apollo Creed', 'apolo.creed@email.com', '123456')
    // const usuario2 = await salvarUsuario('Adrienne', 'adrienne.balboa@email.com', '123456')
    // const perfilA = await salvarPerfil('rh', 'Pessoal')
    // const perfilB = await salvarPerfil('finc', 'financeiro')

    //  console.log(usuario1)
    // console.log(usuario2)
    // console.log(perfilA)
    // console.log(perfilB)

    // await adicionarPerfis(usuario2, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())