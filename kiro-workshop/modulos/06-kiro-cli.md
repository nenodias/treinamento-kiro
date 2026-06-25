# 🖥️ Módulo 06 — Kiro CLI: IA no Terminal

---

## O que é

A mesma IA do Kiro IDE, mas no terminal. Chat interativo, autocomplete, custom agents, e acesso total ao sistema de arquivos.

---

## Comandos principais

| Comando | O que faz |
|---------|-----------|
| `kiro` | Abre chat interativo (padrão) |
| `kiro "prompt"` | Executa prompt direto e sai |
| `kiro --resume` | Retoma última sessão |
| `kiro --agent nome` | Usa um custom agent específico |
| `kiro --model claude-sonnet-4` | Escolhe o modelo |

---

## Chat interativo

```bash
$ kiro

> Crie um endpoint para listar tarefas com paginação
```

O agente lê arquivos, escreve código, executa comandos — tudo no terminal.

### Slash commands dentro do chat

| Comando | O que faz |
|---------|-----------|
| `/plan` | Gera plano de implementação |
| `/paste` | Cola conteúdo do clipboard |
| `/code overview` | Resumo da estrutura do workspace |
| `/compact` | Compacta o contexto |

---

## Autocomplete

Sugestões em tempo real ao digitar comandos:

```bash
$ kiro --m[TAB]
--model    --max-turns
```

---

## Custom Agents na CLI

Mesmos arquivos `.kiro/agents/` do IDE — ou JSON em `.kiro/agents/`:

```bash
# Usar um agent específico
$ kiro --agent code-reviewer

# Listar agents disponíveis
$ kiro --list-agents
```

---

## Headless Mode (CI/CD)

Rodar Kiro em pipelines sem terminal interativo:

```bash
$ kiro --headless --api-key $KIRO_KEY "Revise o código e gere um relatório"
```

Ideal para: code review automático em PR, geração de testes no CI, documentação.

---

## Demo rápida

```bash
# Abrir chat no projeto
cd projeto-demo
kiro

# Dentro do chat:
> Explique a arquitetura deste projeto
> /code overview
> Adicione tratamento de erros no handler de listar tarefas
```

---

> 📌 [Docs: CLI](https://kiro.dev/docs/cli/) | [Quick Start](https://kiro.dev/docs/cli/quick-start/)
