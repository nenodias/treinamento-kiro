---
name: api-docs
description: Gera e atualiza documentação de API no formato OpenAPI 3.0 a partir do código fonte. Use quando precisar documentar endpoints, criar specs de API, atualizar swagger ou gerar documentação de rotas.
metadata:
  author: time-backend
  version: "1.2"
compatibility: Requer Node.js 18+ instalado
---

## Workflow de documentação

### 1. Identificar endpoints
Analise os arquivos de rotas do projeto (geralmente em `src/routes/` ou similar).

### 2. Gerar spec
Para cada endpoint encontrado, documente:
- Path e método HTTP
- Parâmetros (path, query, body)
- Schemas de request e response
- Códigos de status possíveis
- Exemplos de uso

### 3. Padrões a seguir
Consulte `references/openapi-patterns.md` para convenções do time.

### 4. Formato de saída

Gere no formato OpenAPI 3.0:

```yaml
openapi: "3.0.3"
info:
  title: Nome da API
  version: "1.0.0"
paths:
  /recurso:
    get:
      summary: Listar recursos
      responses:
        "200":
          description: Lista retornada com sucesso
```

### 5. Validação
Após gerar, verifique:
- Todos os endpoints documentados
- Exemplos de request/response incluídos
- Schemas de erro padronizados (ver referência)
- Autenticação documentada onde necessário
