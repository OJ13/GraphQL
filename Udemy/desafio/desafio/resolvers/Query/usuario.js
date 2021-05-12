const db = require('../../config/db')

module.exports = {
    async usuarios() {
        return await db('usuarios')
                        .then(res => res)
                        .catch(err => console.log(err.sqlMessage))
    },
    async usuario(_, { filtro }) {
        if (!filtro) return null
        
        const { id, email} = filtro;

        if (id) {
            return await db('usuarios').where({id : id}).first()
                            .then(res => res)
                            .catch(err => console.log(err.sqlMessage))
        } else if (email) {
            return await db('usuarios').where({email: email}).first()
                            .then(res => res)
                            .catch(err => err.sqlMessage)
        } else {
            return -1
        }
        
    },
}