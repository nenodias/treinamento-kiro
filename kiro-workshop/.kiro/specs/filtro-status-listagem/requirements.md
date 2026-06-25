# Requirements: Filtro por Status na Listagem de Tarefas

## Introdução

Adicionar filtro opcional por status ao endpoint de listagem de tarefas. Atualmente `listarTarefas()` retorna todas as tarefas. Com esta feature, o usuário poderá filtrar por status ("pendente" ou "concluida").

## Glossário

- **Handler**: Função que recebe evento HTTP e retorna resposta formatada
- **Tarefa**: Entidade com id, titulo, descricao, prioridade, status, criadoEm
- **Status**: Campo da Tarefa — valores válidos: "pendente", "concluida"
- **Filtro_Status**: Parâmetro opcional na requisição para restringir listagem

## Requisitos

### Requisito 1: Aceitar parâmetro de filtro por status

**User Story:** Como usuário da API, quero enviar um parâmetro de status na listagem, para visualizar apenas tarefas com o status desejado.

#### Critérios de Aceite

1. WHEN o evento contém `queryStringParameters.status` com valor "pendente" ou "concluida", THEN retornar apenas tarefas com esse status (200).
2. WHEN o evento não contém parâmetro "status" ou queryStringParameters é null, THEN retornar todas as tarefas sem filtro (200).
3. WHEN o parâmetro "status" tem valor diferente de "pendente"/"concluida", THEN retornar 400 com mensagem informando valores permitidos.

### Requisito 2: Filtrar no serviço

**User Story:** Como usuário, quero que o serviço aplique o filtro corretamente.

#### Critérios de Aceite

1. WHEN filtroStatus é "pendente" ou "concluida", THEN retornar apenas tarefas com status correspondente.
2. WHEN filtroStatus é undefined/null, THEN retornar todas as tarefas.
3. WHEN filtroStatus é válido mas nenhuma tarefa corresponde, THEN retornar array vazio.

### Requisito 3: Manter compatibilidade da resposta

#### Critérios de Aceite

1. Resposta mantém formato: `{ sucesso: true, dados: [], mensagem: "N tarefa(s) encontrada(s)" }`
2. Mensagem inclui quantidade de tarefas retornadas.
3. Array vazio com filtro retorna mensagem "0 tarefa(s) encontrada(s)".
