# 🪝 Módulo 03 — Hooks: Automação Baseada em Eventos

---

## O que são

Hooks são **triggers automáticos**: quando um evento acontece na IDE, uma ação é executada.

```
EVENTO detectado → AÇÃO executada
```

---

## Eventos disponíveis

| Evento | Quando dispara |
|--------|----------------|
| `fileEdited` | Arquivo salvo |
| `fileCreated` | Arquivo novo criado |
| `fileDeleted` | Arquivo deletado |
| `promptSubmit` | Mensagem enviada ao chat |
| `agentStop` | Agente termina execução |
| `preToolUse` | Antes de usar uma ferramenta |
| `postToolUse` | Depois de usar uma ferramenta |
| `userTriggered` | Botão manual clicado |

---

## Ações possíveis

| Ação | O que faz |
|------|-----------|
| `askAgent` | Envia um prompt ao agente |
| `runCommand` | Executa comando shell |

---

## Exemplo: lint ao salvar

**Arquivo**: `.kiro/hooks/lint-on-save.json`

```json
{
  "name": "Lint on Save",
  "version": "1.0.0",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.mjs", "*.js"]
  },
  "then": {
    "type": "runCommand",
    "command": "npm run lint"
  }
}
```

---

## Exemplo: auto-review após geração

```json
{
  "name": "Auto Review",
  "version": "1.0.0",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Revise o código que você acabou de gerar. Verifique: credenciais hardcoded? Inputs não validados? try/catch presente?"
  }
}
```

---

## Como criar

**Via chat** (mais rápido):
```
Prompt: "Crie um hook que rode npm run lint ao salvar arquivos .mjs"
```

**Via UI**: Painel Agent Hooks → `+` → Preencher formulário

---

## Demo rápida

1. Pedir ao Kiro para criar o hook de lint
2. Editar um arquivo e salvar
3. Mostrar o lint rodando automaticamente

---

> 📌 [Docs: Hooks](https://kiro.dev/docs/hooks/)
