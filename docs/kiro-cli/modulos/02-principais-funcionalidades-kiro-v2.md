# Principais Funcionalidades do Kiro CLI v2

## Visão Geral

O Kiro CLI v2 é um agente de codificação IA que vive no terminal. Ele lê seu codebase, escreve código, executa comandos e pede confirmação antes de ações destrutivas. A filosofia central no CLI é o **Plan Agent** — planejamento estruturado antes de implementação.

```
Terminal → kiro-cli chat
    → Chat interativo com syntax highlighting
    → Custom Agents especializados
    → Headless mode para CI/CD
    → Sessões paralelas com /spawn
    → Steering, Hooks, MCP, Powers, Skills
```

---

## 1. Plan Agent (`/plan`)

Modo de planejamento que quebra ideias complexas em planos de implementação sem modificar código.

### Como usar

```bash
> /plan Build a REST API for user management with JWT authentication
```

O Plan Agent pesquisa na web, analisa o codebase e gera um plano detalhado com tasks sequenciadas.

### Características

- Não modifica código — apenas planeja
- Pesquisa web para informar decisões
- Analisa codebase existente para contexto
- Gera plano com tasks detalhadas

---

## 2. Steering (Documentos de Orientação)

Steering files são documentos Markdown que guiam o comportamento do agente em todas as interações.

### Tipos de steering

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `product.md` | Visão do produto, usuários-alvo, objetivos | "Sistema de e-commerce B2B" |
| `tech.md` | Stack, frameworks, convenções técnicas | "Node.js + TypeScript + Prisma" |
| `structure.md` | Organização de diretórios e arquivos | "src/modules/{feature}/" |
| Padrões customizados | Qualquer diretriz da equipe | "Sempre usar conventional commits" |

### Localização

```
.kiro/steering/          # Workspace (prioridade alta)
~/.kiro/steering/        # Global (prioridade baixa)
```

### Modos de inclusão

```yaml
---
inclusion: always        # Incluído em toda interação (padrão)
---
```

```yaml
---
inclusion: fileMatch
fileMatchPattern: '**/*.test.ts'
---
# Só ativa quando arquivos de teste estão no contexto
```

```yaml
---
inclusion: manual
---
# Só ativa quando o usuário referencia via #contexto
```

### Referências a arquivos externos

Steering files suportam inclusão de documentos via referência:

```markdown
Siga a API definida em #[[file:docs/openapi.yaml]]
```

Isso permite que specs OpenAPI, schemas GraphQL, ou qualquer documento influencie a geração de código.

---

## 3. Agent Hooks (Automação Event-Driven)

Hooks são automações que disparam quando eventos específicos ocorrem durante o trabalho com o agente.

### Triggers disponíveis

| Trigger | Quando dispara |
|---------|---------------|
| `PostFileSave` | Após salvar um arquivo |
| `PostFileCreate` | Após criar um arquivo |
| `PostFileDelete` | Após deletar um arquivo |
| `PreToolUse` | Antes de executar uma ferramenta |
| `PostToolUse` | Após executar uma ferramenta |
| `SessionStart` | Ao iniciar uma sessão |
| `UserPromptSubmit` | Ao enviar um prompt |
| `PreTaskExec` / `PostTaskExec` | Antes/após execução de task |
| `Stop` | Ao encerrar sessão |

### Tipos de ação

- **command** — Executa um comando shell
- **agent** — Injeta um prompt no contexto do modelo

### Exemplo: Lint automático ao salvar

```json
{
  "version": "v1",
  "hooks": [{
    "name": "Lint on Save",
    "trigger": "PostFileSave",
    "matcher": "\\.(ts|js)$",
    "action": {
      "type": "command",
      "command": "npx eslint --fix ${file}"
    }
  }]
}
```

### Exit codes (para `command`)

| Exit Code | Efeito |
|-----------|--------|
| `0` | Sucesso — stdout encaminhado ao contexto |
| `2` | Bloqueia a ação (PreToolUse, UserPromptSubmit, PreTaskExec) |
| Outro | Falha silenciosa, não bloqueia |

### Configuração

- Workspace: `.kiro/hooks/*.json`
- Global: `~/.kiro/hooks/*.json`

---

## 4. Custom Agents

Crie agentes especializados para diferentes workflows no terminal.

### Criando um agente

```bash
# Criação assistida por IA
> /agent create code-reviewer

# Com descrição e MCP servers
> /agent create code-reviewer -D "Revisão de código" -m code-analysis

# Criação manual via editor
> /agent create code-reviewer --manual
```

### O que cada agente define

- Ferramentas permitidas e permissões
- Contexto e steering específicos
- System prompt customizado
- Servidores MCP dedicados

### Gerenciando agentes

```bash
> /agent list           # Lista todos os agentes
> /agent swap reviewer  # Troca de agente em runtime
> /agent edit           # Edita agente atual
> /agent set-default    # Define agente padrão
```

