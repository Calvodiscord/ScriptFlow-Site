const express = require('express');
const mongoose = require('mongoose');
// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// --- INÍCIO DA CORREÇÃO ---
const corsOptions = {
    // A URL EXATA do seu site que está no navegador
    origin: 'https://scriptflow-site-1.onrender.com', 
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// --- FIM DA CORREÇÃO ---

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
