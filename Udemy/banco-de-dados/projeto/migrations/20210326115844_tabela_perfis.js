
exports.up = function(knex) {
  return knex.schema.createTable('perfis', table => {
      table.increments('id').primary()
      table.string('nome').notNull().unique()
      table.string('rotulo').notNull()
  }).then(function() {
      return knex('perfis').insert([
          { nome: 'admin', rotulo: 'Administrador' },
          { nome: 'master', rotulo: 'Master' },
          { nome: 'usuario', rotulo: 'Usuario' }
      ])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('perfis')
};
