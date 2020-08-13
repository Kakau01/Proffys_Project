// Pagina em que o usuario vai cadastrar um professor

import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
// importando estilo
import './styles.css';

function TeacherForm() {


    //O react só observa a varivel se ela foi criada utilizando o conceito de estado - useState
    //useState - não retorna somente a variavel useState , mais sim 2 coisas - no formato de array - primeira: são os items(scheduleItems) e a segunda coisa - funcao que substituira o valor do scheduleItem
    //Quando usa o estado do react não podemos fazer alteracoes diretamente na variavel do estado
    const [scheduleItems, setScheduleItems] = useState([
        //passo o valor inicial da minha schedule Items
        //Inicializando com um valor vazio
        { week_day: 0, from: '', to: '' },
    
    ]);



    //Funcao quando o usuario clicar no botao novo horario
    function addNewScheduleItem() {
        //ADICIONANDO UM NOVO ITEM QANDO O USUARIO CLICAR NO BOTAO - COLOCANDO UM OBJETO

        //Copiar o array que eu já tenho e incluir uma nova info no final dele
        setScheduleItems([
            //copia todos os items doa array dentro de um novo array
            ...scheduleItems,
            //adiciono o novo item da array, que é o novo schedulItem - objeto
            { week_day: 0, from: '', to: '' }

        ]);

    }

    return (
        <div id="page-teacher-form" className="container">
            {/* Adicionando propriedade title para a header */}
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                <form action="">
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                        />

                        <Input
                            name="avatar"
                            label="Link da sua foto"

                        />

                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                        />

                        <TextArea
                            name="bio"
                            label="Biografia"

                        />


                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="name"
                            label="Matéria"
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciencias', label: 'Ciencias' },
                                { value: 'Educacao Fisica', label: 'Educacao Fisica' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'Historia', label: 'Historia' },
                                { value: 'Portugues', label: 'Portugues' },
                                { value: 'Quimica', label: 'Quimica' },
                            ]}
                        />

                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                        />



                    </fieldset>

                    <fieldset>
                        <legend>Horários disponiveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {/* Dando funcionalidade para o botao adicionar novo horario */}
                        {/* No react para colocar mais items, eu so preciso colocar mais posicoes dentro do array */}
                        {scheduleItems.map(scheduleItem => {
                            //retornar o HTML para cada item
                            return (
                                //1 dia da semana por item
                                //portanto a informação unica é o dia da semana
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabado' },
                                        ]}

                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                    />

                                </div>
                            );
                        })}


                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>

            </main>

        </div>
    )
}

export default TeacherForm;