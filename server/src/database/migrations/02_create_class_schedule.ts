//Tabela que vai armazenar os horarios disponiveis e dias da semana

import Knex from "knex";

export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        //vai de 0 a 6 e representa os dias da semana - 0: Domingo...
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        //relacionamento da tabela class_schedule com a classes
        //O cronograma tem que estar relacionado com uma aula
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

    });
    
}

export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
}
