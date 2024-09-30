const characters = require("../model/character");

class CharactersController {
  async create(name, species, image, gender, status) {
    if (!name || !species || !image || !gender || !status) {
      throw new Error("Dados obrigatórios não preenchidos.");
    }

    const charactersValue = await characters.create({
      name,
      species,
      image,
      gender,
      status
    });

    return charactersValue;
  }

  async findOne(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const charactersValue = await characters.findByPk(id);

    if (!charactersValue) {
      throw new Error("Personagem não encontrado.");
    }

    return charactersValue;
  }

  async findAll(page = 1) {
    try {
      page = Number(page); // Certifique-se de que page é um número

      if (isNaN(page) || page < 1) {
        page = 1; // Defina o valor padrão como 1
    }

      const limit = +20;
      const offset = (page - 1) * limit;

      // Buscando personagens na base de dados
      const { count, rows: charactersValue } = await characters.findAndCountAll({ limit, offset });

      console.log(`Total de personagens encontrados na base de dados: ${count}`);

      // Se não houver personagens, busque na API externa
      if (page === 1 && count === 0) {
        console.log('Nenhum personagem encontrado, iniciando busca na API externa...');
        let apiPage = 1; // Nova variável para paginação da API
        let hasMore = true;
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        while (hasMore) {
          try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${apiPage}`, requestOptions);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Página ${apiPage} recebida, total de resultados: ${data.results.length}`);

            if (!data?.info?.next) {
              hasMore = false;
            }

            // Cria personagens na base de dados
            await Promise.all(data.results.map(async (it) => {
              try {
                await characters.create({
                  id: it.id,
                  name: it.name,
                  species: it.species,
                  image: it.image,
                  gender: it.gender,
                  status: it.status
                });
              } catch (error) {
                console.error(`Erro ao criar personagem ${it.name}: ${error.message}`);
              }
            }));
            apiPage++; // Incrementa a página da API
          } catch (error) {
            console.error(`Erro durante a busca na API: ${error.message}`);
            hasMore = false; // Para o loop se houver erro
          }
        }

        // Após buscar na API, você pode reexecutar a consulta no banco
        const updatedCharacters = await characters.findAndCountAll({ limit, offset });
        return this.formatResult(updatedCharacters.count, updatedCharacters.rows, page, limit);
      }

      return this.formatResult(count, charactersValue, page, limit);

    } catch (error) {
      console.error(error);
      throw new Error('Página não encontrada, tente novamente');
    }
  }

  // Função para formatar o resultado
  formatResult(count, charactersValue, page, limit) {
    const pages = Math.ceil(count / limit);
    return {
      info: {
        count: count,
        pages: pages,
        next: page < pages ? `http://localhost:3000/api/v1/character/?page=${page + 1}` : null,
        prev: page > 1 ? `http://localhost:3000/api/v1/character/?page=${page - 1}` : null,
      },
      results: charactersValue
    };
  }

  async update(id, name, species, image, gender, status) {
    const oldCharacters = await characters.findByPk(id);

    if (!oldCharacters) {
      throw new Error('Personagem não encontrado!');
    }

    oldCharacters.name = name || oldCharacters.name;
    oldCharacters.species = species || oldCharacters.species;
    oldCharacters.image = image || oldCharacters.image;
    oldCharacters.gender = gender || oldCharacters.gender;
    oldCharacters.status = status || oldCharacters.status;
    await oldCharacters.save(); // Adicione `await` aqui para garantir que a operação é concluída

    return oldCharacters;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const charactersValue = await this.findOne(id);
    await charactersValue.destroy(); // Adicione `await` aqui também

    return;
  }
}

module.exports = new CharactersController();
