const { usuarios, perfis } = require('../data/db');

function indiceUsuario(filtro) {
    if(!filtro) return -1

    const { id, email} = filtro
    if(id) {
        return usuarios
                .findIndex(u => u.id === id);
    } else if(email) {
        return usuarios
                .findIndex(u => u.email === email);
    }
    return -1;
}

function indicePerfil(filtro) {
    if(!filtro) return -1

    const { id, nome } = filtro
    if(id) {
        return perfis.findIndex(p => p.id === id);
    } else if (nome) {
        return perfis.findIndex(p => p.nome === nome);
    } else {
      return -1;  
    }
}

module.exports = {
    indiceUsuario,
    indicePerfil   
}