const { perfis } = require('../data/db')

module.exports = {
    salario(usuario) {
        return usuario.salario_real;
    },
    perfil(usuario) {
        const perfilId = perfis.filter(p => p.id === usuario.perfil_id);
        return perfilId ? perfilId[0] : null;
    }
}
