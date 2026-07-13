# 🛠️ Módulo 04 — Criando seu Próprio Power

> ⏱️ Tempo estimado: ~7 minutos

---

## Por que criar um Power customizado?

Cenários comuns:

- 📏 O time tem padrões de código que todo dev deve seguir
- 🏗️ Existe uma arquitetura padrão para novos microserviços
- 📝 Há um processo de code review com checklist específico
- 🔒 Regras de segurança que devem ser aplicadas sempre
- 🧪 Convenções de testes que ninguém lembra de cabeça

**Com um Power**, o Kiro aplica tudo isso automaticamente quando o tema é mencionado.

---

## Tipo mais simples: Knowledge Base Power

Vamos criar um Power de **padrões de código do time** — sem MCP, só documentação.

### Estrutura mínima:

```
padroes-do-time/
└── POWER.md
```

Sim, **um único arquivo** é suficiente para criar um Power funcional.

---

## Passo 1: Criar o POWER.md

```markdown
---
name: "padroes-do-time"
displayName: "Padrões do Time"
description: "Guia de padrões de código, arquitetura e convenções do time de backend"
keywords: ["padrões", "convenções", "estilo", "código", "arquitetura", "backend"]
author: "Time Backend"
---

# Padrões do Time — Backend

## Estrutura de Projeto

Todos os microserviços devem seguir esta estrutura:

```
src/
├── handlers/       ← Entry points (Lambda handlers, controllers)
├── services/       ← Lógica de negócio
├── repositories/   ← Acesso a dados
├── models/         ← Tipos e interfaces
├── utils/          ← Funções utilitárias
└── config/         ← Configurações
```

## Convenções de Código

### Nomenclatura
- Arquivos: `kebab-case` (ex: `criar-usuario.mjs`)
- Funções: `camelCase` (ex: `criarUsuario()`)
- Classes: `PascalCase` (ex: `UsuarioService`)
- Constantes: `UPPER_SNAKE_CASE` (ex: `MAX_TENTATIVAS`)

### Funções
- Máximo 30 linhas por função
- Sempre async/await (nunca .then/.catch)
- Retorno explícito (nunca implícito)

### Tratamento de Erros
- Sempre usar try/catch em handlers
- Log estruturado com contexto
- Nunca expor stack trace na resposta HTTP

## Padrões de API

### Respostas HTTP
```json
{
  "sucesso": true,
  "dados": { ... },
  "mensagem": "Operação realizada"
}
```

### Códigos de Status
- 200: Sucesso
- 201: Criado
- 400: Erro de validação
- 404: Não encontrado
- 500: Erro interno (logar, não expor detalhes)

## Testes

- Padrão de nome: `deve [ação] quando [condição]`
- Cobertura mínima: 80%
- Sempre testar cenário de sucesso E de erro
- Usar mocks para dependências externas
```

---

## Passo 2: O Frontmatter (cabeçalho YAML)

O frontmatter é **obrigatório** e define os metadados do Power:

```yaml
---
name: "padroes-do-time"          # Identificador único (kebab-case)
displayName: "Padrões do Time"   # Nome legível
description: "..."               # 1-3 frases sobre o que faz
keywords: ["padrão", "código"]   # Palavras que ativam o Power
author: "Time Backend"           # Quem criou
---
```

### Keywords — a parte mais importante

Keywords determinam **quando** o Kiro ativa seu Power. Escolha palavras que o time usa naturalmente:

```yaml
# ❌ Ruim — muito genérico
keywords: ["código", "ajuda"]

# ✅ Bom — específico e variado
keywords: ["padrões", "convenções", "estilo", "código", "arquitetura", "backend", "microserviço"]
```

---

## Passo 3: Adicionar Steering (opcional)

Se o POWER.md ficar muito grande (>500 linhas), divida em steering files:

```
padroes-do-time/
├── POWER.md              ← Overview + referência rápida
└── steering/
    ├── api-patterns.md   ← Padrões de API detalhados
    ├── testing.md        ← Guia completo de testes
    └── security.md       ← Checklist de segurança
```

O POWER.md passa a ser um índice, e os steering files são carregados sob demanda.

---

## Passo 4: Adicionar MCP (opcional)

Se quiser que o Power tenha **ferramentas** (não só documentação), adicione um `mcp.json`:

```
padroes-do-time/
├── POWER.md
├── mcp.json              ← Configuração do MCP server
└── steering/
    └── ...
```

Exemplo de `mcp.json` para um server local:

```json
{
  "mcpServers": {
    "padroes-lint": {
      "command": "node",
      "args": ["./mcp-server/index.js"],
      "env": {
        "CONFIG_PATH": "./config.json"
      }
    }
  }
}
```

> Para este treinamento, vamos focar no **Knowledge Base Power** (sem MCP). É o mais útil e rápido de criar.

---

## Onde colocar o Power para testar?

### Opção 1: Via painel de Powers (recomendado)

1. `Ctrl + Shift + P` → `Configure Powers`
2. Procure a opção de instalar de **diretório local**
3. Aponte para a pasta do seu Power

### Opção 2: Na pasta do workspace

Coloque dentro de `.kiro/` do projeto — o Kiro reconhece automaticamente.

---

## Checklist de criação

- [ ] Pasta com nome em `kebab-case`
- [ ] `POWER.md` com frontmatter válido (name, displayName, description)
- [ ] Keywords relevantes (5-7 palavras)
- [ ] Conteúdo prático com exemplos de código
- [ ] Se >500 linhas, dividir em steering files
- [ ] Testar: mencionar uma keyword no chat e ver se ativa

---

## Resumo

- Power mínimo = 1 arquivo (`POWER.md` com frontmatter)
- Frontmatter define metadados: name, displayName, description, keywords, author
- Keywords determinam quando o Power é ativado
- Steering files dividem conteúdo grande em partes sob demanda
- MCP é opcional — Knowledge Base Powers são poderosos sem ele
- Teste instalando localmente antes de compartilhar

---

> 📌 **Próximo**: [Módulo 05 — Compartilhando com o time](05-compartilhando-com-o-time.md)
