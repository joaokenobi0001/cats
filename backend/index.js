const express = require('express');
const userRouter = require('./src/routes/user');
const characterRouter = require('./src/routes/character');
const database = require('./src/config/database');

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/character", characterRouter);

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(3000, () => {
            console.info('Servidor rodando na porta 3000')
        })
    })
    .catch((e) => {
        console.error("Erro ao conectar com o banco: ", e)
    })
