### 8. MCP vs Powers

| Aspecto | MCP puro | Kiro Powers |
|---------|----------|-------------|
| Carregamento | Sempre ativo | Sob demanda (por keywords) |
| Contexto | Todas as ferramentas sempre visíveis | Só carrega quando relevante |
| Documentação | Separada do server | Integrada (POWER.md) |
| Compartilhamento | Copiar mcp.json | Instalar via repositório |
| Ideal para | Poucos servers essenciais | Muitos servers especializados |




# ⚡ Módulo 01 — O que são Kiro Powers e por que usar

> ⏱️ Tempo estimado: ~5 minutos

---

## O Problema

Você conecta 5 MCP servers no Kiro. O que acontece?

- **100+ definições de ferramentas** carregadas antes do primeiro prompt
- **50.000+ tokens** consumidos só com contexto de ferramentas
- **40% da janela de contexto** ocupada antes de você digitar qualquer coisa
- O agente fica confuso com tantas opções disponíveis

É como dar uma caixa de ferramentas com 200 itens para alguém que só precisa de uma chave de fenda.

---

## A Solução: Kiro Powers

Powers são **pacotes de conhecimento e ferramentas que o Kiro ativa sob demanda**.

```
┌─────────────────────────────────────────────────────────────────┐
│                     SEM Powers                                   │
│                                                                  │
│  Prompt → [100 ferramentas carregadas] → Resposta               │
│           (contexto poluído, agente confuso)                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     COM Powers                                   │
│                                                                  │
│  Prompt → [detecta keyword] → [ativa Power relevante] → Resp.  │
│           (contexto limpo, agente focado)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Dois Tipos de Powers

### 1. Guided MCP Power 🎯

Conecta ferramentas MCP **com documentação guiada**.

- Tem `mcp.json` (configuração do servidor)
- Tem `POWER.md` (instruções de uso)
- Exemplo: Power da AWS que pesquisa documentação

### 2. Knowledge Base Power 📚

Documentação pura — **sem MCP server**.

- Só tem `POWER.md` (conhecimento)
- Opcionalmente tem `steering/` (guias extras)
- Exemplo: Guia de boas práticas do time, padrões de código

---

## Analogia: Powers como Especialistas

Imagine que o Kiro é um desenvolvedor generalista. Powers são como **consultores especialistas** que ele chama quando precisa:

| Situação | Power ativado | O que acontece |
|----------|---------------|----------------|
| "Crie uma Lambda" | aws-infrastructure-as-code | Carrega conhecimento de CDK/CloudFormation |
| "Pesquise na doc da AWS" | aws-mcp | Ativa ferramenta de busca em docs |
| "Siga os padrões do time" | padroes-do-time (customizado) | Carrega guia de estilo do projeto |
| "Configure o Terraform" | terraform | Ativa ferramentas do Terraform registry |

---

## Estrutura de um Power

```
meu-power/
├── POWER.md          ← Obrigatório: documentação + metadados
├── mcp.json          ← Opcional: só se tiver MCP server
└── steering/         ← Opcional: guias adicionais
    ├── workflow-1.md
    └── workflow-2.md
```

### O mínimo para criar um Power:

Apenas o **POWER.md** com frontmatter:

```yaml
---
name: "meu-power"
displayName: "Meu Power"
description: "O que esse power faz em 1-2 frases"
keywords: ["palavra1", "palavra2", "palavra3"]
author: "Seu Nome"
---

# Conteúdo do Power aqui...
```

---

## Por que Powers e não só MCP?

| Aspecto | MCP puro | Power |
|---------|----------|-------|
| Carregamento | Tudo sempre ativo | Sob demanda |
| Contexto | Poluído | Limpo e focado |
| Documentação | Separada | Junto com as ferramentas |
| Compartilhamento | Config manual | Instala com 1 clique |
| Descoberta | Precisa saber o nome | Keywords ativam automaticamente |

---

## Resumo

- Powers = pacotes de conhecimento + ferramentas ativados sob demanda
- Dois tipos: **Guided MCP** (com ferramentas) e **Knowledge Base** (só docs)
- Resolvem o problema de **contexto poluído** com muitos MCP servers
- São ativados por **keywords** — basta mencionar o tema no chat
- Mínimo para criar: um arquivo `POWER.md` com frontmatter

---

> 📌 **Próximo**: [Módulo 02 — Instalando e usando Powers](02-instalando-e-usando.md)
