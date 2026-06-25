# Módulo 04 — Referências a Arquivos e Composição

## O problema

Às vezes, a informação que o agente precisa já existe em outro lugar — um OpenAPI spec, um schema GraphQL, um arquivo de configuração. Duplicar esse conteúdo no Steering Document seria:

- Trabalhoso de manter
- Propenso a ficar desatualizado
- Desperdício de espaço

## A solução: referências de arquivo

Steering Documents suportam a inclusão de referências a outros arquivos do projeto usando a sintaxe:

```
#[[file:<caminho_relativo>]]
```

Quando o Kiro carrega o Steering, ele também carrega o conteúdo dos arquivos referenciados, dando ao agente acesso direto à fonte de verdade.

## Sintaxe

```markdown
# Padrões de API

Nossa API segue o contrato definido no OpenAPI spec:

#[[file:docs/openapi.yaml]]

## Regras adicionais
- Todos os endpoints devem ter exemplos no spec
- Novos campos devem ser adicionados como optional primeiro
```

O caminho é **relativo à raiz do projeto** (não ao arquivo steering).

## Casos de uso práticos

### 1. OpenAPI / Swagger Spec

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/routes/**"
---

# Contrato da API

O contrato oficial da API está definido abaixo. Toda implementação de rota deve seguir exatamente este spec:

#[[file:docs/api/openapi.yaml]]

## Regras
- Não criar endpoints que não estejam no spec
- Respeitar os tipos definidos nos schemas
- Manter os exemplos atualizados
```

**Benefício**: quando o dev editar uma rota, o Kiro terá acesso ao contrato completo e pode validar se a implementação está de acordo.

### 2. Schema GraphQL

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/graphql/**"
---

# Schema GraphQL

O schema oficial do nosso serviço:

#[[file:src/graphql/schema.graphql]]

## Convenções
- Mutations devem retornar o objeto modificado
- Queries de lista devem suportar paginação (first, after)
- Usar input types para mutations com mais de 2 argumentos
```

### 3. Configuração de banco de dados

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/database/**"
---

# Modelo de Dados

Estrutura atual das tabelas:

#[[file:prisma/schema.prisma]]

## Regras de migração
- Nunca remover colunas em produção (marcar como deprecated)
- Novas colunas devem ser nullable ou ter default
- Índices devem ser criados em migração separada
```

### 4. Configuração do projeto

```markdown
---
inclusion: always
---

# Configuração do Projeto

## TypeScript Config
#[[file:tsconfig.json]]

## ESLint Config
#[[file:.eslintrc.json]]

## Regras
- Não alterar configs sem aprovação do tech lead
- Novas regras de lint devem ser discutidas em PR separado
```

### 5. Padrões de componente com exemplo

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/components/**"
---

# Padrões de Componentes React

## Componente de referência

Use este componente como modelo para novos componentes:

#[[file:src/components/Button/Button.tsx]]

## Regras
- Sempre exportar tipos de props separadamente
- Usar forwardRef para componentes que recebem ref
- Testes no mesmo diretório: ComponentName.test.tsx
- Stories no mesmo diretório: ComponentName.stories.tsx
```

## Composição de múltiplas referências

Você pode incluir vários arquivos no mesmo Steering Document:

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/services/**"
---

# Contexto para Services

## Modelo de dados
#[[file:prisma/schema.prisma]]

## Tipos compartilhados
#[[file:src/types/shared.ts]]

## Service base (padrão a seguir)
#[[file:src/services/base.service.ts]]

## Regras
- Todo service deve estender BaseService
- Usar os tipos de src/types/shared.ts
- Respeitar o modelo de dados do Prisma
```

## Boas práticas com referências

### ✅ Faça

| Prática | Motivo |
|---------|--------|
| Referenciar arquivos estáveis | Evita contexto desatualizado |
| Usar com fileMatch | Carrega referência só quando relevante |
| Adicionar contexto ao redor | Explique por que o arquivo é importante |
| Referenciar arquivos pequenos/médios | Arquivos grandes consomem muito contexto |

### ❌ Evite

| Prática | Motivo |
|---------|--------|
| Referenciar arquivos enormes (>500 linhas) | Consome contexto desnecessariamente |
| Referenciar arquivos que mudam toda hora | Pode causar inconsistência |
| Muitas referências em steering `always` | Sobrecarrega o contexto em toda interação |
| Referenciar arquivos com secrets | Risco de segurança |

## Diagrama de composição

```
┌─────────────────────────────────────┐
│  .kiro/steering/padroes-api.md      │
│                                      │
│  # Padrões de API                    │
│                                      │
│  #[[file:docs/openapi.yaml]]  ──────────► docs/openapi.yaml
│                                      │
│  #[[file:src/types/api.ts]]   ──────────► src/types/api.ts
│                                      │
│  ## Regras adicionais                │
│  - ...                               │
└─────────────────────────────────────┘

         │
         ▼ (quando arquivo em src/routes/** é lido)

┌─────────────────────────────────────┐
│  Contexto carregado no Kiro:         │
│                                      │
│  1. Conteúdo do steering             │
│  2. Conteúdo do openapi.yaml         │
│  3. Conteúdo do api.ts               │
│  4. Arquivo que o dev está editando  │
└─────────────────────────────────────┘
```

## Dica avançada: steering que referencia outro steering

Embora não seja um padrão oficial, você pode organizar seus steerings de forma modular criando um "índice" que aponta para documentos mais detalhados:

```markdown
---
inclusion: always
---

# Projeto XYZ - Visão Geral

Somos um microsserviço de notificações.
Stack: Node.js, TypeScript, SQS, DynamoDB.

Para detalhes específicos, consulte:
- Padrões de código: ver steering `padroes-codigo.md`
- Convenções de API: ver steering `convencoes-api.md` (carregado ao editar rotas)
- Deploy: ver steering `deploy.md` (use #deploy no chat)
```

Isso mantém o steering `always` leve e direciona o dev para os recursos certos.

---

> 📌 **Próximo módulo**: [05 - Casos de uso reais no dia a dia](05-casos-de-uso-reais.md)
