const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do CORS para permitir requisições do seu frontend
const corsOptions = {
    // IMPORTANTE: Verifique se esta é a URL correta do seu frontend no Render
    origin: 'https://scriptflow-site-1.onrender.com', 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware para o Express entender JSON
app.use(express.json());

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB conectado com sucesso'))
.catch(err => {
    console.error('Erro de conexão com o MongoDB:', err);
    process.exit(1); // Encerra a aplicação se não conseguir conectar ao DB
});

// Rotas da API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Define a porta do servidor
const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));```
