const { usuarios, perfis } = require('../data/db');

module.exports = {
    ola() {
        return 'Hello Word'
    },
    horaAtual() {
        return new Date;
    },
    usuarioLogado(obj) {
        console.log(obj);
        return {
            id: 1,
            nome: 'Rocky Balboa',
            email: 'rocky.balboa@email.com',
            idade: 30,
            salario_real: 1000.25,
            vip: true
        }
    },
    produtoEmDestaque() {
        return {
            nome: 'Notebook Sony Vaio',
            preco: 500.98,
            desconto: 0.5
        }
    },
    numerosMegaSena() {
        const crescente = (a, b) => a - b;
        return Array(6).fill(0)
                    .map(n => parseInt(Math.random() * 60 + 1))
                    .sort(crescente);
    },
    usuarios() {
        return usuarios;
    },
    usuario(_, args) {
        const selecionado = usuarios
                                .filter(u => u.id === args.id);

        return selecionado ? selecionado[0] : null;
    },
    // usuario(_, { id }) { //Destruct de args
    //     const selecionado = usuarios
    //                             .filter(u => u.id === id);

    //     return selecionado ? selecionado[0] : null;
    // }
    perfis() {
        return perfis;
    },
    perfil(_, args) {
        const perf = perfis.filter(p => p.id === args.id);
        return perf ? perf[0] : null;
    }
}
