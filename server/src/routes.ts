import express from "express";
import ClassesController from "./controllers/ClassesControllers";
import ConnectionsController from "./controllers/ConnectionsController";


//Router: Modulo de roteamento do express
const routes = express.Router();

//criando uma nova instancia do ClassesControllers
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

//para testar vou definir a primeira rota
//quando o usuario entrar nessa rota, a funcao vai fazer executar algo
//resquest - informacoes sobre a resquisicao - cabecalho e corpo
//response - resposta que vou devolver do meu backend par ao frontend
//*** Criando a primeira rota - Criacao da aula -> cria aula, usuario e schedule da aula
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);


export default routes;