# Módulo 03 — Modos de Inclusão

Os Steering Documents possuem três modos de inclusão que determinam **quando** o conteúdo é carregado no contexto do agente. Escolher o modo certo é fundamental para manter o contexto enxuto e relevante.

## Visão geral dos modos

```
┌─────────────────────────────────────────────────────────────┐
│                    Modos de Inclusão                          │
├─────────────────┬─────────────────┬─────────────────────────┤
│     always      │    fileMatch    │        manual            │
│                 │                 │                          │
│  Carregado em   │  Carregado      │  Carregado apenas       │
│  TODA interação │  quando arquivo │  quando o dev           │
│                 │  matching é     │  referencia via #        │
│                 │  lido/editado   │  no chat                 │
└─────────────────┴─────────────────┴─────────────────────────┘
```

---

## 1. Modo `always` (padrão)

### Como configurar

Basta criar o arquivo sem front-matter, ou declarar explicitamente:

```markdown
---
inclusion: always
---

# Padrões Gerais do Projeto

- Usamos TypeScript com strict mode
- Todas as funções devem ter tipagem explícita de retorno
- Imports devem ser organizados: externos → internos → tipos
```

### Quando usar

- Regras que se aplicam a **qualquer** interação
- Contexto geral do projeto (stack, arquitetura, comandos)
- Convenções de nomenclatura universais
- Informações que o agente precisa saber sempre

### Exemplo prático

```markdown
---
inclusion: always
---

# Contexto do Projeto

## Stack
- Runtime: Node.js 20 LTS
- Linguagem: TypeScript 5.4
- Framework: Fastify
- Banco: DynamoDB
- Testes: Vitest

## Comandos
- `npm run build` — compila o projeto
- `npm run test` — roda testes unitários
- `npm run deploy:dev` — deploy no ambiente de desenvolvimento
```

### ⚠️ Cuidado

Arquivos `always` consomem contexto em **toda** interação. Mantenha-os concisos. Se você tem muitas regras, divida em arquivos menores com modos diferentes.

---

## 2. Modo `fileMatch`

### Como configurar

Requer front-matter com `inclusion: fileMatch` e `fileMatchPattern`:

```markdown
---
inclusion: fileMatch
fileMatchPattern: "src/routes/**"
---

# Convenções de Rotas/API

## Padrões de Endpoint
- Usar substantivos no plural: `/users`, `/orders`, `/payments`
- Versionamento na URL: `/v1/users`
- Filtros via query string: `?status=active&page=1`

## Respostas
- Sucesso: `{ data: T, meta?: { pagination } }`
- Erro: `{ error: { code, message, details? } }`
- Sempre retornar status HTTP semântico
```

### Padrões de glob suportados

| Padrão | Match |
|--------|-------|
| `*.ts` | Qualquer arquivo .ts na raiz |
| `**/*.test.ts` | Qualquer arquivo de teste em qualquer pasta |
| `src/routes/**` | Qualquer arquivo dentro de src/routes |
| `README*` | Qualquer arquivo que comece com README |
| `src/**/*.{ts,tsx}` | Arquivos .ts e .tsx dentro de src |

### Exemplos de uso

**Regras de teste** — carregadas apenas quando um arquivo de teste é lido:

```markdown
---
inclusion: fileMatch
fileMatchPattern: "**/*.test.ts"
---

# Padrões de Teste

## Estrutura
- Usar `describe` para agrupar por funcionalidade
- Usar `it` com descrição no formato: "deve [ação] quando [condição]"
- Um arquivo de teste por módulo

## Mocks
- Preferir mocks inline com `vi.fn()`
- Nunca mockar o módulo inteiro se só precisa de uma função
- Limpar mocks no `afterEach`

## Assertions
- Preferir `toEqual` sobre `toBe` para objetos
- Usar `toMatchObject` para verificações parciais
- Testar casos de erro explicitamente
```

**Regras de infraestrutura** — carregadas ao editar arquivos de IaC:

```markdown
---
inclusion: fileMatch
fileMatchPattern: "infra/**/*.yaml"
---

# Padrões de Infraestrutura

- Usar AWS SAM para definição de recursos
- Nomear recursos com prefixo do serviço: `payments-api-function`
- Sempre definir tags: Environment, Service, Team
- Timeout padrão de Lambda: 30 segundos
- Memory padrão: 256MB
```

### Quando usar

- Regras que só fazem sentido para certos tipos de arquivo
- Convenções de API (quando editando rotas)
- Padrões de teste (quando editando testes)
- Regras de infra (quando editando templates)
- Padrões de componente (quando editando UI)

---

## 3. Modo `manual`

### Como configurar

```markdown
---
inclusion: manual
---

# Guia de Deploy

## Pré-requisitos
- AWS CLI configurado com perfil `prod`
- Acesso ao CodePipeline aprovado pelo tech lead
- Changelog atualizado

## Processo
1. Criar tag: `git tag v1.x.x`
2. Push da tag: `git push origin v1.x.x`
3. Pipeline inicia automaticamente
4. Monitorar no console: https://console.aws.amazon.com/...

## Rollback
- Reverter tag e fazer push
- Ou usar o botão "Retry" no CodePipeline com a versão anterior
```

### Como usar no chat

No chat do Kiro, referencie o steering com `#`:

```
#deploy Como faço o deploy para produção?
```

O Kiro vai carregar o conteúdo do steering `deploy.md` naquela interação específica.

### Quando usar

- Informações que raramente são necessárias
- Guias de processos específicos (deploy, migração, etc.)
- Documentação de referência pesada
- Contexto que só faz sentido em cenários pontuais

---

## Comparativo dos modos

| Aspecto | always | fileMatch | manual |
|---------|--------|-----------|--------|
| Carregamento | Automático, sempre | Automático, condicional | Sob demanda |
| Consumo de contexto | Constante | Apenas quando relevante | Apenas quando solicitado |
| Ideal para | Regras universais | Regras por tipo de arquivo | Referência pontual |
| Configuração | Nenhuma ou `inclusion: always` | `inclusion: fileMatch` + `fileMatchPattern` | `inclusion: manual` |
| Exemplo | Padrões de código | Convenções de API | Guia de deploy |

## Estratégia recomendada

```
.kiro/steering/
├── projeto.md              ← always (contexto geral, ~20 linhas)
├── padroes-codigo.md       ← always (regras universais, ~30 linhas)
├── convencoes-api.md       ← fileMatch: src/routes/**
├── padroes-testes.md       ← fileMatch: **/*.test.*
├── padroes-infra.md        ← fileMatch: infra/**
├── deploy.md               ← manual
└── migracao-banco.md       ← manual
```

**Regra de ouro**: se a informação é relevante em menos de 30% das interações, provavelmente não deveria ser `always`.

---

> 📌 **Próximo módulo**: [04 - Referências a arquivos e composição](04-referencias-e-composicao.md)
