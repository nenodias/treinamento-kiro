# Módulo 05 — Casos de Uso Reais no Dia a Dia

## Cenário 1: Padronização de código em time distribuído

### O problema

Time com 8 devs em 3 fusos horários. Code reviews demoram porque cada um escreve de um jeito. O tech lead gasta horas corrigindo estilo e padrões.

### Antes (sem Steering)

```
Dev: "Crie um endpoint para listar pedidos"

Kiro gera:
- Às vezes usa Express, às vezes Fastify
- Nomenclatura inconsistente (getOrders vs listOrders vs fetchOrders)
- Tratamento de erro diferente a cada vez
- Sem validação de input
```

### Depois (com Steering)

```markdown
# .kiro/steering/padroes-codigo.md

## Framework e Padrões
- Framework: Fastify com TypeBox para validação
- Nomenclatura de handlers: [verbo][Recurso] (listOrders, createOrder)
- Toda rota deve ter schema de request e response
- Erros: usar AppError com código HTTP semântico
- Validação: sempre no schema do Fastify, nunca manual no handler
```

```
Dev: "Crie um endpoint para listar pedidos"

Kiro gera:
- Usa Fastify com TypeBox ✓
- Handler chamado listOrders ✓
- Schema de request e response definidos ✓
- Tratamento de erro com AppError ✓
- Validação via schema ✓
```

---

## Cenário 2: Onboarding de novos devs

### O problema

Dev novo entra no time e leva 2 semanas para entender a arquitetura, padrões e processos. Faz perguntas repetitivas no Slack.

### Solução com Steering

```markdown
# .kiro/steering/projeto.md
---
inclusion: always
---

# Projeto: Plataforma de Pagamentos

## Visão Geral
Microsserviço responsável por processar pagamentos PIX e cartão de crédito.
Processa ~50k transações/dia em produção.

## Arquitetura
- Clean Architecture: handlers → services → repositories
- Event-driven: SQS para comunicação entre serviços
- CQRS: leitura via DynamoDB, escrita via PostgreSQL

## Domínios
- /payments — processamento de pagamentos
- /refunds — estornos e cancelamentos
- /webhooks — callbacks de gateways

## Como rodar localmente
1. `docker-compose up -d` (PostgreSQL, Redis, LocalStack)
2. `npm install`
3. `npm run dev`
4. API disponível em http://localhost:3000

## Ambientes
- dev: deploy automático na main
- staging: deploy manual via tag
- prod: deploy via pipeline com aprovação
```

Agora o dev novo pode perguntar ao Kiro:

```
"Como funciona o fluxo de pagamento PIX?"
"Onde fica a lógica de retry?"
"Como faço deploy para staging?"
```

E o Kiro responde com contexto do projeto, sem precisar incomodar ninguém.

---

## Cenário 3: Consistência em APIs REST

### Steering condicional para rotas

```markdown
# .kiro/steering/convencoes-api.md
---
inclusion: fileMatch
fileMatchPattern: "src/routes/**"
---

# Convenções de API REST

## Endpoints
- Substantivos no plural: /users, /orders, /payments
- Versionamento: /v1/resource
- Nested resources: /users/:id/orders (máximo 2 níveis)

## Métodos HTTP
| Ação | Método | Rota | Status |
|------|--------|------|--------|
| Listar | GET | /resources | 200 |
| Buscar | GET | /resources/:id | 200 |
| Criar | POST | /resources | 201 |
| Atualizar | PUT | /resources/:id | 200 |
| Patch | PATCH | /resources/:id | 200 |
| Deletar | DELETE | /resources/:id | 204 |

## Response padrão
```json
{
  "data": {},
  "meta": {
    "requestId": "uuid",
    "timestamp": "ISO8601"
  }
}
```

## Paginação
- Query params: `?page=1&limit=20`
- Response inclui: `meta.pagination = { page, limit, total, totalPages }`
- Limite máximo: 100 itens por página

## Erros
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Descrição amigável",
    "details": [{ "field": "email", "issue": "formato inválido" }]
  }
}
```
```

---

## Cenário 4: Segurança como padrão

### Steering que previne vulnerabilidades

```markdown
# .kiro/steering/seguranca.md
---
inclusion: always
---

