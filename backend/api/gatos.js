const GatosController = require('../controller/gatos'); // Ajuste o caminho conforme necessário

class GatosApi {
    async criarGatos(req, res) {
        try {
            const gato = await GatosController.criarGatos(req.body);
            return res.status(201).send(gato);
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }

    async listarGatos(req, res) {
        try {
            const gatos = await GatosController.obterGatos();
            return res.status(200).send(gatos);
        } catch (e) {
            return res.status(400).send({ error: 'Erro ao listar gatos' });
        }
    }

    async obterGato(req, res) {
        const { id } = req.params;

        try {
            const gato = await GatosController.obterGatoPorId(id);
            return res.status(200).send(gato);
        } catch (e) {
            return res.status(404).send({ error: e.message });
        }
    }

    async alterarGatos(req, res) {
        const { id } = req.params;

        try {
            const [updated] = await GatosController.atualizarGatos(id, req.body);
            if (!updated) {
                return res.status(404).send({ error: 'Gato não encontrado' });
            }
            const gatoAtualizado = await GatosController.obterGatoPorId(id);
            return res.status(200).send(gatoAtualizado);
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }

    async deletarGatos(req, res) {
        const { id } = req.params;

        try {
            const deleted = await GatosController.deletarGatos(id);
            if (!deleted) {
                return res.status(404).send({ error: 'Gato não encontrado' });
            }
            return res.status(204).send(); // No Content
        } catch (e) {
            return res.status(400).send({ error: e.message });
        }
    }
}

module.exports = new GatosApi();
