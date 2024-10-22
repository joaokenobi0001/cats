const express = require('express');
const cors = require('cors'); // Importa o pacote cors
const userRouter = require('./routes/user');

const database = require('./config/database');
const  gatosRouter = require('./routes/gatos');

const app = express();
app.use(express.json());
app.use(cors()); // Habilita CORS para todas as rotas

app.use("/api/v1/user", userRouter);
app.use("/api/v1/gatos", gatosRouter);



database.db
    .sync({ force: true })
    .then((_) => {
        app.listen(3000, () => {
            console.info('Servidor rodando na porta 3000');
        });
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e);
    });

module.exports = app;
