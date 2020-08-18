// Pagina que vai mostrar a Lista de professores disponiveis

import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';



// importando estilo
import './styles.css';
import Select from '../../components/Select';
import Input from '../../components/Input';
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    //Estado que vai guardar os valores do filtro
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

   //Funcao que vai buscar os professores disponiveis
   async function searchTeachers(e: FormEvent) {
       //evitar a ação padrão do formulario de atualizar a pagina
       e.preventDefault();

       //Pega as informacoes da api
       const response = await api.get('classes', {
           params: {
               subject,
               week_day,
               time
           }
       });

       setTeachers(response.data);
       console.log(response.data)


   }

    return (
        <div id="page-teacher-list" className="container">
            {/* Adicionando propriedade title para a header */}
            {/* Incluindo um formulario dentro da Header */}
            <PageHeader title="Estes são os proffys disponíveis">
                <form onSubmit={searchTeachers} id="search-teachers">
                    <Select
                        name="subject"
                        label="Materia"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
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

                    <Select
                        name="week_Day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
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
                        type='time' 
                        name="time" 
                        label="Hora" 
                        value={time}
                        onChange={e => setTime(e.target.value)}

                                                
                        />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList;