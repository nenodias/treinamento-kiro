# Requirements: Endpoint de Concluir Tarefa

## Introdução

Criar endpoint para marcar uma tarefa como concluída via seu ID. O service `concluirTarefa(id)` já existe — falta o handler HTTP e seus testes.

## Glossário

- **Concluir tarefa**: Mudar status de "pendente" para "concluida" e registrar timestamp
- **pathParameters**: Objeto do API Gateway com parâmetros da URL (ex: `{ id: "uuid-123" }`)

## Requisitos

### Requisito 1: Criar handler de conclusão

**User Story:** Como usuário da API, quero enviar o ID de uma tarefa para marcá-la como concluída.

#### Critérios de Aceite

1. WHEN `event.pathParameters.id` contém UUID válido de tarefa existente e pendente, THEN retornar 200 com tarefa atualizada e mensagem "Tarefa concluída com sucesso".
2. WHEN o ID não corresponde a nenhuma tarefa, THEN retornar 404 com mensagem "Tarefa não encontrada: {id}".
3. WHEN a tarefa já está concluída, THEN retornar 409 com mensagem "Tarefa já está concluída: {id}".
4. WHEN `pathParameters` é null ou não contém `id`, THEN retornar 400 com mensagem "ID da tarefa é obrigatório".

### Requisito 2: Manter padrão de resposta

#### Critérios de Aceite

1. Resposta segue formato `{ sucesso, dados, mensagem }` com headers CORS.
2. Em caso de sucesso, `dados` contém a tarefa com status "concluida" e campo `concluidoEm` preenchido.
3. Em caso de erro, `dados` é null.
