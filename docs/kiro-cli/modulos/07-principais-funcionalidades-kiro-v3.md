# Principais Funcionalidades do Kiro CLI v3

## Visão Geral

O Kiro CLI 3.0 (Early Access) é construído sobre o **mesmo unified agent harness** que alimenta o Kiro IDE e o Kiro Web. Toda melhoria no engine (novas ferramentas, melhor planejamento, seleção de tools mais inteligente) agora é entregue simultaneamente para todas as superfícies.

```
┌─────────────────────────────────────────────┐
│          Unified Agent Harness              │
│  (mesmo engine para IDE, CLI e Web)         │
├─────────────────────────────────────────────┤
│  Kiro IDE  │  Kiro CLI v3  │  Kiro Web     │
│  (desktop) │  (terminal)   │  (cloud)      │
└─────────────────────────────────────────────┘
```

### Como ativar

```bash
kiro-cli --v3
```

O v3 roda lado a lado com a instalação 2.x existente — sem disruption no setup atual.

---

## 1. Spec-Driven Development no Terminal

A feature mais significativa do v3: o **Spec Agent** é um agente built-in que traz desenvolvimento estruturado para o terminal.

### O que faz?

O Spec Agent pensa em requisitos e design ANTES de escrever código, depois executa um plano de implementação com **verificação entre cada task**.

### Workflow

```
/spec new <nome>
    → Define requisitos
    → Gera design técnico
    → Executa tasks com checkpoints
    → Verifica resultado de cada step antes de avançar
```

### Comandos

```bash
> /spec new user-auth       # Cria uma nova spec
> /spec list                # Lista specs existentes
> /spec resume              # Retoma spec em progresso
```

### Diferença do /plan (v2)

| v2 `/plan` | v3 `/spec` |
|-------------|------------|
| Gera plano mas não executa | Gera plano E executa com verificação |
| Sem checkpoints | Checkpoints entre tasks |
| Agente externo | Built-in no unified engine |
| Sem rastreamento | Rastreia progresso task a task |

---

## 2. Permissions — Modelo Declarativo e Auditável

O v3 substitui o modelo v2 de "press Y para tudo" por um sistema de **permissões declarativas** baseado em regras.

### Conceito

Escreva UMA regra para permitir comandos `npm *` e ela se aplica em toda sessão — sem mais "y" em cada invocação de shell.

### Formato: `permissions.yaml`

```yaml
# ~/.kiro/settings/permissions.yaml (user scope)
# .kiro/settings/permissions.yaml  (workspace scope)

rules:
  # DENY — piso de segurança. Nada abaixo pode sobrescrever.
  - capability: filesystem
    effect: deny
    match:
      - "**/.env"
      - "**/.env.*"
      - "**/*.pem"
      - "**/*.key"
      - "**/id_rsa*"
      - "**/.ssh/**"
      - "**/.aws/credentials"
      - "**/*.tfstate"

  - capability: shell
    effect: deny
    match:
      - "rm -rf /*"
      - "sudo *"
      - "git push --force*"
      - "git push -f*"
      - "* --no-verify"

  # ASK — única fricção que você sente
  - capability: shell
    effect: ask
    match:
      - "git push*"
      - "npm publish*"
      - "docker push*"
      - "terraform apply*"
      - "terraform destroy*"
      - "aws iam *"

  # ALLOW — sem prompts
  - capability: fs_read
    effect: allow

  - capability: fs_write
    effect: allow
    match:
      - "./**"
    exclude:
      - ".github/workflows/**"
      - "**/Dockerfile"
      - "**/*.lock"

  - capability: shell
    effect: allow

  - capability: web_search
    effect: allow

  - capability: mcp
    effect: allow
    match:
      - "github/*"
```

### Hierarquia de efeitos

```
deny > ask > allow
```

Regras restritivas SEMPRE vencem — não podem ser sobrescritas de nenhum escopo.

### Capabilities disponíveis

