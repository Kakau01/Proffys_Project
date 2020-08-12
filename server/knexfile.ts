import path from "path";

//knex nao entende export default
module.exports = {
    client: 'sqlite3',
    connection: {
        //caminho até chegar no arquivo 'database.sqlite'
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};