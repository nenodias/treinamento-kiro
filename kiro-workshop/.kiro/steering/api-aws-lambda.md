---
inclusion: manual
---

# Padrão API — AWS Lambda + API Gateway

## Assinatura do Handler

Todos os handlers seguem a assinatura padrão de AWS Lambda com API Gateway:

```javascript
export const handler = async (event) => {
  // event.body — string JSON do body da requisição
  // event.queryStringParameters — objeto com params da URL
  // event.pathParameters — params de path (/tarefas/{id})
  return { statusCode, headers, body };
};
```

## Convenções de Evento

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `event.body` | `string \| null` | Body da requisição (JSON stringificado) |
| `event.queryStringParameters` | `object \| null` | Query params |
| `event.pathParameters` | `object \| null` | Path params |
| `event.httpMethod` | `string` | GET, POST, PUT, DELETE |

## Respostas

Sempre retornar objeto com:
- `statusCode` — código HTTP
- `headers` — incluir CORS (`Access-Control-Allow-Origin: *`)
- `body` — string JSON (usar `JSON.stringify`)

## Exemplo Completo

```javascript
import { sucesso, erro } from '../utils/resposta.mjs';
import { meuService } from '../services/meu-service.mjs';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const resultado = await meuService(body);
    return sucesso(resultado, 'Operação realizada');
  } catch (error) {
    if (error instanceof ValidacaoError) {
      return erro(400, error.message);
    }
    console.error('[meu-handler] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });
    return erro(500, 'Erro interno');
  }
};
```
