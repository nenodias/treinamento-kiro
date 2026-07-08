# 🎯 Módulo 02 — Tipos de Triggers e Ações

> ⏱️ Tempo estimado: ~7 minutos

---

## Tipos de Triggers (Eventos)

O Kiro suporta **10 tipos de eventos** que podem disparar hooks:

---

### 📁 Eventos de Arquivo

| Trigger | Quando dispara | Exemplo de uso |
|---------|----------------|----------------|
| **File Save** | Arquivo salvo | Rodar lint, atualizar docs |
| **File Create** | Arquivo criado | Gerar boilerplate, adicionar headers |
| **File Delete** | Arquivo deletado | Limpar imports, manter integridade |

> 💡 Esses triggers aceitam **file patterns** como `*.ts`, `src/**/*.jsx`

---

### 💬 Eventos de Prompt/Agent

| Trigger | Quando dispara | Exemplo de uso |
|---------|----------------|----------------|
| **Prompt Submit** | Usuário envia prompt | Adicionar contexto, bloquear prompts |
| **Agent Stop** | Agente termina execução | Compilar, formatar, review automático |

---

### 🔧 Eventos de Ferramenta

| Trigger | Quando dispara | Exemplo de uso |
|---------|----------------|----------------|
| **Pre Tool Use** | Antes de executar tool | Bloquear operações, validar segurança |
| **Post Tool Use** | Depois de executar tool | Auditar, formatar, instruir agente |

> 💡 Filtros de tools disponíveis:
> - `read` — ferramentas de leitura
> - `write` — ferramentas de escrita
> - `shell` — ferramentas de terminal
> - `web` — ferramentas web
> - `*` — todas as ferramentas
> - `@mcp` — ferramentas de MCP servers

---

### 📋 Eventos de Task (Specs)

| Trigger | Quando dispara | Exemplo de uso |
|---------|----------------|----------------|
| **Pre Task Execution** | Antes de iniciar task | Setup, validar pré-requisitos |
| **Post Task Execution** | Depois de completar task | Rodar testes, gerar docs |

---

### 🖱️ Evento Manual

| Trigger | Quando dispara | Exemplo de uso |
|---------|----------------|----------------|
| **Manual Trigger** | Usuário clica no hook | Code review on-demand, scan de segurança |

---

## Tipos de Ações

Depois que o evento dispara, o hook executa uma **ação**. Existem duas:

---

### 🤖 Ask Kiro (Agent Prompt)

Envia um prompt para o agente executar.

```
"Revise os arquivos alterados buscando problemas de segurança"
```

**Características:**
- Usa linguagem natural
- O agente pode ler/escrever arquivos, executar comandos
- Consome créditos (gera uma interação com o LLM)
- Ideal para tarefas que exigem raciocínio e contexto

---

### ⚙️ Run Command (Shell Command)

Executa um comando no terminal.

```
npm run lint --fix
```

**Características:**
- Execução local, rápida e determinística
- **Não consome créditos**
- Exit code `0` → stdout vai pro contexto do agente
- Exit code `≠ 0` → stderr vai pro agente + bloqueia a ação (em Pre Tool Use e Prompt Submit)
- Timeout padrão: 60 segundos

---

## Quando usar cada ação?

| Cenário | Ação recomendada |
|---------|-----------------|
| Rodar lint/testes | Run Command |
| Review de código inteligente | Ask Kiro |
| Formatar arquivo | Run Command |
| Gerar documentação | Ask Kiro |
| Bloquear operação perigosa | Run Command (exit code ≠ 0) |
| Verificar padrões de design | Ask Kiro |

---

## Estrutura de um Hook (JSON)

```json
{
  "name": "Lint ao Salvar",
  "version": "1.0.0",
  "description": "Roda ESLint quando arquivos TypeScript são salvos",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.tsx"]
  },
  "then": {
    "type": "runCommand",
    "command": "npx eslint --fix ${file}"
  }
}
```

---

## Resumo

- **10 tipos de triggers**: arquivos, prompts, tools, tasks, manual
- **2 tipos de ações**: Ask Kiro (inteligente) e Run Command (rápido)
- Run Command não consome créditos e é mais rápido
- Ask Kiro é ideal para tarefas que precisam de raciocínio
- Hooks ficam em `.kiro/hooks/` como arquivos JSON

---

> 📌 **Próximo**: [Módulo 03 — Exemplos práticos](03-exemplos-praticos.md)
