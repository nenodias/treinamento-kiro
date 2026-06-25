---
name: "padroes-api-node"
displayName: "Padrões API Node.js"
description: "Convenções de código, estrutura e boas práticas para APIs Node.js do time de backend"
keywords: ["padrões", "convenções", "api", "node", "handler", "service", "endpoint", "lambda"]
author: "Time Backend"
---

# Padrões para APIs Node.js — Time Backend

## Estrutura de Projeto

Todos os projetos de API devem seguir esta estrutura:

```
src/
├── handlers/       ← Entry points (Lambda handlers)
├── services/       ← Lógica de negócio
├── utils/          ← Funções utilitárias reutilizáveis
├── models/         ← Tipos e validações (quando necessário)
└── config/         ← Configurações (quando necessário)
```

### Responsabilidades por camada

| Camada | Faz | Não faz |
|--------|-----|---------|
| handlers/ | Valida input, chama service, formata resposta | Lógica de negócio, acesso a banco |
| services/ | Regras de negócio, orquestração | Formatação HTTP, parsing de event |
| utils/ | Funções puras, reutilizáveis | Estado, side effects |

---

## Padrão de Handler

Todo handler Lambda **DEVE** seguir este template:

```javascript
import { sucesso, erro } from '../utils/resposta.mjs';
import { meuService } from '../services/meu-service.mjs';

export const handler = async (event) => {
  try {
    // 1. Extrair e validar input
    const dados = JSON.parse(event.body || '{}');

    if (!dados.campoObrigatorio) {
      return erro(400, 'Campo obrigatório não informado');
    }

    // 2. Chamar service (lógica de negócio)
    const resultado = await meuService.executar(dados);

    // 3. Retornar resposta padronizada
    return sucesso(resultado, 'Operação realizada');

  } catch (error) {
    console.error('[nome-handler] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });

    return erro(500, 'Erro interno');
  }
};
```

---

## Função de Resposta Padrão

Sempre usar as funções de `utils/resposta.mjs`:

```javascript
// Sucesso
return sucesso(dados, 'Mensagem opcional');

// Erro
return erro(400, 'Descrição do erro');
```

Formato da resposta HTTP:
```json
{
  "sucesso": true,
  "dados": { ... },
  "mensagem": "Operação realizada com sucesso"
}
```

---

## Regras Obrigatórias

1. **Nunca** coloque lógica de negócio no handler — use services
2. **Sempre** valide o input antes de chamar o service
3. **Sempre** use try/catch no handler com log estruturado
4. **Nunca** retorne stack traces ou detalhes internos na resposta HTTP
5. **Sempre** use as funções `sucesso()` e `erro()` de utils
6. **Sempre** inclua timestamp nos logs de erro

---

## Convenções de Nomenclatura

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Arquivos | `kebab-case.mjs` | `criar-usuario.mjs` |
| Funções | `camelCase` | `criarUsuario()` |
| Classes | `PascalCase` | `UsuarioService` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_TENTATIVAS` |
| Handlers | `verbo-substantivo.mjs` | `deletar-pedido.mjs` |
| Services | `substantivo-service.mjs` | `pedido-service.mjs` |

---

## Tratamento de Erros

### No handler:
```javascript
try {
  // ...operação
} catch (error) {
  console.error('[nome-handler] Erro:', {
    mensagem: error.message,
    timestamp: new Date().toISOString()
  });

  // Erros conhecidos: retorne status específico
  if (error.message === 'Recurso não encontrado') {
    return erro(404, error.message);
  }

  // Erros desconhecidos: sempre 500 genérico
  return erro(500, 'Erro interno');
}
```

### No service:
```javascript
// Lançar erros com mensagens claras
if (!recurso) {
  throw new Error('Recurso não encontrado');
}
```

---

## Validações

- Campos obrigatórios: verificar no handler antes de chamar service
- Formato de email: regex básica `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Strings: trim antes de salvar, rejeitar strings vazias
- IDs: validar formato antes de buscar no banco
