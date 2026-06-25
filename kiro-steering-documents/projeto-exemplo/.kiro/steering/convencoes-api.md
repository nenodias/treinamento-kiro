---
inclusion: fileMatch
fileMatchPattern: "src/routes/**"
---

# Convenções de API REST

## Endpoints
- Substantivos no plural em português: /tarefas, /usuarios
- IDs na URL: /tarefas/:id
- Filtros via query string: /tarefas?status=pendente

## Métodos e Status HTTP
| Ação | Método | Status Sucesso |
|------|--------|---------------|
| Listar | GET | 200 |
| Buscar por ID | GET | 200 |
| Criar | POST | 201 |
| Atualizar | PUT | 200 |
| Deletar | DELETE | 204 |

## Formato de Response

Sucesso (recurso único):
```json
{ "data": { ... } }
```

Sucesso (lista):
```json
{ "data": [...], "meta": { "total": 10 } }
```

Erro:
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Descrição do erro" } }
```

## Regras
- Sempre usar try/catch com next(err) nos handlers
- Usar helpers de `src/utils/resposta.js` para responses
- Não colocar lógica de negócio nas rotas (delegar ao service)
