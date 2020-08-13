//Armazenara a informacao de que se o usuario tentou entrar em contato com o professor
//Vai anotar o id do professor que tentei entrar em contato e hora que isso aconteceu


import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        //Relacionamento - conexao com qual professor
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        //Quando houve a conexão
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}
export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}