| Capability | Descrição |
|-----------|-----------|
| `filesystem` | Leitura e escrita de arquivos (combinado) |
| `fs_read` | Apenas leitura de arquivos |
| `fs_write` | Apenas escrita de arquivos |
| `shell` | Execução de comandos no terminal |
| `web_search` | Pesquisa web |
| `web_fetch` | Busca de conteúdo de URLs |
| `mcp` | Ferramentas de servidores MCP |

### Escopos

- **User** (`~/.kiro/settings/permissions.yaml`) — Aplica globalmente
- **Workspace** (`.kiro/settings/permissions.yaml`) — Aplica ao projeto
- **Agent** (inline no arquivo do agente) — Aplica ao agente específico

---

## 3. Tag-Based Agent Configuration

Agentes no v3 são **auto-contidos e portáveis**: um arquivo Markdown com tudo embutido.

### Formato

```markdown
---
name: code-reviewer
description: Revisão de código focada em segurança
tools:
  - read
  - web
permissions:
  rules:
    - capability: fs_write
      effect: deny
    - capability: shell
      effect: deny
mcp:
  servers:
    github:
      command: uvx
      args: [github-mcp-server]
---

Você é um revisor de código especializado em segurança.
Analise código buscando vulnerabilidades, más práticas e problemas de performance.
Nunca modifique arquivos — apenas reporte findings.
```

### Tags de ferramentas

| Tag | O que inclui |
|-----|-------------|
| `read` | Todas as ferramentas de leitura de arquivos |
| `write` | Todas as ferramentas de escrita de arquivos |
| `shell` | Todas as ferramentas de execução de comandos |
| `web` | Busca web e fetch de URLs |
| `spec` | Ferramentas de specs |
| `*` | Todas as ferramentas (built-in e MCP) |

### Vantagens sobre v2

| v2 | v3 |
|----|-----|
| Configuração JSON complexa | Arquivo Markdown simples |
| Tools listadas individualmente | Tags por categoria |
| Permissões separadas | Permissões inline |
| MCP separado | MCP embutido no agente |
| Não auto-atualiza | Novas tools na categoria entram automaticamente |

### Migração

```bash
> /upgrade-agent    # Converte agentes v2 para formato v3
```

O comando preserva configurações existentes e faz backup antes de alterar.

### Localização

```
.kiro/agents/        # Workspace
~/.kiro/agents/      # Global
```

---

## 4. Enhanced Hooks (Formato Standalone)

Hooks no v3 usam **arquivos standalone com schema versionado**, dois tipos de ação, e novos triggers de lifecycle.

### Novos triggers no v3

| Trigger | Descrição | Novo no v3? |
|---------|-----------|:-----------:|
| `PreToolUse` | Antes de executar ferramenta | |
| `PostToolUse` | Após executar ferramenta | |
| `PostFileSave` | Após salvar arquivo | |
| `PostFileCreate` | Após criar arquivo | |
| `PostFileDelete` | Após deletar arquivo | Sim |
| `SessionStart` | Início da sessão | |
| `UserPromptSubmit` | Ao enviar prompt | |
| `PreTaskExec` | Antes de executar task de spec | Sim |
| `PostTaskExec` | Após executar task de spec | Sim |
| `Stop` | Fim da sessão | |
| Manual | Invocação manual via slash command | Sim |

