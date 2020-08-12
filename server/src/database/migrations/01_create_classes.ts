//Tabela com as informações das aula

//A table classes sempre pertencerá a um usuario, ou seja o professor que esta dando aquela aula
import Knex from "knex";

export function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        //campos da tablea
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //Criando relacionamento da tabela classes com a users
        //Gera uma foreign key
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            //O que acontecera com o id(user_id) da tabela classes se o id da tabela usuario for alterado
            //CASCADE - reflete a alteração em todos os lugares que dependem daquela informação
            .onUpdate('CASCADE')
            //O que acontecera com as aulas do professor caso ele seja deletado da platforma
            //CASCADE - Deleta todas as aulas do professor
            .onDelete('CASCADE');

    });
}

export function down(knex: Knex){
    return knex.schema.dropTable('classes');
}

