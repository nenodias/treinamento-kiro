# Design: Filtro por Status na Listagem de Tarefas

## Visão Geral

Modificar a camada de serviço (`tarefa-service.mjs`) para aceitar parâmetro de filtro e o handler (`listar-tarefas.mjs`) para extrair/validar o query string parameter `status`.

## Arquitetura

```
Client → GET /tarefas?status=pendente
  → Handler: extrai e valida queryStringParameters.status
    → Se inválido: retorna 400
    → Se válido/ausente: chama listarTarefas(status)
      → Service: filtra array em memória
      → Retorna tarefas filtradas
    → Handler: formata resposta com sucesso()
```

## Componentes Modificados

### Handler: `listar-tarefas.mjs`

- Extrair `event.queryStringParameters?.status`
- Validar contra `STATUS_VALIDOS`
- Se inválido → `erro(400, mensagem)`
- Se válido/ausente → `listarTarefas(status)` → `sucesso(resultado, mensagem)`

### Service: `tarefa-service.mjs`

```javascript
export const STATUS_VALIDOS = ["pendente", "concluida"];

export async function listarTarefas(filtroStatus) {
  if (filtroStatus && !STATUS_VALIDOS.includes(filtroStatus)) {
    throw new ValidacaoError(`Status inválido: "${filtroStatus}"`);
  }
  if (filtroStatus) {
    return tarefas.filter(t => t.status === filtroStatus);
  }
  return [...tarefas];
}
```

## Tratamento de Erros

| Cenário | Resposta |
|---------|----------|
| status inválido | 400 — "Status inválido. Valores permitidos: pendente, concluida" |
| queryStringParameters null | 200 — todas as tarefas |
| erro inesperado | 500 — "Erro interno ao listar tarefas" |

## Testes

- Handler retorna 200 sem filtro
- Handler retorna 200 com filtro válido
- Handler retorna 400 para status inválido
- Handler retorna 400 para string vazia
- Array vazio quando nenhuma tarefa corresponde
- Headers CORS em todas as respostas
