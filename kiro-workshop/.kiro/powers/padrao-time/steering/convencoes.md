---
inclusion: always
---

# Convenções do Time Backend

## Nomenclatura

- Arquivos: `kebab-case.mjs` (português para domínio)
- Funções e variáveis: `camelCase` em português
- Classes de erro: `PascalCase` com sufixo `Error`
- Constantes: `UPPER_SNAKE_CASE`

## Arquitetura em Camadas

```
handlers/  → Entry points HTTP (parse, chamada ao service, resposta)
services/  → Lógica de negócio pura (validação, estado, regras)
utils/     → Helpers genéricos reutilizáveis
```

### Regras de separação
- Handlers **nunca** contêm lógica de negócio
- Services **nunca** conhecem HTTP (sem statusCode, sem headers)
- Utils **nunca** têm acoplamento a domínio específico

## Tratamento de Erros

- Handlers sempre com `try/catch`
- Erros de domínio: classes customizadas com propriedade `codigo`
- Erros inesperados: retornar 500 genérico (sem vazar stack)
- Log estruturado: `console.error('[nome] Erro:', { mensagem, timestamp })`

## Respostas HTTP

Sempre usar `sucesso()` e `erro()` do `utils/resposta.mjs`:

```javascript
return sucesso(dados, 'Mensagem de sucesso');
return erro(400, 'Descrição do erro');
```

Formato padrão: `{ sucesso: boolean, dados: object|null, mensagem: string }`
