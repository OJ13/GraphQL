const db = require('../config/db')

const novoUsuario = {
    nome: 'Rocky',
    email: 'rocky@empresa.com.br',
    senha: '123456'
}

//update... db('...').where({...}).update({...})

//async precisa do await
async function exercicio() {
    const { qtd } = await db('usuarios').count('* as qtd').first()

    if (qtd === 0) {
        await db('usuarios').insert(novoUsuario)
    }

    //Consultar
    let { id } = await db('usuarios').select('id').limit(1).first()

    //Alterar 
    await db('usuarios').where({ id: id })
            .update({ 
                nome: 'Rocky Balboa',
                email: 'rocky.balboa@email.com'
             })

    return db('usuarios').where({ id })
}

exercicio()
    .then(usuario => console.log(usuario))
    .finally(() => db.destroy())
