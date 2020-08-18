import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

//importando Imagens
import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

//importando css
import './styles.css';
import api from '../../services/api';


//Criando o componente Landing
function Landing() {
    //Ter um estado para guardar o total de conexoes
    //Vai inciar como 0, porque o processo de ir ate a api e buscar o valor demora um tempo
    const [totalConnections, setTotalConnectios] = useState(0);

    //disparar a funcao que vai fazer a chamada da nossa api assim que o componente for exibido em tela, ou seja quando o usuario acessar a tela LandingPage preciso disparar a requisicao que vai na api buscar o total de conexoes ja realizadas
    //useEffect: funcao, que tem 2 parametros: primeiro - funcao, o segundo - array de dependencias, quando quero disparar a primeira funcao, as informacoe squando forem alteradas vao disparar a primeira funcao
    //Funcao executar uma unica vez quando o componente for exibido em tela, deixo o array VAZIO
    useEffect(() => {
        //faz a conexao, aguarda ter a resposta e ai tenho a responsta disponiveld entro da funcao
        api.get('connections').then(response => {
            // console.log(response.data.total);
            const {total} = response.data;

            //recebe a mudanca de estado e depois transfere para a totalConnections
            setTotalConnectios(total);
        })
    }, []);


    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de estudos"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas" />
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    {/* Trazer do backend o total de requisicoes */}
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>


            </div>
        </div>
    );
}

export default Landing;