const usuarios = [{
    id: 1,
    nome: 'Rocky Balboa',
    email: 'rocky.balboa@email.com',
    idade: 40,
    perfil_id: 1,
    status: 'ATIVO'
}, {
    id: 2,
    nome: 'Adonis Creed',
    email: 'adonis.creed@email.com',
    idade: 28,
    perfil_id: 1,
    status: 'INATIVO'
},{
    id: 3,
    nome: 'Alan Harper',
    email: 'alan.harpera@email.com',
    idade: 39,
    perfil_id: 2,
    status: 'BLOQUEADO'
}, {
    id: 4, 
    nome: 'Gal Gadout',
    email: 'gal.gadout@email.com',
    idade: 25,
    perfil_id: 3,
    status: 'BLOQUEADO'
}];

const perfis = [
    {
        id: 1,
        nome: 'administrador'
    },
    {
        id: 2,
        nome: 'usuario'
    },
    {
        id: 3,
        nome: 'supervisor'
    }
]

module.exports = { usuarios, perfis }