### Lançando com agente específico

```bash
kiro-cli chat --agent code-reviewer
```

### Localização

```
.kiro/agents/        # Workspace
~/.kiro/agents/      # Global
```

---

## 5. MCP (Model Context Protocol)

O MCP permite que o agente se conecte a ferramentas externas e serviços.

### Configuração

```json
// .kiro/settings/mcp.json
{
  "mcpServers": {
    "github": {
      "command": "uvx",
      "args": ["github-mcp-server"],
      "env": { "GITHUB_TOKEN": "${env:GITHUB_TOKEN}" }
    },
    "trello": {
      "command": "npx",
      "args": ["-y", "trello-mcp-server"],
      "disabled": false
    }
  }
}
```

### Hierarquia de precedência

```
User (~/.kiro/settings/mcp.json)
  < Workspace 1 (.kiro/settings/mcp.json)
  < Workspace 2 (.kiro/settings/mcp.json)
```

### Comandos no CLI

```bash
> /mcp            # Visualiza servidores ativos
> /mcp auth       # Autentica servidor remoto (OAuth)
> /mcp logout     # Remove credenciais de um servidor
```

---

## 6. Powers (Expertise Just-in-Time)

Powers são pacotes que adicionam conhecimento especializado e ferramentas ao agente sob demanda.

### O que incluem?

- Documentação e guias de workflow (steering files)
- Servidores MCP opcionais (ferramentas extras)
- Keywords de ativação automática

### Como funcionam?

Quando keywords específicas aparecem no chat (ex: "Stripe", "Postgres", "Trello"), o Power correspondente é ativado automaticamente, carregando conhecimento especializado no contexto do agente.

### Exemplo de uso

```bash
# Listar powers instalados
> /tools powers

# Usar um power explicitamente
> Preciso integrar pagamentos com Stripe
# → Power "stripe" ativa automaticamente com docs e tools
```

### Criando seus próprios Powers

Powers customizados podem ser criados com:
- `POWER.md` — Documentação principal
- Steering files específicos
- Configuração de MCP servers dedicados

---

## 7. Skills

Skills são unidades de expertise ativáveis por keyword ou comando.

### Características

- Ativação por palavras-chave detectadas no prompt
- Carregam instruções especializadas no contexto
- Podem ser combinadas com Powers e Steering
- Definidas em `.kiro/skills/`

### Exemplo

```json
{
  "name": "card-readiness-check",
  "triggers": ["verificar card", "card está pronto?", "readiness check"],
  "description": "Verifica se um card do Trello tem info suficiente para refinamento"
}
```

---

## 8. Headless Mode (CI/CD)

O headless mode permite executar o Kiro CLI de forma não-interativa em pipelines automatizados.

### Setup

```bash
export KIRO_API_KEY="sua-api-key"
```

### Uso básico

```bash
kiro-cli chat --no-interactive "Analise o código e gere testes unitários"
```

### Flags importantes

| Flag | Descrição |
|------|-----------|
| `--no-interactive` | Modo headless (não espera input) |
| `--trust-all-tools` | Confia em todas as ferramentas |
| `--trust-tools` | Confia em ferramentas específicas |
| `--print` | Executa prompt e imprime resultado |

### Exemplo: Script de CI/CD

```bash
#!/bin/bash
git checkout -b fix/deploy-issue
kiro-cli --print "Analise os logs de falha e aplique um fix."
git add -A && git commit -m "fix: resolve deploy failure"
git push origin fix/deploy-issue
gh pr create --title "fix: resolve deploy failure"
```

### Casos de uso

- Code review automatizado em PRs
- Geração de testes em pipelines
- Troubleshooting de falhas de build
- Documentação automática
- Análise de segurança

---

## 9. Spawn — Sessões Paralelas (`/spawn`)

Executa tarefas em paralelo sem bloquear a conversa principal.

### Uso

```bash
> /spawn --name test-analysis Analise a cobertura de testes e sugira melhorias
```

### Monitoramento

Monitore sessões paralelas com `Ctrl+G` (crew monitor).

### Quando usar

- Pesquisa em paralelo enquanto implementa
- Tarefas independentes simultâneas
- Análise de codebase em background

---

## 10. Goal Mode (`/goal`)

Loop iterativo onde o agente trabalha autonomamente até atingir um objetivo.

### Uso

```bash
> /goal --max 10 Migrar todos os testes de Jest para Vitest e garantir que passam
```

### Comportamento

- O agente executa, verifica resultado, corrige se necessário
- Repete até atingir o objetivo ou o limite de iterações
- Verificação automática de completion antes de parar

---

## 11. Knowledge Base (`/knowledge`)

Busca semântica em arquivos indexados.

### Comandos

```bash
> /knowledge add --name docs --path ./docs    # Indexa diretório
> /knowledge search "authentication flow"     # Busca semântica
> /knowledge show                             # Lista bases indexadas
```

