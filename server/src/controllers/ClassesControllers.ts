import { Request, Response } from "express";

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";
//Criando interface para falar o tipo do ScheduleItem
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    //geralmente quando queremos fazer a listagem chamamos o método de index
    async index(request: Request, response: Response){
        //Listagem das aulas
        //Os filtros vao vir do request.query;
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;



        //Condicao se o usuario não informou o dia da semana, ou a materia ou o horario que ele quer marcar a aula, retorna um erro
        if(!filters.week_day || !filters.subject || !filters.time){
            return response.status(400).json({
                error: 'Missing filter to search classes'
            });
        }

        //converter o time em minutos
        const timeInMinutes = convertHourToMinutes(time);

        // console.log(timeInMinutes);

        //fazer a query no banco de dados
        const classes =  await db('classes')
        //listar so as aulas da materia que to recebendo no filter.subject
            //verificar se o professor tem agenda disponivel exatamente no horario e na data que o usuario esta tentando enviar
            .whereExists(function() {
                //selecionar todos os campos da tabela class_schedule
                this.select('class_schedule.*')
                    .from('class_schedule')
                    //whereRaw - escreve o where do zero
                    //procurar dentro da tabela class_schedule todos os agendamentos que tem classe_id = classes
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    //buscar somente os class_schedule em que o dia da semana for igual ao que eu to querendo filtrar
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    //Espero que o professor comece a trabalhar antes ou pelo mesmo no mesmo horario ao horario que estou querendo ter uma aula
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    //Sinal é maior porque se o professor para de trabalhar as 12 horas o usuario so podera marcar horario antes das 12
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])

            })
            .where('classes.subject', '=', subject)
            //incluir os dados do usuario - inner join
            .join('users', 'classes.user_id', '=', 'users.id')
            //selecionar todos os dados da tabela classes e todos os dados da tabela users
            .select(['classes.*', 'users.*']);


        return response.json(classes);


    }

    async create(request: Request, response: Response) {
        //Dados vão vir atraves do corpo da rquisicao
        //O data contem todas as informações que o usuario enviou portanto podemos usar desestruturação
        // const data = request.body;
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        //utilizando esquema de transaction
        //Com isso nos lugares do db eu susbtituo por trx
        const trx = await db.transaction();
        //tente fazer isso
        try {
            //Inserindo o usuario no banco de dados
            //cada operacao no banco de dados demora um pouco para acontecer, famosa promise, portandto iremos usar o async
            //primeiro parametro -> qual a tabela que fara a insercao do dados
            //O user_id vai nascer desse insert - a query abaixa retorna o id do usuario que inseri
            //insert - serve para inserir mais de um usuario ao mesmo tempo - porem ele retorna a lista de ids que foram inserida
            //como sei que so adicionei um usuario, portanto eu preciso pegar a primeira posicao do array
            const insertedUsersId = await trx('users').insert({
                //colunas que quero inserir na tabela de usuario
                name,
                avatar,
                whatsapp,
                bio,
            });

            //Pegando o id do usuario que eu criei
            //pego a funcao que retorna os ids do usuario na posicao 0;
            const user_id = insertedUsersId[0];

            //Inserindo a aula(classes) no banco de dados
            //preciso pegar o user_id
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                //passando a id do usuario inserido
                user_id,
            });

            //Inserindo o schedule - precisarei da id de classes portanto farei igual fiz acima
            //Salvarei o horario sempre em minutos
            //Para cada um dos horarios vou converter totalmente em minutos, para ser inteiro
            const class_id = insertedClassesIds[0];

            //Pegar cada item do schedule e tranformar em um novo objeto
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                //quando for usar a variavel scheduleItem o vscode ja sabe o que tem dentro dela
                return {
                    class_id,
                    //nao tem a necessidade de converte
                    week_day: scheduleItem.week_day,
                    //convertendo form e to para inteiros(minutos)
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),

                };
            });

            //inserindo o class_schedule no banco de dados
            //insiro so o class_schedule pois ele ja esta no formato que o banco espera
            await trx('class_schedule').insert(classSchedule);

            //Só nesse momento ele faz as alteracoes no banco, caso tudo esteja correto
            await trx.commit();

            //response de sussesso - status 201: criado com sucesso
            return response.status(201).send();
        }
        //caso de erro, capture o erro e retorne a mensagem de erro
        catch (err) {
            //quando usamos transaction no catch é fundamental desfazer qualquer alteracao que tenha acontecido no banco nesse meio tempo
            await trx.rollback();
            // console.log(err);
            return response.status(400).json({
                error: 'Unexpected error while creating new class.'
            })
        }

    }
}