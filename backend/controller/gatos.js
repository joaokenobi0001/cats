const Gatos = require('../model/gatos'); // Ajuste o caminho conforme necessário
const fetch = require('node-fetch'); // Certifique-se de instalar este pacote

class GatosController {
    async criarGatos(data) {
        const gatoData = {
            id: data.id,
            url: data.reference_image_id ? `https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg` : null,
            descricao: data.description || null,
            nome: data.name,
            origem: data.origin,
            temperamento: data.temperament,
            nivel_energia: data.energy_level,
            vida_media: data.life_span,
            adaptabilidade: data.adaptability,
            inteligencia: data.intelligence,
        };

        return await Gatos.create(gatoData);
    }

    async obterGatos(page = 1) {
        try {
            page = Number(page);
            const limit = 20;
            const offset = (page - 1) * limit;

            const { count, rows: gatosValue } = await Gatos.findAndCountAll({ limit, offset });

            if (page === 1 && count === 0) {
                let hasMore = true;

                for (let apiPage = 0; apiPage < 10 && hasMore; apiPage++) {
                    try {
                        const response = await fetch(`https://api.thecatapi.com/v1/breeds?limit=10&page=${apiPage}`, {
                            headers: { 'x-api-key': 'live_TYg5Pa0i05R325DY2jXhp98R9aCVOtu1js8OlTruHZdnvRDXPam0eqVJMVEJ1GY3' }
                        });

                        if (!response.ok) {
                            throw new Error(`Erro na API externa: ${response.status}`);
                        }

                        const data = await response.json();

                        if (data.length === 0) {
                            hasMore = false;
                        } else {
                            await Promise.all(data.map(async (it) => {
                                try {
                                    await this.criarGatos(it);
                                } catch (error) {
                                    console.error(`Erro ao criar gato com ID ${it.id}: ${error.message}`);
                                }
                            }));
                        }
                    } catch (error) {
                        console.error(`Erro ao buscar na API: ${error.message}`);
                        hasMore = false;
                    }
                }

                const updatedGatos = await Gatos.findAndCountAll({ limit, offset });
                return this.formatResult(updatedGatos.count, updatedGatos.rows, page, limit);
            }

            return this.formatResult(count, gatosValue, page, limit);
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao buscar gatos, tente novamente');
        }
    }

    formatResult(count, gatosValue, page, limit) {
        const pages = Math.ceil(count / limit);
        return {
            info: {
                count,
                pages,
                next: page < pages ? `http://localhost:3000/api/v1/gatos/?page=${page + 1}` : null,
                prev: page > 1 ? `http://localhost:3000/api/v1/gatos/?page=${page - 1}` : null,
            },
            results: gatosValue,
        };
    }

    async obterGatoPorId(id) {
        const gato = await Gatos.findByPk(id);
        if (!gato) {
            throw new Error('Gato não encontrado');
        }

        return {
            id: gato.id,
            url: gato.url,
            descricao: gato.descricao,
            nome: gato.nome,
            origem: gato.origem,
            temperamento: gato.temperamento,
            nivel_energia: gato.nivel_energia,
            vida_media: gato.vida_media,
            adaptabilidade: gato.adaptabilidade,
            inteligencia: gato.inteligencia,
        };
    }

    async atualizarGatos(id, data) {
        return await Gatos.update(data, { where: { id } });
    }

    async deletarGatos(id) {
        return await Gatos.destroy({ where: { id } });
    }
}

module.exports = new GatosController();
