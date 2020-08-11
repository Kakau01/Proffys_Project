// Arquivo - Componente onde colocarei as rotas

import React from "react";
//Importando o react-router-dom
//BrowserRouter - tipo de roteamento
//Route - será cada página da aplicação
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import TeacherList from "./pages/TeacherList";
import TeacherForm from "./pages/TeacherForm";

//Criando o componente Routes
function Routes() {
    return(
        <BrowserRouter>
            {/* path - endereco que o usuario precisa acessar no browser */}
            {/* component - é o componente que mostrar quando o usuario acessa esse endereço */}
            {/* exact - propriedade que só mostrara a rota se ela for exatamente igual ao que ta escrito */}

            {/* Landing Page */}
            <Route path="/" exact component={Landing}/>

            {/* TeacherList */}
            <Route path="/study" component={TeacherList}/>

            {/* TeacherForm */}
            <Route path="/give-classes" component={TeacherForm}/>
        </BrowserRouter>
    )
}

export default Routes;