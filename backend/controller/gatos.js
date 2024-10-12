const Gatos = require('../model/gatos'); // Ajuste o caminho conforme necessário

class GatosController {
        async criarGatos(data) {
            const gatoData = {
                id: data.id,
                descricao: data.descricao || null, 
                url: data.url
            };
    
            return await Gatos.create(gatoData);
        }

    async obterGatos(page = 1) {
        try {
            page = Number(page);
            if (isNaN(page) || page < 1) {
                page = 1; // Valor padrão
            }

            const limit = 20; // Limite de resultados por página
            const offset = (page - 1) * limit;

            const { count, rows: gatosValue } = await Gatos.findAndCountAll({ limit, offset });

            console.log(`Total de gatos encontrados na base de dados: ${count}`);

            if (page === 1 && count === 0) {
                console.log('Nenhum gato encontrado, iniciando busca na API externa...');
                
                let hasMore = true;
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                // Buscando até 10 páginas
                for (let apiPage = 1; apiPage <= 10 && hasMore; apiPage++) {
                    try {
                        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${apiPage}`, requestOptions);

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();
                        console.log(`Página ${apiPage} recebida, total de resultados: ${data.length}`);

                        if (data.length === 0) {
                            hasMore = false;
                        } else {
                            // Criação dos gatos
                            await Promise.all(data.map(async (it) => {
                                try {
                                    await this.criarGatos(it);
                                } catch (error) {
                                    console.error(`Erro ao criar gato com ID ${it.id}: ${error.message}`);
                                }
                            }));
                        }
                    } catch (error) {
                        console.error(`Erro durante a busca na API: ${error.message}`);
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
                count: count,
                pages: pages,
                next: page < pages ? `http://localhost:3000/api/v1/gatos/?page=${page + 1}` : null,
                prev: page > 1 ? `http://localhost:3000/api/v1/gatos/?page=${page - 1}` : null,
            },
            results: gatosValue
        };
    }

    async obterGatoPorId(id) {
    
        const gato = await Gatos.findByPk(id);
        
  
        if (!gato) {
            throw new Error('Gato não encontrado');
        }
    
        return {
            id: gato.id,
            descricao: gato.descricao,
            url: gato.url,

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
