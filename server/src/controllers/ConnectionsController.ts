import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionsController {
    //listar conexao
    async index(request: Request, response: Response) {
        //vai fazer um count em todos os registro e adicionar em uma coluna chamada totla
        const totalConnections = await db('connections').count('* as total ');

        //como sei que vai retornar uma linha so de registro tenho que pegar a primeira posicao da array
        const { total } = totalConnections[0];

        return response.json({ total });
    }

    //criar conexao
    async create(request: Request, response: Response) {
        //Para criar a conexao vamos pegar somente o id do usuario
        const { user_id } = request.body;

        //inserindo na tabela connections
        await db('connections').insert({
            user_id,
        });

        return response.status(201).send();
    }
}