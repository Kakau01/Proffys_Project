// Pagina em que o usuario vai cadastrar um professor

import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

//Redirecionar o usuario de uma pagina para a outra depois que uma acao acontece
import { useHistory } from "react-router-dom";

import warningIcon from '../../assets/images/icons/warning.svg';
// importando estilo
import './styles.css';
import api from '../../services/api';

function TeacherForm() {
    //ir para Landing apos submit o form
    const history = useHistory();

    //Lidando com formulario
    //Anotar cada valor do input em um estado
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    //O react só observa a varivel se ela foi criada utilizando o conceito de estado - useState
    //useState - não retorna somente a variavel useState , mais sim 2 coisas - no formato de array - primeira: são os items(scheduleItems) e a segunda coisa - funcao que substituira o valor do scheduleItem
    //Quando usa o estado do react não podemos fazer alteracoes diretamente na variavel do estado
    const [scheduleItems, setScheduleItems] = useState([
        //passo o valor inicial da minha schedule Items
        //Inicializando com um valor vazio
        { week_day: 0, from: '', to: '' },

    ]);


    //Funcao do select week_day
    //field: nome do campo
    //essa funcao vai percorrer o array dos schedule items até pegar os index...
    //por exemplo se o index for 0 vou pegar o elemento com o index 0, depois procurar o field, se é week day, from ou to e atualizo o valor
    function setScheduleItemValue(position: number, field: string, value: string) {
        //devido a imutabilidade, preciso cria rum novo array com as alteracoes que eu quero
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index )=> {
            //Se o item que estou percorrendo no map for = ao item que eu quero alterar
            if(index === position){
                //retornarei um objeto copiando tudo que eu tenho dentro de scheduleItem, porem sobreescrevendo o novo field com o novo valor
                //[field]: para dizer que o nome da varivel no caso é week_day e nao field
                return {...scheduleItem, [field]: value}

            }
            //retorna o scheduleItem igual como ele existia anteriormente
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
        
    }


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

    //Funcao para testar se o formulario esta funcioanndo
    //Chamada quando o usuario der um submit no formulario
    //nao sabe qual o formato do evento portanto...
    function handleCreateClass(e: FormEvent ) {
        //fazendo cadastro no servidor
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            //Apos o cadastro ter sido feito com sucesso o usuario é redirecionado para a pagina principal(landing)
            history.push('/');
        }).catch((err) => {
            alert('Erro no cadastro')
        });
        //previne a atualizacao da pagina ao enviar o frmulario
        e.preventDefault();
        console.log({

        })
    }

    return (
        <div id="page-teacher-form" className="container">
            {/* Adicionando propriedade title para a header */}
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição."
            />

            <main>
                {/* Quando o formulario for enviado a funcao handleCreateClass sera chamada */}
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            //Toda vez que esse input mudar o seu valor, faremos algo com o novo valor
                            //e.target.value: pega o valor do texto digitado
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input
                            name="avatar"
                            label="Link da sua foto"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}

                        />

                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />

                        <TextArea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}

                        />


                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="name"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
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
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />



                    </fieldset>

                    <fieldset>
                        <legend>Horários disponiveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {/* Dando funcionalidade para o botao adicionar novo horario */}
                        {/* No react para colocar mais items, eu so preciso colocar mais posicoes dentro do array */}
                        {/* Alem do item o map retorna como segundo parametro o INDEX que é a posicao do item no array original */}
                        {scheduleItems.map((scheduleItem, index) => {
                            //retornar o HTML para cada item
                            return (
                                //1 dia da semana por item
                                //portanto a informação unica é o dia da semana
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        //Quando for ouvir a alteracao no meu week_day
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}

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