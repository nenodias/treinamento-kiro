# Tasks: Endpoint de Concluir Tarefa

## Visão Geral

Criar handler HTTP para concluir tarefa, usando o service já existente.

## Tarefas

- [ ] 1. Criar handler `concluir-tarefa.mjs`
  - Importar `concluirTarefa`, `TarefaNaoEncontradaError`, `TarefaJaConcluidaError`
  - Extrair `event.pathParameters?.id`
  - Validar presença do ID (400 se ausente)
  - Chamar service e formatar resposta
  - Mapear erros de domínio para status HTTP correto
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 2.1_

- [ ] 2. Criar testes `concluir-tarefa.test.mjs`
  - Mock do service com vi.mock()
  - Cenários: sucesso (200), não encontrada (404), já concluída (409), id ausente (400), erro genérico (500)
  - Verificar headers CORS em todas as respostas
  - Verificar formato da resposta (sucesso, dados, mensagem)
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3_

- [ ] 3. Verificação final
  - Rodar `npm test`
  - Garantir 100% dos testes passando

## Grafo de Dependências

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2"] },
    { "id": 2, "tasks": ["3"] }
  ]
}
```
