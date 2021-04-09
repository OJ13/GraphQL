const db = require('../config/db')

/*
const novoPerfil = {
    nome: 'visitante',
    rotulo: 'Visitante'
};

//db(nomeDaTabela)              
db('perfis').insert(novoPerfil)
            .then(res => console.log(res)) //then -> Promisse
            .catch(err => console.log(err.sqlMessage))
            .finally(() => db.destroy());   //para parar no Code runner
            //Não é necessário deixar isso(destroy) na aplicação, 
            //uma vez que já há configuração de pool de conexões
*/

const perfilSU = {
    nome: 'root' + Math.random(),
    rotulo: 'Super Usuário'
}
//Outra forma de fazer insert
db.insert(perfilSU).into('perfis')
    .then(res => res[0])
    .then(id => `O código gerado foi ${id}`)
    .then(resposta => console.log(resposta))
    .catch(err => console.log(err.sqlMessage))
    .finally(() => db.destroy());





