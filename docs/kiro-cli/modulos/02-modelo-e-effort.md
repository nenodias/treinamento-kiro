# 2. Modelo e Effort

## `/model` — Escolha do Modelo de IA

O Kiro CLI suporta múltiplos modelos via Amazon Bedrock. Use `/model` para selecionar qual modelo usar.

```bash
> /model
```

Um picker interativo aparece com as opções disponíveis:

| Modelo | Uso recomendado |
|--------|-----------------|
| **Auto** (padrão) | Seleção dinâmica baseada na complexidade da tarefa |
| **Claude Sonnet** | Raciocínio pesado, planejamento, design de arquitetura |
| **Amazon Nova** | Geração de código em alto throughput |

A seleção de modelo **persiste entre sessões** — você escolhe uma vez e ele continua usando até mudar.

---

## `/effort` — Nível de Raciocínio

Controla quão profundo o modelo "pensa" antes de responder.

```bash
> /effort high
```

### Níveis disponíveis

| Nível | Quando usar |
|-------|-------------|
| `low` | Perguntas simples, respostas diretas |
| `medium` | Tarefas comuns de desenvolvimento |
| `high` | Problemas complexos, debug, arquitetura |
| `max` | Raciocínio profundo, decisões críticas |

---

## Dicas

- Use **Auto + effort medium** para o dia-a-dia
- Suba para **high/max** quando estiver debugging algo complexo ou planejando arquitetura
- Modelos maiores consomem mais tokens — use com propósito

---

## Demo ao Vivo

1. No chat interativo, digitar `/model`
2. Mostrar o picker e selecionar um modelo
3. Digitar `/effort high`
4. Fazer uma pergunta simples para ver a diferença no estilo de resposta
5. Voltar para `/effort medium`

---

> Próximo: gerenciamento de sessões e contexto.
