import React from "react";
import { Link } from "react-router-dom";

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';

//Definir o formato das tipagens de um objeto - propriedades do meu page header
interface PageHeaderProps {
    //propriedade obrigatoria - sem ? - com ? - não é obrigatoria
    title: string;
    description?: string;
}

//temos que dizer que o Page Header pode receber uma propriedade chamada title
//Fazer com o PageHeader saiba que ele precisa usar as propriedades
const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                {/* Recuperando o titulo */}
                <strong>{props.title}</strong>
{/* 
                Caso existe a propriedade description */}
                {props.description && <p>{props.description}</p>}

                {/* Adicionando o formulario a header */}
                {/* Mostra o conteudo que escrevi dentro do componente - propriedade automatica, portanto não precisa colocar dentro da interface */}
                {props.children}
            </div>



        </header>
    );
}

export default PageHeader;