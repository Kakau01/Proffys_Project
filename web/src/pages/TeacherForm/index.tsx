// Pagina em que o usuario vai cadastrar um professor

import React from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
// importando estilo
import './styles.css';

function TeacherForm() {
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
                        <button>+ Novo horário</button>
                        </legend>

                        <div className="schedule-item">
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