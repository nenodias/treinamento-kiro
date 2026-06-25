# Design: Endpoint de Concluir Tarefa

## Visão Geral

Criar handler `concluir-tarefa.mjs` que recebe um ID via path parameter e chama `concluirTarefa(id)` do service existente.

## Arquitetura

```
Client → PUT /tarefas/{id}/concluir
  → Handler: extrai pathParameters.id
    → Se id ausente: retorna 400
    → Chama concluirTarefa(id)
      → Service: busca tarefa, valida status, atualiza
      → Retorna tarefa atualizada
    → Handler: retorna sucesso(tarefa, mensagem)
  → Erro TarefaNaoEncontradaError → 404
  → Erro TarefaJaConcluidaError → 409
  → Erro inesperado → 500
```

## Componente: `src/handlers/concluir-tarefa.mjs`

```javascript
import { sucesso, erro } from '../utils/resposta.mjs';
import {
  concluirTarefa,
  TarefaNaoEncontradaError,
  TarefaJaConcluidaError
} from '../services/tarefa-service.mjs';

export const handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return erro(400, 'ID da tarefa é obrigatório');
    }

    const tarefa = await concluirTarefa(id);
    return sucesso(tarefa, 'Tarefa concluída com sucesso');

  } catch (error) {
    if (error instanceof TarefaNaoEncontradaError) {
      return erro(404, error.message);
    }
    if (error instanceof TarefaJaConcluidaError) {
      return erro(409, error.message);
    }
    console.error('[concluir-tarefa] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });
    return erro(500, 'Erro interno ao concluir tarefa');
  }
};
```

## Mapeamento de erros

| Erro do Service | HTTP Status | Mensagem |
|----------------|-------------|----------|
| TarefaNaoEncontradaError | 404 | "Tarefa não encontrada: {id}" |
| TarefaJaConcluidaError | 409 | "Tarefa já está concluída: {id}" |
| Error genérico | 500 | "Erro interno ao concluir tarefa" |
| id ausente | 400 | "ID da tarefa é obrigatório" |
