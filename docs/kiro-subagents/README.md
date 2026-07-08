# 🤖 Treinamento: Custom Subagents no Kiro

## Sobre este treinamento

Material de apoio para sessão de **25 minutos** sobre **Custom Subagents** no Kiro — agentes especializados que rodam em paralelo, cada um com contexto isolado e ferramentas próprias.

Em vez de um agente generalista fazendo tudo sequencialmente, você monta um **time de especialistas**: um para review, outro para testes, outro para docs — cada um focado no que faz melhor.

---

## 📚 Módulos

| # | Módulo | Tema | Tempo |
|---|--------|------|-------|
| 01 | [O que são Subagents](modulos/01-o-que-sao-subagents.md) | Conceito, criação, tools, configuração | ~5 min |
| 02 | [Exemplos práticos e demo](modulos/02-exemplos-e-demo.md) | 3 subagents prontos, demo ao vivo, compartilhamento | ~10 min |

---

## 💻 Projeto de Exemplo

O diretório [`projeto-exemplo/`](projeto-exemplo/) contém uma API Node.js com **3 custom subagents** prontos em `.kiro/agents/`:

- `code-reviewer.md` — revisa código (read only)
- `test-writer.md` — gera testes com Vitest
- `doc-generator.md` — cria documentação JSDoc

➡️ [Ver instruções do projeto](projeto-exemplo/README.md)

---

## Pré-requisitos

- **Kiro IDE** (versão 0.9+)
- Modo **Autopilot** ativo (obrigatório para subagents)
- Conhecimento básico de Markdown

> 💡 Não precisa de MCP servers, Docker ou API keys.

---

## Como usar este material

1. **Leitura**: Módulo 01 (conceito) → Módulo 02 (prática)
2. **Sessão ao vivo**: use o [Guia Rápido](GUIA-RAPIDO-SESSAO.md)
3. **Prática**: abra o projeto-exemplo e teste os subagents com `/code-reviewer`, `/test-writer`, `/doc-generator`

---

> 📌 **Fonte oficial**: [Documentação Kiro - Subagents](https://kiro.dev/docs/chat/subagents/)
