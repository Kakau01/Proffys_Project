import React, { InputHTMLAttributes } from "react";

import './styles.css';

//tipando propriedades para o Input
//InputHTMLAtributes<HTMLInputElement> - fornece propriedades e métodos especiais

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;

}


const Input: React.FC<InputProps> = ({label, name, ...rest}) => {
    return(

        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" name="" id={name} {...rest}/>
        </div>

    );
}

export default Input;