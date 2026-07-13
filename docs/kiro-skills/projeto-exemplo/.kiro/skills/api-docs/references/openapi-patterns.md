# Padrões OpenAPI do Time

## Formato de erro padrão

Todos os endpoints devem retornar erros no formato RFC 7807:

```yaml
components:
  schemas:
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: string
          description: Código do erro
          example: "VALIDATION_ERROR"
        message:
          type: string
          description: Mensagem legível para o desenvolvedor
          example: "Campo email é obrigatório"
        details:
          type: array
          description: Detalhes adicionais do erro
          items:
            type: object
            properties:
              field:
                type: string
              reason:
                type: string
```

## Convenções de nomenclatura

- Paths em kebab-case: `/user-profiles`, `/order-items`
- Schemas em PascalCase: `UserProfile`, `OrderItem`
- Parâmetros em camelCase: `userId`, `pageSize`
- Enums em UPPER_SNAKE_CASE: `ORDER_STATUS`, `PAYMENT_TYPE`

## Paginação

Endpoints de listagem devem suportar:

```yaml
parameters:
  - name: page
    in: query
    schema:
      type: integer
      default: 1
      minimum: 1
  - name: pageSize
    in: query
    schema:
      type: integer
      default: 20
      minimum: 1
      maximum: 100
```

Response com metadata de paginação:

```yaml
PaginatedResponse:
  type: object
  properties:
    data:
      type: array
      items: {}
    pagination:
      type: object
      properties:
        page:
          type: integer
        pageSize:
          type: integer
        total:
          type: integer
        totalPages:
          type: integer
```

## Exemplos obrigatórios

Todo endpoint deve incluir pelo menos:
- Um exemplo de request bem-sucedido (200/201)
- Um exemplo de erro de validação (400)
- Um exemplo de não autorizado (401) se requer auth
- Um exemplo de não encontrado (404) se aplicável

## Autenticação

Documentar usando securitySchemes:

```yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: Token JWT obtido via /auth/login

security:
  - bearerAuth: []
```

Endpoints públicos devem declarar explicitamente:
```yaml
security: []
```
