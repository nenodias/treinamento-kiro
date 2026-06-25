# Módulo 02 — Como criar e configurar Steering Documents

## Estrutura básica

Um Steering Document é um arquivo Markdown simples. O mínimo necessário é:

```
.kiro/
└── steering/
    └── meu-documento.md
```

O conteúdo é texto livre em linguagem natural. O Kiro interpreta o que você escrever como instruções de contexto.

## Criando seu primeiro Steering Document

### Passo 1: Criar a pasta

Se o projeto ainda não tem a estrutura do Kiro:

```bash
mkdir -p .kiro/steering
```

### Passo 2: Criar o arquivo

Crie um arquivo `.md` dentro de `.kiro/steering/`. O nome do arquivo deve ser descritivo:

```bash
# Bons nomes
padroes-codigo.md
convencoes-api.md
arquitetura.md
regras-seguranca.md

# Nomes ruins
regras.md          # muito genérico
doc1.md            # não diz nada
tudo.md            # provavelmente grande demais
```

### Passo 3: Escrever o conteúdo

O conteúdo é Markdown comum. Escreva como se estivesse explicando para um colega novo no time:

```markdown
# Padrões de Código - Backend

## Linguagem e Runtime
- Usamos TypeScript 5.x com Node.js 20 LTS
- Target de compilação: ES2022
- Strict mode sempre habilitado

## Nomenclatura
- Variáveis e funções: camelCase
- Classes e interfaces: PascalCase
- Constantes: UPPER_SNAKE_CASE
- Arquivos: kebab-case.ts

## Tratamento de Erros
- Sempre usar classes de erro customizadas (AppError, ValidationError, etc.)
- Nunca retornar erro genérico para o cliente
- Logar o stack trace completo internamente
- Retornar mensagem amigável para o usuário

## Testes
- Framework: Vitest
- Cobertura mínima: 80%
- Nomear testes com padrão: "deve [comportamento esperado] quando [condição]"
```

## Front-matter (metadados opcionais)

Steering Documents suportam um bloco de **front-matter** YAML no topo do arquivo para controlar o comportamento de inclusão:

```markdown
---
inclusion: always
---

# Padrões de Código

Conteúdo aqui...
```

### Opções de `inclusion`

| Valor | Comportamento | Quando usar |
|-------|--------------|-------------|
| *(sem front-matter)* | Sempre incluído | Regras gerais do projeto |
| `always` | Sempre incluído (explícito) | Mesmo que acima, mais legível |
| `fileMatch` | Incluído quando um arquivo matching é lido | Regras específicas por tipo de arquivo |
| `manual` | Incluído apenas quando referenciado via `#` no chat | Contexto sob demanda |

Veremos cada modo em detalhes no próximo módulo.

## Exemplo completo: Steering para um projeto Node.js

```markdown
---
inclusion: always
---

# Contexto do Projeto

## Sobre
Este é um microsserviço de pagamentos que processa transações via PIX e cartão.
Stack: Node.js 20, TypeScript, Express, PostgreSQL, Redis.

## Arquitetura
- Padrão: Clean Architecture com 3 camadas (handlers → services → repositories)
- Comunicação assíncrona via SQS entre microsserviços
- Cache de sessão no Redis com TTL de 15 minutos

## Regras de Negócio Importantes
- Transações acima de R$ 5.000 precisam de aprovação dupla
- Retry automático em falhas de gateway: máximo 3 tentativas com backoff exponencial
- Logs de transação são imutáveis (append-only)

## Comandos Úteis
- Build: `npm run build`
- Testes: `npm run test`
- Lint: `npm run lint`
- Dev local: `npm run dev` (requer Docker para PostgreSQL e Redis)
```

## Dicas para um bom Steering Document

### ✅ Faça

- Seja específico e direto
- Use exemplos de código quando possível
- Organize com headers e listas
- Mantenha atualizado (trate como documentação viva)
- Versione junto com o código (Git)

### ❌ Evite

- Textos muito longos (o agente tem limite de contexto)
- Informações que mudam frequentemente (use variáveis de ambiente)
- Duplicar o que já está em outros docs (use referências — módulo 04)
- Instruções contraditórias entre arquivos

## Verificando se está funcionando

Depois de criar seu Steering Document, teste com uma pergunta simples no chat do Kiro:

```
Quais são os padrões de nomenclatura do projeto?
```

Se o Steering está carregado corretamente, o Kiro vai responder com base nas regras que você definiu, sem que você precise mencioná-las.

## Estrutura recomendada para um projeto

```
.kiro/
└── steering/
    ├── projeto.md              ← contexto geral (always)
    ├── padroes-codigo.md       ← regras de código (always)
    ├── convencoes-api.md       ← padrões de API (fileMatch: rotas)
    ├── regras-testes.md        ← como escrever testes (fileMatch: *.test.*)
    └── deploy.md               ← instruções de deploy (manual)
```

---

> 📌 **Próximo módulo**: [03 - Modos de inclusão](03-modos-de-inclusao.md)
