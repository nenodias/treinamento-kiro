# 🪝 Módulo 01 — O que são Agent Hooks e por que usar

> ⏱️ Tempo estimado: ~5 minutos

---

## O Problema

Quantas vezes por dia você repete as mesmas tarefas?

- "Roda o lint depois de salvar"
- "Gera os testes pra esse arquivo novo"
- "Verifica se não tem credencial no código"
- "Atualiza a documentação"

**E se a IDE fizesse isso automaticamente por você?**

---

## A Solução: Agent Hooks

Agent Hooks são **triggers automatizados** no Kiro que executam ações predefinidas quando eventos específicos ocorrem na sua IDE.

### Conceito simples em 2 passos:

```
1. EVENTO detectado → (ex: arquivo salvo, prompt enviado, tarefa concluída)
2. AÇÃO executada  → (ex: rodar lint, pedir review ao agente, executar testes)
```

---

## O que os Hooks fazem por você?

| Benefício | Exemplo |
|-----------|---------|
| 🔒 Previnem vulnerabilidades | Scanner de segurança antes de commitar |
| 📏 Mantêm qualidade consistente | Lint e formatação automáticos ao salvar |
| ⚡ Reduzem overhead manual | Geração automática de testes |
| 👥 Padronizam processos do time | Mesmas regras para todos |
| 🔄 Criam ciclos mais rápidos | Feedback instantâneo |

---

## Onde os Hooks ficam?

Os hooks são armazenados em arquivos JSON na pasta:

```
.kiro/hooks/
```

Cada hook é um arquivo `.json` com a configuração do trigger e da ação.

---

## Como criar um Hook?

Duas formas:

### 1. Via linguagem natural (recomendado)
> Peça ao Kiro no chat: "Crie um hook que rode o lint toda vez que eu salvar um arquivo .ts"

### 2. Via formulário manual
> Abra o painel **Agent Hooks** → clique no **+** → preencha os campos

Também pode usar: `Ctrl + Shift + P` → `Kiro: Open Kiro Hook UI`

---

## Resumo

- Hooks = automação baseada em eventos na IDE
- Dois passos: **Evento** → **Ação**
- Eliminam tarefas repetitivas
- Garantem consistência no código
- Fácil de criar (linguagem natural ou formulário)

---

> 📌 **Próximo**: [Módulo 02 — Tipos de triggers e ações](02-tipos-e-acoes.md)