# Regras de Segurança

## NUNCA fazer
- Logar dados sensíveis (CPF, cartão, senha, tokens)
- Usar `eval()` ou `new Function()`
- Concatenar strings em queries SQL (usar parameterized queries)
- Retornar stack traces em respostas de API
- Commitar secrets no código

## SEMPRE fazer
- Validar e sanitizar todo input do usuário
- Usar helmet() no Express/Fastify
- Rate limiting em endpoints públicos
- Autenticação via JWT com expiração curta (15min access, 7d refresh)
- Criptografar dados sensíveis em repouso (AES-256)

## Dependências
- Verificar vulnerabilidades: `npm audit`
- Não usar pacotes com menos de 100 downloads semanais
- Preferir pacotes mantidos por organizações conhecidas
```

### Resultado prático

Quando o dev pede ao Kiro para criar um endpoint de login, o agente automaticamente:
- Usa bcrypt para hash de senha
- Implementa rate limiting
- Não loga a senha
- Retorna tokens com expiração
- Valida input

---

## Cenário 5: Padrões de teste por tipo de arquivo

```markdown
# .kiro/steering/padroes-testes.md
---
inclusion: fileMatch
fileMatchPattern: "**/*.test.ts"
---

# Como Escrever Testes

## Estrutura
```typescript
describe('NomeDoModulo', () => {
  describe('nomeDoMetodo', () => {
    it('deve [resultado] quando [condição]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Regras
- Mínimo 3 cenários por método: sucesso, erro esperado, edge case
- Mocks: usar vi.fn() e limpar no afterEach
- Não testar implementação interna, testar comportamento
- Dados de teste: usar factories (src/tests/factories/)

## Exemplo de factory
```typescript
// src/tests/factories/user.factory.ts
export const createUserFactory = (overrides = {}) => ({
  id: randomUUID(),
  name: 'João Silva',
  email: 'joao@example.com',
  ...overrides,
});
```
```

---

## Cenário 6: Documentação de decisões arquiteturais

```markdown
# .kiro/steering/decisoes-arquiteturais.md
---
inclusion: manual
---

# ADRs - Architecture Decision Records

## ADR-001: DynamoDB para leitura
- **Contexto**: Precisamos de leitura com latência < 10ms
- **Decisão**: DynamoDB single-table design para queries de leitura
- **Consequência**: Modelagem mais complexa, mas performance garantida

## ADR-002: SQS para comunicação entre serviços
- **Contexto**: Serviços não podem ter acoplamento direto
- **Decisão**: Toda comunicação inter-serviço via SQS
- **Consequência**: Eventual consistency, mas desacoplamento total

## ADR-003: Monorepo com Turborepo
- **Contexto**: 5 microsserviços com código compartilhado
- **Decisão**: Monorepo com Turborepo para builds incrementais
- **Consequência**: Setup inicial mais complexo, mas DX melhor
```

Uso no chat: `#decisoes-arquiteturais Por que usamos DynamoDB ao invés de PostgreSQL para leitura?`

---

## Resumo: quando usar cada abordagem

| Cenário | Modo | Motivo |
|---------|------|--------|
| Padrões de código universais | always | Aplica em toda interação |
| Contexto do projeto | always | Dev precisa saber sempre |
| Convenções de API | fileMatch (routes) | Só relevante ao editar rotas |
| Padrões de teste | fileMatch (*.test.*) | Só relevante ao escrever testes |
| Regras de segurança | always | Segurança é sempre relevante |
| Guia de deploy | manual | Usado raramente |
| ADRs | manual | Consulta pontual |

---

> 📌 **Próximo módulo**: [06 - Boas práticas e organização](06-boas-praticas-e-organizacao.md)
