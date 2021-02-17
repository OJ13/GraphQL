const { ApolloServer, gql } = require('apollo-server');

const usuarios = [{
    id: 1,
    nome: 'Rocky Balboa',
    email: 'rocky.balboa@email.com',
    idade: 40
}, {
    id: 2,
    nome: 'Adonis Creed',
    email: 'adonis.creed@email.com',
    idade: 28
},{
    id: 3,
    nome: 'Alan Harper',
    email: 'alan.harpera@email.com',
    idade: 39
}, {
    id: 4, 
    nome: 'Gal Gadout',
    email: 'gal.gadout@email.com',
    idade: 25
}]

const typeDefs = gql`
    # Pontos de Entrada da sua  API
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Query {
        ola: String
        horaAtual: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
    }
`;

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
        }
    }
};

const server = new ApolloServer({
    typeDefs, 
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`);
})