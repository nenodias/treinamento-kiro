# Padrões do Time — Backend Node.js

## Estrutura obrigatória
- `handlers/` → Entry points (validação + chamada de service + resposta)
- `services/` → Lógica de negócio
- `utils/` → Funções auxiliares reutilizáveis

## Regras de código
- Arquivos: `kebab-case.mjs`
- Funções: `camelCase`
- Sempre async/await (nunca .then/.catch)
- try/catch obrigatório em todos os handlers
- Log estruturado com timestamp: `console.error('[nome] Erro:', { mensagem, timestamp })`
- Nunca expor stack trace na resposta HTTP

## Respostas HTTP
Sempre usar as funções de `src/utils/resposta.mjs`:
```javascript
return sucesso(dados, 'Mensagem');
return erro(400, 'Descrição do erro');
```

Formato: `{ sucesso: boolean, dados: object|null, mensagem: string }`

## Validação
- Validar campos obrigatórios no handler antes de chamar o service
- Retornar 400 com mensagem clara se inválido
- Lógica de negócio (ex: duplicidade) fica no service
