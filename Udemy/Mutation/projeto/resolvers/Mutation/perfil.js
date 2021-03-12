const { perfis, proximoId } = require('../../data/db'); 
const { indicePerfil } = require('../../Util/Util');

module.exports = {
    novoPerfil(_, { dados }) {
        const perfilExistent = perfis.some(p => p.nome === dados.nome);
        if (perfilExistent) {
            throw new Error('Perfil Já Existente');
        }

        const novo = {
            id: proximoId(),
            nome: dados.nome
        }
        
        perfis.push(novo);
        return novo;
    },
    excluirPerfil(_, { filtro }) {
        const i = indicePerfil(filtro);

        if(i < 0) return null

        const excluidos = perfis.splice(i, 1);

        return excluidos ? excluidos[0] : null;
    },
    alterarPerfil(_, { filtro, dados }) {
        const i = indicePerfil(filtro);

        if(i < 0) return null

        const perfil = {
            ...perfis[i],
            ...dados
        }

        perfis.splice(i, 1, perfil);

        return perfil;
    }
}


    