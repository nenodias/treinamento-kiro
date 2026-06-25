# Tasks: Filtro por Status na Listagem de Tarefas

## Visão Geral

Implementação incremental do filtro por status no endpoint de listagem.

## Tarefas

- [ ] 1. Adicionar constante STATUS_VALIDOS e modificar listarTarefas no serviço
  - Exportar `STATUS_VALIDOS = ["pendente", "concluida"]`
  - Modificar `listarTarefas(filtroStatus)` para aceitar parâmetro opcional
  - Se undefined/null → retornar todas
  - Se válido → filtrar por status
  - Se inválido → lançar ValidacaoError
  - _Requisitos: 2.1, 2.2, 2.3_

- [ ] 2. Implementar validação e filtro no handler
  - Importar `STATUS_VALIDOS` do service
  - Extrair `event.queryStringParameters?.status`
  - Validar antes de chamar service
  - Retornar erro 400 se inválido
  - _Requisitos: 1.1, 1.2, 1.3, 3.1, 3.2, 3.3_

- [ ] 3. Escrever testes unitários do handler
  - Cenários: sem filtro, com filtro válido, status inválido, string vazia, array vazio, CORS
  - _Requisitos: 1.1, 1.2, 1.3, 3.1, 3.2, 3.3_

- [ ] 4. Verificação final
  - Rodar `npm test` e garantir que todos passam
  - Verificar que testes existentes não quebraram

## Grafo de Dependências

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2"] },
    { "id": 2, "tasks": ["3"] },
    { "id": 3, "tasks": ["4"] }
  ]
}
```
