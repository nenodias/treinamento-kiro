---
name: criar-endpoint
description: Gera um endpoint completo (handler + service + teste) seguindo os padrões do time backend Node.js. Use quando precisar criar uma nova rota na API de tarefas.
---

# Criar Endpoint

Gera os 3 arquivos necessários para um novo endpoint da API:

## Passos

1. Criar handler em `projeto-demo/src/handlers/<nome>.mjs`
2. Adicionar função no service existente ou criar novo em `projeto-demo/src/services/`
3. Criar teste em `projeto-demo/src/handlers/<nome>.test.mjs`

## Template do Handler

```javascript
import { sucesso, erro } from '../utils/resposta.mjs';
import { minhaFuncao, ValidacaoError } from '../services/tarefa-service.mjs';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    const resultado = await minhaFuncao(/* params */);
    return sucesso(resultado, 'Mensagem de sucesso');

  } catch (error) {
    if (error instanceof ValidacaoError) {
      return erro(400, error.message);
    }
    console.error('[nome-handler] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });
    return erro(500, 'Erro interno ao [ação]');
  }
};
```

## Template do Teste

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/tarefa-service.mjs', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, minhaFuncao: vi.fn() };
});

import { minhaFuncao } from '../services/tarefa-service.mjs';
import { handler } from './nome-handler.mjs';

function criarEvento(body) {
  return { body: JSON.stringify(body) };
}

describe('nome-handler', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('deve retornar sucesso com dados válidos', async () => { /* ... */ });
  it('deve retornar 400 para ValidacaoError', async () => { /* ... */ });
  it('deve retornar 500 para erro inesperado', async () => { /* ... */ });
  it('deve tratar body nulo', async () => { /* ... */ });
  it('deve retornar headers CORS', async () => { /* ... */ });
});
```

## Regras

- Nomes de arquivo em kebab-case português
- Funções em camelCase português
- SEMPRE usar sucesso()/erro() do utils
- SEMPRE incluir try/catch
- Rodar `npm test` ao final
