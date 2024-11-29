const jwt = require('jsonwebtoken');
const user = require('../controller/user');

function authMiddleware(roles = []) {
    return async (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "Usuário não está logado" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        jwt.verify(token, 'MeuSegredo123!', async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Token inválido ou expirado" });
            }

            try {
                const userLogged = await user.findUser(decoded.id);
                if (!userLogged) {
                    return res.status(404).json({ error: "Usuário não encontrado" });
                }

                if (roles.length && !roles.includes(userLogged.role)) {
                    return res.status(403).json({ error: "Usuário sem permissão" });
                }

                req.user = userLogged;
                req.session = decoded;
                next();
            } catch (error) {
                return res.status(500).json({ error: "Erro interno do servidor" });
            }
        });
    }
}

module.exports = authMiddleware;
