import axios from 'axios';

//conectando com os servidor
const api = axios.create({
    //endereco do backend, só o base, que se repetira em todas as rotas
    baseURL: 'http://localhost:3333',
});

//com isso já vamos conseguir fazer as requisicoes
export default api;