### Quando usar

- Projetos com muita documentação
- Busca por conceitos (não apenas texto literal)
- Manter contexto relevante acessível

---

## 12. Rewind (`/rewind`)

Fork da conversa em um ponto anterior para explorar caminhos alternativos.

### Uso

```bash
> /rewind      # Picker interativo (mostra o que aconteceu em cada turn)
> /rewind 4    # Volta para turn 4 diretamente
```

### Quando usar

- Explorar abordagem diferente após resultado insatisfatório
- Testar variações de implementação
- Recuperar de decisões erradas sem perder contexto

---

## 13. Code Intelligence (`/code`)

Integração com LSP para análise inteligente de código (18 linguagens).

### Comandos

```bash
> /code init       # Inicializa LSP para o workspace
> /code overview   # Overview da estrutura do projeto
> /code status     # Status dos servers LSP ativos
```

### Capabilities

- Go to definition
- Find references
- Hover (tipo/documentação)
- Completions
- Diagnostics (erros/warnings)
- Rename symbol
- Pattern search (AST)

---

## 14. Modelos e Roteamento

O Kiro CLI usa **multi-model routing** via Amazon Bedrock.

| Modelo | Uso |
|--------|-----|
| Claude Sonnet | Raciocínio pesado, planejamento, design |
| Amazon Nova | Geração de código em alto throughput |
| Auto (padrão) | Seleção dinâmica baseada na tarefa |

### Comandos

```bash
> /model          # Seleciona modelo (persiste entre sessões)
> /effort high    # Nível de raciocínio (low, medium, high, max)
```

---

## 15. Subagents e Orquestração

O CLI pode delegar tarefas a sub-agentes especializados que rodam em contexto isolado.

### Sub-agentes disponíveis

| Sub-agent | Função |
|-----------|--------|
| `context-gatherer` | Explora codebase e identifica arquivos relevantes |
| `general-task-execution` | Executa tarefas bem definidas em paralelo |
| `semantic_reviewer` | Review de código no nível comportamental |
| `custom-agent-creator` | Cria novos agentes customizados |

### Orquestração (pipelines)

```
Agente Principal
  ├── Sub-Agent: Pesquisa (context-gatherer)
  ├── Sub-Agent: Implementação (general-task-execution)
  └── Sub-Agent: Review (semantic_reviewer)
```

Sub-agentes podem ser encadeados em pipelines com dependências entre estágios.

---

## Resumo: Funcionalidades do Kiro CLI v2

```
┌────────────────────────────────────────────────────────────┐
│                    KIRO CLI v2                              │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Chat Interativo                                           │
│  ├── /plan          → Planejamento estruturado             │
│  ├── /spawn         → Sessões paralelas                    │
│  ├── /goal          → Loop autônomo com verificação        │
│  ├── /rewind        → Fork em ponto anterior               │
│  ├── /knowledge     → Busca semântica                      │
│  ├── /code          → Code intelligence (LSP)              │
│  ├── /model         → Seleção de modelo                    │
│  ├── /effort        → Nível de raciocínio                  │
│  ├── /agent         → Custom agents                        │
│  ├── /mcp           → Servidores MCP                       │
│  └── /hooks         → Automações event-driven              │
│                                                            │
│  Configuração (.kiro/)                                     │
│  ├── steering/      → Orientação do agente                 │
│  ├── hooks/         → Automações                           │
│  ├── agents/        → Agentes customizados                 │
│  ├── skills/        → Expertise ativável                   │
│  └── settings/      → MCP, tema, keybindings               │
│                                                            │
│  Headless Mode                                             │
│  ├── --no-interactive  → Sem input humano                  │
│  ├── --print           → Output direto                     │
│  ├── --trust-all-tools → Sem prompts de permissão          │
│  └── KIRO_API_KEY      → Auth para CI/CD                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Links de Referência

| Recurso | URL |
|---------|-----|
| CLI Docs | https://kiro.dev/docs/cli/ |
| Quick Start | https://kiro.dev/docs/cli/quick-start/ |
| Custom Agents | https://kiro.dev/docs/cli/custom-agents/ |
| Headless Mode | https://kiro.dev/docs/cli/headless/ |
| Steering | https://kiro.dev/docs/cli/steering/ |
| Hooks | https://kiro.dev/docs/cli/hooks/ |
| MCP | https://kiro.dev/docs/cli/mcp/ |
| Slash Commands | https://kiro.dev/docs/cli/reference/slash-commands/ |
| CLI Commands | https://kiro.dev/docs/cli/reference/cli-commands/ |
| Changelog | https://kiro.dev/changelog/cli/ |

---

> Conteúdo compilado a partir da documentação oficial do Kiro CLI (kiro.dev) e fontes públicas. Informações parafraseadas para conformidade com restrições de licenciamento.
