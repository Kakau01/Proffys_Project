// Pagina em que o usuario vai cadastrar um professor

import React from 'react';

// importando estilo
import './styles.css';
import PageHeader from '../../components/PageHeader';

function TeacherForm() {
    return (
        <div id="page-teacher-form" className="container">
            {/* Adicionando propriedade title para a header */}
            <PageHeader title="Que incrível que você quer dar aulas."/>
        </div>
    )
}

export default TeacherForm;