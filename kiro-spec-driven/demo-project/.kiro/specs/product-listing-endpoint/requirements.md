# Documento de Requisitos

## Introdução

Este documento define os requisitos para o endpoint `GET /products` da API de listagem de produtos. O endpoint permite consultar produtos com suporte a filtros por categoria e faixa de preço, paginação com limit/offset, e ordenação por nome ou preço. A resposta inclui metadados de paginação para facilitar a navegação entre páginas de resultados.

## Glossário

- **API_Produtos**: O serviço de backend Node.js/Express responsável por expor o endpoint GET /products e processar as requisições de listagem.
- **Produto**: Entidade com os campos id, name, description, price, category e createdAt, armazenada no banco de dados em memória.
- **Metadata_Paginação**: Objeto retornado na resposta contendo informações sobre a paginação: total de itens, página atual e indicador de próxima página.
- **Query_Parameters**: Parâmetros enviados na URL da requisição para controlar filtros, paginação e ordenação.

## Requisitos

### Requisito 1: Listagem básica de produtos

**User Story:** Como um consumidor da API, eu quero listar todos os produtos disponíveis, para que eu possa visualizar o catálogo completo.

#### Critérios de Aceitação

1. WHEN uma requisição GET é feita para /products sem parâmetros, THE API_Produtos SHALL retornar a lista de produtos com paginação padrão (limit=20, offset=5).
2. THE API_Produtos SHALL retornar cada produto com os campos: id, name, description, price, category e createdAt.
3. THE API_Produtos SHALL retornar o status HTTP 200 para requisições válidas.

### Requisito 2: Filtro por categoria

**User Story:** Como um consumidor da API, eu quero filtrar produtos por categoria, para que eu possa encontrar produtos de um tipo específico.

#### Critérios de Aceitação

1. WHEN o parâmetro "category" é fornecido na query string, THE API_Produtos SHALL retornar apenas produtos cuja categoria corresponda exatamente ao valor informado.
2. WHEN o parâmetro "category" é fornecido com um valor que não corresponde a nenhum produto, THE API_Produtos SHALL retornar uma lista vazia com total igual a zero.
3. THE API_Produtos SHALL realizar a comparação de categoria de forma case-insensitive.

### Requisito 3: Filtro por faixa de preço

**User Story:** Como um consumidor da API, eu quero filtrar produtos por preço mínimo e máximo, para que eu possa encontrar produtos dentro do meu orçamento.

#### Critérios de Aceitação

1. WHEN o parâmetro "minPrice" é fornecido, THE API_Produtos SHALL retornar apenas produtos com preço maior ou igual ao valor informado.
2. WHEN o parâmetro "maxPrice" é fornecido, THE API_Produtos SHALL retornar apenas produtos com preço menor ou igual ao valor informado.
3. WHEN ambos "minPrice" e "maxPrice" são fornecidos, THE API_Produtos SHALL retornar apenas produtos com preço dentro da faixa especificada (inclusivo em ambos os limites).
4. IF o parâmetro "minPrice" for maior que "maxPrice", THEN THE API_Produtos SHALL retornar status HTTP 400 com mensagem de erro descritiva.
5. IF o parâmetro "minPrice" ou "maxPrice" contiver um valor não numérico, THEN THE API_Produtos SHALL retornar status HTTP 400 com mensagem de erro descritiva.

### Requisito 4: Paginação

**User Story:** Como um consumidor da API, eu quero paginar os resultados, para que eu possa navegar por grandes conjuntos de dados de forma eficiente.

#### Critérios de Aceitação

