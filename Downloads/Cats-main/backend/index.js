const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user'); // Importando o arquivo de rotas do usuário
const database = require('./config/database'); // Certifique-se de que o arquivo de configuração do banco está correto
const gatosRouter = require('./routes/gatos'); // Importando as rotas de gatos

const app = express();

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());

// Configuração de CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001']; // Liste todas as origens permitidas
const corsOptions = {
    origin: (origin, callback) => {
        // Verifica se a origem da requisição está nas origens permitidas
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Permitir cookies se necessário
};

app.use(cors(corsOptions));

// Rotas da API
app.use("/api/v1/user", userRouter);  // Prefixo /api/v1/user para as rotas do usuário
app.use("/api/v1/gatos", gatosRouter);  // Prefixo /api/v1/gatos para as rotas de gatos

// Conexão com o banco de dados
database.db
    .sync({ force: false })  // Defina "force: false" para evitar a exclusão das tabelas em produção
    .then(() => {
        app.listen(3001, () => {
            console.info('Servidor rodando na porta 3001');
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
        process.exit(1);  // Encerra o servidor em caso de erro na conexão com o banco
    });

module.exports = app;

