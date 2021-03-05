const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');

const usuarios = [{
    id: 1,
    nome: 'Rocky Balboa',
    email: 'rocky.balboa@email.com',
    idade: 40,
    perfil_id: 1
}, {
    id: 2,
    nome: 'Adonis Creed',
    email: 'adonis.creed@email.com',
    idade: 28,
    perfil_id: 1
},{
    id: 3,
    nome: 'Alan Harper',
    email: 'alan.harpera@email.com',
    idade: 39,
    perfil_id: 2
}, {
    id: 4, 
    nome: 'Gal Gadout',
    email: 'gal.gadout@email.com',
    idade: 25,
    perfil_id: 3
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

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto);
            } else {
                return produto.preco;
            }
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real;
        },
        perfil(usuario) {
            const perfilId = perfis.filter(p => p.id === usuario.perfil_id);
            return perfilId ? perfilId[0] : null;
        }
    },
    Query : {
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
};

const server = new ApolloServer({
    typeDefs: importSchema('./schema/index.graphql') , 
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`);
})