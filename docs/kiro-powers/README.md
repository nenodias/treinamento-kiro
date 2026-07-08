# ⚡ Treinamento: Kiro Powers — Estendendo o Kiro com Superpoderes

## Sobre este treinamento

Material de apoio para sessão de **30 minutos** sobre **Kiro Powers** — o sistema de extensibilidade do Kiro que permite adicionar conhecimento especializado e ferramentas MCP ao agente sob demanda, sem sobrecarregar o contexto.

Vamos além da teoria: ao final da sessão, o time terá **criado um Power customizado** do zero e aprendido a compartilhá-lo via repositório (Azure DevOps, GitLab, etc.).

---

## O que são Kiro Powers?

Powers são pacotes que combinam documentação, ferramentas MCP e guias de workflow num formato que o Kiro ativa **sob demanda**. Em vez de carregar dezenas de ferramentas o tempo todo, o Kiro só carrega o que precisa, quando precisa.

```
┌─────────────────────────────────────────────────────┐
│                    Kiro Power                        │
│                                                     │
│  📄 POWER.md        → Documentação + instruções     │
│  ⚙️  mcp.json        → Configuração de MCP servers  │
│  📂 steering/       → Guias de workflow opcionais   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📚 Módulos

| # | Módulo | Tema | Nível |
|---|--------|------|-------|
| 01 | [O que são Powers](modulos/01-o-que-sao-powers.md) | Conceito, tipos e por que usar | 🟢 Iniciante |
| 02 | [Instalando e usando Powers](modulos/02-instalando-e-usando.md) | Galeria, ativação e uso no chat | 🟢 Iniciante |
| 03 | [Configurando MCP Servers](modulos/03-configurando-mcp.md) | mcp.json, AWS Docs server (sem key) | 🟡 Intermediário |
| 04 | [Criando seu próprio Power](modulos/04-criando-seu-power.md) | Estrutura, POWER.md, frontmatter | 🟡 Intermediário |
| 05 | [Compartilhando com o time](modulos/05-compartilhando-com-o-time.md) | Versionamento, Azure DevOps, boas práticas | 🔴 Avançado |
| 06 | [Demo ao vivo — Criando um Power](modulos/06-demo-ao-vivo.md) | Construção passo a passo ao vivo | 🔴 Avançado |

---

## 💻 Projeto de Exemplo

O diretório [`projeto-exemplo/`](projeto-exemplo/) contém um Power customizado pronto para usar como referência — um guia de padrões de código do time que o Kiro segue automaticamente.

➡️ [Ver instruções do projeto](projeto-exemplo/README.md)

---

## Pré-requisitos

- **Kiro IDE** instalado e autenticado
- **Python + uv** instalados (para o MCP server de exemplo)
- Conhecimento básico de JSON e Markdown

> 💡 Não precisa de Docker, API keys ou tokens para este treinamento.

---

## Como usar este material

1. **Leitura individual**: siga os módulos na ordem, do 01 ao 06
2. **Sessão ao vivo**: use o [Guia Rápido da Sessão](GUIA-RAPIDO-SESSAO.md) como roteiro
3. **Prática**: abra o projeto-exemplo no Kiro e teste o Power customizado
4. **Referência**: consulte módulos específicos quando precisar

---

> 📌 **Fonte oficial**: [Documentação Kiro - Powers](https://kiro.dev/docs/powers/)