### Formato do arquivo (v3)

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "Security Check on Commit",
      "trigger": "PreToolUse",
      "matcher": "shell",
      "action": {
        "type": "command",
        "command": "node .kiro/scripts/check-secrets.js"
      }
    },
    {
      "name": "Update README on file create",
      "trigger": "PostFileCreate",
      "matcher": "src/**/*.ts",
      "action": {
        "type": "agent",
        "prompt": "Atualize o README.md com a nova estrutura de arquivos."
      }
    }
  ]
}
```

### Tipos de ação

| Tipo | Descrição | Quando usar |
|------|-----------|------------|
| `command` | Executa shell command | Linting, formatação, validação |
| `agent` | Injeta prompt no contexto | Documentação, análise, sugestões |

### Global Hooks

No v3, hooks em `~/.kiro/hooks/` disparam em **todos os workspaces** automaticamente:
- Comportamentos cross-cutting (lint, security, approval gates)
- Não precisam ser duplicados por projeto
- Hooks de workspace continuam funcionando ao lado dos globais

### Exit codes (para `command`)

| Exit Code | Efeito |
|-----------|--------|
| `0` | Sucesso — stdout encaminhado ao contexto |
| `2` | Bloqueia a ação (PreToolUse, UserPromptSubmit, PreTaskExec) |
| Outro | Falha silenciosa, não bloqueia |

### Manual Hooks

Hooks com trigger manual aparecem no menu de slash commands:

```bash
> /hooks             # Lista hooks ativos
> /run-hook <nome>   # Executa hook manualmente
```

---

## 5. Introspect Subagent

Agente built-in que responde perguntas sobre o próprio Kiro.

### O que faz?

- Explica capabilities do Kiro
- Guia na criação de custom agents, hooks e steering files
- Sugere configurações para seu workflow
- Ensina slash commands e features

### Uso

O introspect é invocado automaticamente quando perguntas sobre o Kiro são detectadas, ou via sub-agent delegation.

### Exemplos de perguntas que ativam

```
"Como criar um hook que roda lint ao salvar?"
"Qual a diferença entre steering e agents?"
"Como configuro MCP para o GitHub?"
"Quais slash commands estão disponíveis?"
```

---

## 6. Unified Engine — Convergência das Plataformas

### O que muda na prática

| Aspecto | v2 (standalone) | v3 (unified) |
|---------|-----------------|--------------|
| Engine | Específico do CLI | Mesmo do IDE e Web |
| Features novas | Chegam separadamente | Chegam simultaneamente |
| Formato de agentes | JSON proprietário | Markdown universal |
| Hooks | Vinculados ao CLI | Portáveis entre superfícies |
| Permissões | Por ferramenta individual | Por capability (categorias) |
| Specs | Não existiam no CLI | Built-in via Spec Agent |

### Implicação prática

Um agente criado no CLI v3 funciona no IDE e vice-versa. Hooks e steering são compartilhados sem adaptação.

---

## 7. Comparação Rápida: v2 vs v3

| Feature | CLI v2 | CLI v3 |
|---------|--------|--------|
| Specs no terminal | Via `/plan` (só planeja) | `/spec` (planeja + executa + verifica) |
| Permissões | `--trust-all-tools` ou "Y" por ação | Declarativo via `permissions.yaml` |
| Formato de agentes | JSON com lista de tools | Markdown com tags |
| Hooks | Formato básico | Standalone + novos triggers + global |
| Tool discovery | Manual | Automática (novas tools em categorias) |
| Introspect | Não existe | Built-in subagent |
| Migração de agentes | — | `/upgrade-agent` |
| Engine | Próprio | Unified (IDE + CLI + Web) |
| Subagents | `/spawn` | Pipelines com dependências |

---

## 8. Novos Slash Commands do v3

| Comando | Descrição |
|---------|-----------|
| `/spec new <nome>` | Inicia spec-driven development |
| `/spec list` | Lista specs |
| `/spec resume` | Retoma spec em progresso |
| `/upgrade-agent` | Migra agente v2 para formato v3 |
| `/run-hook <nome>` | Executa hook com trigger manual |

Os comandos v2 continuam funcionando normalmente no modo v3.

---

## 9. Migração v2 → v3

### Passo a passo

```bash
# 1. Ative o v3
kiro-cli --v3

# 2. Migre seus agentes
> /upgrade-agent

# 3. Crie permissions.yaml
# (opcional — se não criar, funciona com prompts interativos)

# 4. Hooks existentes continuam funcionando
# (formato v1 é compatível com v3)
```

### O que permanece compatível

- Steering files (sem mudanças)
- MCP config (sem mudanças)
- Skills (sem mudanças)
- Hooks existentes (formato v1 funciona)
- Sessões e histórico

### O que muda

- Agentes: novo formato Markdown com tags (migração via `/upgrade-agent`)
- Permissões: novo sistema declarativo `permissions.yaml`
- Specs: nova funcionalidade exclusiva do v3

---

## 10. Exemplos Práticos

### Exemplo 1: Agente de DevOps (formato v3)

```markdown
---
name: devops
description: Gerenciamento de infraestrutura AWS
tools:
  - read
  - write
  - shell
  - web
