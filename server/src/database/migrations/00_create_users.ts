//Tabela de usuario - Informações do usuario -  Quando o professor for se cadastrar

import Knex from "knex";

// exportando duas funcoes

//Faço alteraçoes - Quais alterações queremos realizar no banco de dados
export async function up(knex: Knex){
    //criar uma nova tabela - users
    //segundo parametro é uma funcao que recebe como parametro a tabela que acabamos de criar  
    return knex.schema.createTable('users', table => {
        //colocando os campos
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });

}

//Desfaço alterações -  Voltar a alteração do campo e remover a tabela que criei
export async function down(knex: Knex){
    //deleta a tabela
    return knex.schema.dropTable('users');
} 