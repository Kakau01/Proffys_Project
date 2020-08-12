//Da onde tudo irá partir ***PRINCIPAL ARQUIVO***

import express from 'express';
import routes from './routes';

//Tudo vai partir desse app, rotas
const app = express();

//por padrão o express não entende Json, PORTANTO quando chega um info
//APP introduza um plugin que é o express.json
app.use(express.json());

//Apos declarar a rota e exportar no routes.ts
app.use(routes);



//faz a aplicacap ouvir uma requisicao http
//quando nao temos a porta quer dizer que ela é a 80 - padrao
//localhost://3333
app.listen(3333);