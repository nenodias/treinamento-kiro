# 💬 Módulo 01 — Vibe & Spec: Dois Modos de Trabalhar

---

## Vibe Mode (chat livre)

Conversação aberta com o agente. Ideal para:
- Perguntas rápidas
- Fix pontuais
- Exploração
- Prototipagem

```
Prompt: "Corrija o bug no handler de criação de tarefas"
→ Kiro lê, entende, corrige.
```

---

## Spec Mode (estruturado)

Fluxo guiado para features complexas:

```
Ideia → Requisitos → Design → Tarefas → Código
```

Cada etapa gera um artefato (`.md`) que você **revisa e aprova** antes de avançar.

| Artefato | O que contém |
|----------|-------------|
| `requirements.md` | User stories + critérios de aceitação |
| `design.md` | Arquitetura, modelos, fluxos |
| `tasks.md` | Lista ordenada de tarefas atômicas |

---

## Quando usar cada um?

| Cenário | Modo |
|---------|------|
| Fix rápido, dúvida, exploração | **Vibe** |
| Feature nova com múltiplos arquivos | **Spec** |
| Refatoração grande | **Spec** |
| Protótipo descartável | **Vibe** |

---

## Autopilot vs Supervised

| Modo | Comportamento |
|------|---------------|
| **Autopilot** | Kiro executa tudo, você revisa depois |
| **Supervised** | Kiro para a cada mudança pra você aprovar |

---

## Demo rápida

```
Prompt (Vibe): "Adicione validação de prioridade no handler de criar tarefa"
```

Para Spec: inicie uma sessão Spec e descreva "Quero adicionar filtros de busca por status e prioridade na listagem de tarefas".

---

> 📌 [Docs: Specs](https://kiro.dev/docs/specs/) | [Docs: Chat](https://kiro.dev/docs/chat/)
