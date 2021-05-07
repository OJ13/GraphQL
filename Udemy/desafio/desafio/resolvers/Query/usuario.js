const db = require('../../config/db')

module.exports = {
    async usuarios() {
        return await db('usuarios')
                        .then(res => res)
                        .catch(err => console.log(err.sqlMessage))
                        .finally(() => db.destroy())
    },
    async usuario(_, { filtro }) {
        const { id, email} = filtro;

        if (id) {
            return await db('usuarios').where({id : id})
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))
                            .finally(() => db.destroy())
        } else if (email) {
            return await db('usuarios').where({email: email})
                            .then(res => res)
                            .catch(err => err.sqlMessage)
                            .finally(() => db.destroy())
        } else {
            return -1
        }
        
    },
}