1. WHEN o parâmetro "limit" é fornecido, THE API_Produtos SHALL retornar no máximo a quantidade de produtos especificada.
2. WHEN o parâmetro "offset" é fornecido, THE API_Produtos SHALL pular a quantidade de produtos especificada antes de retornar os resultados.
3. THE API_Produtos SHALL utilizar valores padrão de limit=20 e offset=5 quando os parâmetros não forem fornecidos.
4. THE API_Produtos SHALL limitar o valor máximo de "limit" a 200 itens por requisição.
5. IF o parâmetro "limit" for menor que 1 ou maior que 200, THEN THE API_Produtos SHALL retornar status HTTP 400 com mensagem de erro descritiva.
6. IF o parâmetro "offset" for menor que 0, THEN THE API_Produtos SHALL retornar status HTTP 400 com mensagem de erro descritiva.

### Requisito 5: Metadados de paginação

**User Story:** Como um consumidor da API, eu quero receber metadados de paginação na resposta, para que eu saiba quantos resultados existem e se há mais páginas.

#### Critérios de Aceitação

1. THE API_Produtos SHALL incluir no corpo da resposta um objeto "metadata" com os campos: total, page e hasNext.
2. THE API_Produtos SHALL calcular o campo "total" como a quantidade total de produtos que correspondem aos filtros aplicados (antes da paginação).
3. THE API_Produtos SHALL calcular o campo "page" como o número da página atual baseado em offset e limit (começando em 1).
4. THE API_Produtos SHALL definir o campo "hasNext" como true quando existirem mais produtos além da página atual, e false caso contrário.

### Requisito 6: Ordenação

**User Story:** Como um consumidor da API, eu quero ordenar os resultados por nome ou preço, para que eu possa visualizar os produtos na ordem desejada.

#### Critérios de Aceitação

1. WHEN o parâmetro "sortBy" é fornecido com valor "name", THE API_Produtos SHALL ordenar os produtos alfabeticamente pelo campo name.
2. WHEN o parâmetro "sortBy" é fornecido com valor "price", THE API_Produtos SHALL ordenar os produtos numericamente pelo campo price.
3. WHEN o parâmetro "sortOrder" é fornecido com valor "asc", THE API_Produtos SHALL ordenar os resultados em ordem crescente.
4. WHEN o parâmetro "sortOrder" é fornecido com valor "desc", THE API_Produtos SHALL ordenar os resultados em ordem decrescente.
5. THE API_Produtos SHALL utilizar ordenação padrão sortBy="name" e sortOrder="asc" quando os parâmetros não forem fornecidos.
6. IF o parâmetro "sortBy" contiver um valor diferente de "name" ou "price", THEN THE API_Produtos SHALL retornar status HTTP 400 com mensagem de erro descritiva.
7. IF o parâmetro "sortOrder" contiver um valor diferente de "asc" ou "desc", THEN THE API_Produtos SHALL retornar status HTTP 400 com mensagem de erro descritiva.

### Requisito 7: Formato da resposta

**User Story:** Como um consumidor da API, eu quero receber respostas em formato JSON consistente, para que eu possa integrar facilmente com meu frontend.

#### Critérios de Aceitação

1. THE API_Produtos SHALL retornar respostas no formato JSON com Content-Type "application/json".
2. THE API_Produtos SHALL estruturar a resposta de sucesso com os campos "data" (array de produtos) e "metadata" (objeto de paginação).
3. THE API_Produtos SHALL estruturar respostas de erro com o campo "error" contendo uma mensagem descritiva.

### Requisito 8: Combinação de filtros

**User Story:** Como um consumidor da API, eu quero combinar múltiplos filtros simultaneamente, para que eu possa refinar minha busca de forma precisa.

#### Critérios de Aceitação

1. WHEN múltiplos parâmetros de filtro são fornecidos simultaneamente, THE API_Produtos SHALL aplicar todos os filtros em conjunto (operação AND).
2. THE API_Produtos SHALL aplicar os filtros antes da ordenação.
3. THE API_Produtos SHALL aplicar a ordenação antes da paginação.
4. THE API_Produtos SHALL calcular os metadados de paginação com base nos resultados após a aplicação de todos os filtros.
