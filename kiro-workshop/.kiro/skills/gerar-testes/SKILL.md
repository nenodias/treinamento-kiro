---
name: gerar-testes
description: Gera testes unitários com Vitest para módulos do projeto. Use quando precisar criar testes, aumentar cobertura, ou testar um arquivo específico.
---

# Gerar Testes

Cria testes unitários seguindo as convenções do time.

## Framework

- Vitest com `vi.mock()` para isolamento
- Arquivo de teste colocado junto ao source: `<nome>.test.mjs`
- Rodar com `npm test` (vitest run)

## Padrão para Handlers

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock ANTES da importação
vi.mock('../services/tarefa-service.mjs', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, funcaoDoService: vi.fn() };
});

// Import DEPOIS do mock
import { funcaoDoService } from '../services/tarefa-service.mjs';
import { handler } from './meu-handler.mjs';

function criarEvento(body) {
  return { body: JSON.stringify(body) };
}

describe('meu-handler', () => {
  beforeEach(() => { vi.clearAllMocks(); });
  // testes...
});
```

## Padrão para Services

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { minhaFuncao, resetarTarefas } from './tarefa-service.mjs';

describe('tarefa-service', () => {
  beforeEach(() => { resetarTarefas(); });
  // testes diretos, sem mock
});
```

## Cenários obrigatórios

1. **Caminho feliz** — dados válidos → resultado esperado
2. **Validação** — dados inválidos → ValidacaoError
3. **Erros de domínio** — regra violada (ex: tarefa já concluída)
4. **Erro inesperado** — handler retorna 500
5. **Edge cases** — body nulo, strings vazias, campos extras

## Descrições dos testes

Sempre em português, começando com verbo:
- "deve criar tarefa com dados válidos"
- "deve retornar erro 400 quando titulo é vazio"
- "deve ignorar campos extras no body"

## Regras

- NUNCA alterar código fonte — apenas criar/editar `.test.mjs`
- Usar `const` sobre `let`
- Sem `console.log` nos testes
- Verificar headers CORS em sucesso e erro
- Rodar `npm test` ao final para validar
