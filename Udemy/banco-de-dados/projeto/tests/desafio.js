const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {
    const verificarUsuario = await db('usuarios').where({ email: email }).first()
    let user    
    if (verificarUsuario) {
        user = await db('usuarios').where({ id: verificarUsuario.id })
                    .update({ nome : nome, email : email, senha : senha })
                    .then(() => console.log(`Usuário  do id: ${verificarUsuario.id} alterado com Sucesso`))
                    .catch(err => console.log(err.sqlMessage))

        user = await db('usuarios').where({ id: verificarUsuario.id }).first();
    } else {
        const novoUsuario = {
            nome: nome, email: email, senha: senha
        }
        user = await db('usuarios').insert(novoUsuario)
                                    .then((res) => res)
                                    .then('Novo usuário criado com Sucesso')
                                    .catch(err => console.log(err.sqlMessage))
    }
    return user;
}

async function salvarPerfil(nome, rotulo) {
    const verificarPerfil = await db('perfis').orWhere({ nome : nome }).orWhere({ rotulo : rotulo }).first()
    let perfil
    if (verificarPerfil) {
        await db('perfis').where({ id: verificarPerfil.id })
                .update({
                    nome: nome, rotulo: rotulo
                })
                .then(() => console.log(`Perfil de id: ${verificarPerfil.id} alterado com Sucessso`))
                .catch(err => console.log(err.sqlMessage))

        perfil = await db('perfis').where({ id: verificarPerfil.id }).first()
    } else {
        const novoPerfil = { nome : nome, rotulo : rotulo };
        perfil = await db('perfis').insert(novoPerfil)
                            .then((res) => res)
                            .then(() => console.log('Novo perfil Criado com Sucesso'))
                            .catch(err => console.log(err.sqlMessage))
    }

    return perfil
}

async function adicionarPerfis(usuario, ...perfis) {
    const verificaUsePerfil = db('usuarios_perfis').where({ usuario_id: usuario.id}).first()
    if (verificaUsePerfil) {
        await db('usuarios_perfis')
                .where({ usuario_id : usuario.id })
                .delete()
    }
    
    for (perfil of perfis) {
        await db('usuarios_perfis').insert({ usuario_id : usuario.id, perfil_id: perfil.id })
    }
}

async function executar() {
    //const usuario1 = await salvarUsuario('Rocky Balboa', 'rocky.balboa@email.com', '123456')
    // const usuario2 = await salvarUsuario('Apollo Creed', 'apolo.creed@email.com', '123456')
    // const usuario3 = await salvarUsuario('Adrienne', 'adrienne.balboa@email.com', '123456')
     const usuario4 = await salvarUsuario('Adonis Creed', 'adonis.creed@email.com', '123456')
     const perfilA = await salvarPerfil('adm', 'Administrador')
     const perfilB = await salvarPerfil('rh', 'Pessoal')
     const perfilC = await salvarPerfil('finc', 'financeiro')
     const perfilD = await salvarPerfil('user', 'usuario')

    //  console.log(usuario1)
    console.log(usuario4)
    console.log(perfilA)
    console.log(perfilB)

     await adicionarPerfis(usuario4, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())