# Módulo 07 — Demonstração Prática

## Objetivo

Neste módulo, vamos criar Steering Documents do zero para o projeto de exemplo e ver o impacto na prática.

## Exercício 1: Criar o steering base do projeto

### Passo a passo

1. Abra o projeto de exemplo no Kiro IDE
2. Crie a estrutura de pastas:

```bash
mkdir -p .kiro/steering
```

3. Crie o arquivo `.kiro/steering/projeto.md`:

```markdown
---
inclusion: always
---

# Projeto: API de Tarefas

## Sobre
API REST para gerenciamento de tarefas pessoais.
Stack: Node.js 20, Express, DynamoDB (local via docker).

## Arquitetura
- Camadas: handlers → services → models
- Cada handler é uma função isolada
- Services contêm a lógica de negócio
- Models definem a estrutura dos dados

## Comandos
- Instalar: `npm install`
- Dev: `npm run dev`
- Testes: `npm test`
- Lint: `npm run lint`
```

4. Teste perguntando ao Kiro:

```
Qual a stack deste projeto?
```

**Resultado esperado**: o Kiro responde com Node.js 20, Express, DynamoDB — sem você precisar explicar.

---

## Exercício 2: Steering condicional para rotas

1. Crie `.kiro/steering/convencoes-api.md`:

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/routes/**"
---

# Convenções de API

## Padrões de Endpoint
- Substantivos no plural: /tarefas, /usuarios
- IDs na URL: /tarefas/:id
- Filtros via query: /tarefas?status=pendente

## Response padrão
- Sucesso: { data: T }
- Erro: { error: { code: string, message: string } }
- Lista: { data: T[], meta: { total: number } }

## Status HTTP
- 200: sucesso em GET/PUT/PATCH
- 201: sucesso em POST (criação)
- 204: sucesso em DELETE
- 400: erro de validação
- 404: recurso não encontrado
- 500: erro interno (nunca expor detalhes)
```

2. Abra qualquer arquivo em `src/routes/` e peça ao Kiro:

```
Crie um endpoint para buscar tarefa por ID
```

**Resultado esperado**: o Kiro segue as convenções definidas (status codes, formato de response, etc.)

---

## Exercício 3: Steering para testes

1. Crie `.kiro/steering/padroes-testes.md`:

```markdown
---
inclusion: fileMatch
fileMatchPattern: "**/*.test.js"
---

# Padrões de Teste

## Framework
- Jest com supertest para testes de integração

## Nomenclatura
- Arquivo: [modulo].test.js
- Describe: nome do módulo
- It: "deve [ação] quando [condição]"

## Estrutura (AAA)
- Arrange: preparar dados e mocks
- Act: executar a ação
- Assert: verificar resultado

## Regras
- Mínimo 3 cenários: sucesso, erro de validação, erro inesperado
- Não depender de estado externo (banco, API)
- Usar mocks para dependências externas
- Limpar mocks no afterEach
```

2. Abra ou crie um arquivo `.test.js` e peça:

```
Crie testes para o service de tarefas
```

**Resultado esperado**: testes seguem o padrão AAA, nomenclatura correta, mínimo de 3 cenários.

---

## Exercício 4: Steering manual para deploy

1. Crie `.kiro/steering/deploy.md`:

```markdown
---
inclusion: manual
---

# Guia de Deploy

## Ambientes
| Ambiente | URL | Deploy |
|----------|-----|--------|
| Local | http://localhost:3000 | `npm run dev` |
| Dev | https://api-dev.exemplo.com | Push na main |
| Prod | https://api.exemplo.com | Tag + aprovação |

## Checklist pré-deploy
- [ ] Testes passando
- [ ] Lint sem erros
- [ ] CHANGELOG atualizado
- [ ] PR aprovado por 2 reviewers

## Processo para produção
1. Criar tag: `git tag v1.x.x -m "descrição"`
2. Push: `git push origin v1.x.x`
3. Aguardar pipeline no GitHub Actions
4. Aprovar no Slack (#deploys)
5. Monitorar métricas por 15 minutos

## Rollback
- Automático se health check falhar em 60s
- Manual: `npm run rollback -- --version v1.x.x`
```

2. No chat, use a referência manual:

```
#deploy Qual o processo para fazer deploy em produção?
```

**Resultado esperado**: o Kiro carrega o steering e responde com o processo completo.

---

## Exercício 5: Steering com referência a arquivo

1. Crie `.kiro/steering/modelo-dados.md`:

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/models/**"
---

# Modelo de Dados

## Schema atual

#[[file:src/models/tarefa-model.mjs]]

## Regras
- Novos campos devem ter valor default
- IDs são sempre UUID v4
- Timestamps em ISO 8601 (UTC)
- Campos obrigatórios devem ser validados no service
```

2. Abra um arquivo em `src/models/` e peça:

```
Adicione um campo de prioridade ao modelo de tarefa
```

**Resultado esperado**: o Kiro conhece o modelo atual (via referência) e adiciona o campo seguindo as regras definidas.

---

## Exercício 6: Validando o comportamento

### Teste A/B simples

1. **Sem steering**: delete temporariamente a pasta `.kiro/steering/`
2. Peça ao Kiro: "Crie um endpoint para deletar tarefa"
3. Observe o resultado (provavelmente genérico)

4. **Com steering**: restaure a pasta
5. Faça o mesmo pedido
6. Compare: formato de response, status codes, tratamento de erro

### O que observar

| Aspecto | Sem Steering | Com Steering |
|---------|-------------|--------------|
| Status HTTP | Pode variar | 204 (conforme definido) |
| Response de erro | Formato livre | `{ error: { code, message } }` |
| Validação | Pode faltar | Sempre presente |
| Nomenclatura | Inconsistente | Segue padrão |

---

## Desafio final

Crie um conjunto completo de Steering Documents para um projeto seu (real ou fictício) que cubra:

1. ✅ Contexto do projeto (always)
2. ✅ Padrões de código (always)
3. ✅ Convenções de API (fileMatch)
4. ✅ Padrões de teste (fileMatch)
5. ✅ Guia de deploy (manual)

Teste cada um fazendo perguntas ao Kiro e verificando se as respostas seguem os padrões definidos.

---

## Troubleshooting

| Problema | Causa provável | Solução |
|----------|---------------|---------|
| Steering não carrega | Arquivo fora de `.kiro/steering/` | Verificar caminho |
| fileMatch não ativa | Padrão glob incorreto | Testar com `**/*.ext` |
| Regras ignoradas | Steering muito longo | Reduzir e focar |
| Conflito entre steerings | Instruções contraditórias | Revisar e unificar |
| Manual não funciona | Nome errado no `#` | Usar nome do arquivo sem extensão |

---

> 📌 **Voltar ao início**: [README](../README.md)
