# 03 — Chat Agêntico

## 💡 Em uma frase

> "Não é só perguntar e receber resposta. O chat lê seus arquivos, edita código e roda comandos por você."

---

## Como iniciar

```bash
kiro-cli                    # abre o chat
kiro-cli chat "pergunta"   # pergunta direto sem abrir
```

Pronto. Você tá dentro.

---

## O que ele consegue fazer

- 📖 Ler arquivos do projeto
- ✏️ Criar e editar código
- ⚡ Executar comandos no terminal
- 🔍 Navegar pela estrutura do projeto
- 🌐 Buscar informações na web

Tudo isso **dentro da conversa**, sem sair do terminal.

---

## Executar comandos rápidos

Dentro do chat, prefixe com `!` pra rodar algo direto:

```
> !npm start
> !git status
> !curl http://localhost:3000/api/health
```

Não passa pela IA — executa na hora.

---

## Comandos úteis dentro do chat

| Comando | Pra que serve |
|---------|---------------|
| `/context show` | Ver o que a IA tá enxergando |
| `/context add "src/**"` | Dar mais contexto pra IA |
| `/model` | Trocar o modelo |
| `/tools trust-all` | Parar de pedir confirmação |
| `/compact` | Resumir conversa longa |
| `/chat resume` | Retomar conversa anterior |
| `/quit` | Sair |

---

## Sessões — ele lembra de tudo

Conversas são salvas automaticamente. Pra retomar:

```bash
kiro-cli chat --resume          # volta na última
kiro-cli chat --resume-picker   # escolhe qual
```

---

## Exemplos do que pedir

```
Analise a estrutura deste projeto e me explique a arquitetura

Crie um middleware de logging que registre método, rota e tempo de resposta

Refatore o user-service.js para usar async/await

Estou recebendo ECONNREFUSED ao conectar no banco, o que pode ser?
```

---

## Atalhos que salvam tempo

| Atalho | O que faz |
|--------|-----------|
| `Ctrl+C` | Cancela / sai |
| `Ctrl+J` | Nova linha no prompt |
| `Esc` | Fecha painéis |
| `!cmd` | Roda comando direto |

---

➡️ Próximo: [04 — Steering, Agents e MCP](04-steering-agents-mcp.md)