permissions:
  rules:
    - capability: shell
      effect: allow
      match:
        - "aws *"
        - "terraform *"
        - "docker *"
    - capability: shell
      effect: ask
      match:
        - "terraform apply*"
        - "terraform destroy*"
mcp:
  servers:
    aws-docs:
      command: uvx
      args: [awslabs.aws-documentation-mcp-server@latest]
---

Você é um engenheiro DevOps especializado em AWS.
Use Terraform para IaC e siga as melhores práticas de segurança.
Sempre valide planos antes de aplicar.
```

### Exemplo 2: Permissions de equipe

```yaml
# .kiro/settings/permissions.yaml (workspace - compartilhado via git)
rules:
  # Equipe pode ler tudo
  - capability: fs_read
    effect: allow

  # Pode escrever no src/ sem prompt
  - capability: fs_write
    effect: allow
    match:
      - "src/**"
      - "tests/**"

  # Precisa confirmar para CI/CD
  - capability: fs_write
    effect: ask
    match:
      - ".github/**"
      - "Dockerfile"

  # Nunca toca em secrets
  - capability: filesystem
    effect: deny
    match:
      - "**/.env*"
      - "**/secrets*"

  # Shell: build e test liberados
  - capability: shell
    effect: allow
    match:
      - "npm *"
      - "npx *"
      - "node *"
      - "jest *"
      - "vitest *"
      - "git status"
      - "git diff*"
      - "git log*"
```

### Exemplo 3: Hook com trigger manual

```json
{
  "version": "v1",
  "hooks": [
    {
      "name": "Generate API Docs",
      "trigger": "Manual",
      "action": {
        "type": "agent",
        "prompt": "Analise todos os arquivos em src/routes/ e gere documentação OpenAPI atualizada em docs/openapi.yaml"
      }
    }
  ]
}
```

Uso:
```bash
> /run-hook Generate API Docs
```

---

## Resumo Visual: Arquitetura v3

```
┌──────────────────────────────────────────────────────────────┐
│                     KIRO CLI v3                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Unified Agent Harness                      │  │
│  │   (shared com IDE e Web — features chegam juntas)      │  │
│  └───────────────────────┬────────────────────────────────┘  │
│                          │                                    │
│  ┌───────────┐  ┌───────┴──────┐  ┌──────────────────────┐  │
│  │ Spec Agent│  │ Custom Agents│  │ Introspect Subagent  │  │
│  │ (built-in)│  │  (Markdown)  │  │   (built-in)         │  │
│  └───────────┘  └──────────────┘  └──────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                Permissions Layer                        │  │
│  │   deny > ask > allow (declarativo, auditável)         │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                Enhanced Hooks                          │  │
│  │   Standalone files + Global + Manual triggers         │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌───────────┐  │
│  │ Steering │  │   MCP    │  │  Powers   │  │  Skills   │  │
│  └──────────┘  └──────────┘  └───────────┘  └───────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Links de Referência

| Recurso | URL |
|---------|-----|
| CLI v3 Docs | https://kiro.dev/docs/cli/v3/ |
| Feature Comparison | https://kiro.dev/docs/cli/v3/feature-overview/ |
| Agent Config v3 | https://kiro.dev/docs/cli/v3/agent-config/ |
| Permissions v3 | https://kiro.dev/docs/cli/v3/permissions/ |
| Hooks v3 | https://kiro.dev/docs/cli/v3/hooks/ |
| Specs in CLI | https://kiro.dev/docs/cli/v3/specs/ |
| Changelog (v3 Early Access) | https://kiro.dev/changelog/cli/2-8/ |
| Introspect + Global Hooks | https://kiro.dev/changelog/cli/ |
| Custom Agents (migração) | https://kiro.dev/docs/cli/custom-agents/ |

---

> Conteúdo compilado a partir da documentação oficial do Kiro (kiro.dev) e fontes públicas. Informações parafraseadas para conformidade com restrições de licenciamento.
