const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa a aplicação Express
const app = express();

// --- CONFIGURAÇÃO DE CORS (Cross-Origin Resource Sharing) ---
// Esta é a parte crucial para permitir que seu frontend (hospedado no Render)
// possa fazer requisições para o seu backend (também no Render).
const corsOptions = {
    // IMPORTANTE: Substitua a URL abaixo pela URL real do seu SITE ESTÁTICO (frontend) no Render.
    // Exemplo: 'https://instagram-clone-client-yyyy.onrender.com'
    origin: 'SUA_URL_DO_FRONTEND_AQUI',
    optionsSuccessStatus: 200 // Para navegadores mais antigos
};

// Aplica as configurações de CORS em todas as rotas
app.use(cors(corsOptions));

// Middleware para permitir que o Express entenda requisições com corpo em JSON
app.use(express.json());

// Conexão com o banco de dados MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conexão com MongoDB estabelecida com sucesso.'))
  .catch(err => console.error('Falha ao conectar com o MongoDB:', err));

// --- ROTAS DA API ---
// Define as rotas principais da aplicação. Cada rota agrupa um conjunto de endpoints.
app.use('/api/auth', require('./routes/auth'));   // Rotas de autenticação (login, registro)
app.use('/api/users', require('./routes/users')); // Rotas de usuários (painel de admin, perfis, etc.)
app.use('/api/posts', require('./routes/posts')); // Rotas de posts (criar, feed, curtir, etc.)

// Define a porta em que o servidor irá rodar.
// Ele usará a porta definida pelo ambiente do Render (process.env.PORT)
// ou a porta 5000 se estiver rodando localmente.
const PORT = process.env.PORT || 5000;

// Inicia o servidor para ouvir requisições na porta definida
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
