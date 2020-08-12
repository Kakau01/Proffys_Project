//Da onde tudo irá partir ***PRINCIPAL ARQUIVO***

import express from 'express';

//Tudo vai partir desse app, rotas
const app = express();

//por padrão o express não entende Json, PORTANTO quando chega um info
//APP introduza um plugin que é o express.json
app.use(express.json());


//para testar vou definir a primeira rota
//quando o usuario entrar nessa rota, a funcao vai fazer executar algo
//resquest - informacoes sobre a resquisicao - cabecalho e corpo
//response - resposta que vou devolver do meu backend par ao frontend
app.get('/', (request, response) => {
    
    return response.json({ message: 'Hello World'});
});
//faz a aplicacap ouvir uma requisicao http
//quando nao temos a porta quer dizer que ela é a 80 - padrao
//localhost://3333
app.listen(3333);