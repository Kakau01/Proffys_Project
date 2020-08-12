// Conexão com o banco de dados

import knex from "knex";

// modulo intregado dentro do node para poder caminhar entre a aplicacao
//Não tem necessidade de usarmos / barra
import path from "path";

const db = knex({
    client: 'sqlite3',
    connection: {
        // onde ficara armazenado o banco sqlite
        //dirname: retorna o diretorio que eu executo o dirname - no caso database
        //dentro do database eu vou criar um arquivo chamado 'database.sqlite'
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    //como sqlite não sabe o que jogar no valor dos campos que nao tenham sido preenchidos - NULL
    useNullAsDefault: true,

});

export default db;