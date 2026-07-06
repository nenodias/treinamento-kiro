# 🎯 Treinamento: Spec Driven Development com Kiro

## Sobre este treinamento

Material de apoio para sessão de **30 minutos** sobre o **Spec Driven Development** do Kiro — a funcionalidade que transforma ideias vagas em implementações estruturadas através de requisitos, design e tarefas.

## O que é Spec Driven?

O Spec Driven é o modo de trabalho do Kiro que guia o desenvolvimento de features complexas através de um fluxo estruturado:

**Ideia → Requisitos → Design → Tarefas → Implementação**

Em vez de "vibe coding" (pedir e torcer), você itera com a IA em cada etapa antes de escrever código.

## Estrutura do Treinamento (~30 min)

| Módulo | Tema | Tempo |
|--------|------|-------|
| [Módulo 01](modulos/01-o-que-e-spec-driven.md) | O que é e por que usar | 5 min |
| [Módulo 02](modulos/02-fluxo-na-pratica.md) | O fluxo na prática | 10 min |
| [Módulo 03](modulos/03-demo-ao-vivo.md) | Demonstração ao vivo | 15 min |

## Pré-requisitos

- Kiro instalado (IDE baseada no VS Code)
- Conta AWS com acesso ao Kiro
- (Para a demo) Conta no Trello com API Key e Token configurados

## Configurando o MCP do Trello

Para a demonstração ao vivo, usamos o [mcp-server-trello](https://github.com/delorenj/mcp-server-trello) — um servidor MCP que permite ao Kiro interagir diretamente com boards, listas e cards do Trello.

### 1. Obter credenciais do Trello

1. Acesse [https://trello.com/power-ups/admin](https://trello.com/power-ups/admin) e crie um Power-Up
2. No Power-Up criado, clique em **API Key** na sidebar e gere uma nova API Key
3. Gere um Token acessando a URL abaixo (substitua `YOUR_API_KEY` pela sua chave):

```
https://trello.com/1/authorize?expiration=never&name=Kiro+Trello+MCP&scope=read,write&response_type=token&key=YOUR_API_KEY
```

4. Copie o token gerado

### 2. Configurar o MCP no Kiro

Crie (ou edite) o arquivo `.kiro/settings/mcp.json` no seu projeto:

```json
{
  "mcpServers": {
    "trello-mcp": {
      "command": "pnpx",
      "args": ["@delorenj/mcp-server-trello"],
      "env": {
        "TRELLO_API_KEY": "sua-api-key-aqui",
        "TRELLO_TOKEN": "seu-token-aqui"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

> **Nota:** é necessário ter o `pnpm` instalado para usar o `pnpx`. Se não tiver, instale com `npm install -g pnpm`.

### 3. Alternativa: instalação local via Node

Se preferir rodar o servidor localmente:

```bash
npm install -g @delorenj/mcp-server-trello
```

E configure o MCP apontando para o binário:

```json
{
  "mcpServers": {
    "trello-mcp": {
      "command": "mcp-server-trello",
      "args": [],
      "env": {
        "TRELLO_API_KEY": "sua-api-key-aqui",
        "TRELLO_TOKEN": "seu-token-aqui"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### 4. Verificar a conexão

Após salvar o `mcp.json`, o Kiro reconecta automaticamente ao servidor MCP. Você pode verificar no painel de MCP Servers que o `trello-mcp` está com status **running**.

Ferramentas disponíveis após a conexão: gerenciar boards, listas, cards, checklists, labels, membros e muito mais — tudo via linguagem natural no chat do Kiro.

## Como usar este material

1. Apresente os conceitos (Módulos 01-02)
2. Faça a demo ao vivo (Módulo 03)
3. Abra para perguntas

---

> 📌 **Fontes**: [Documentação Kiro](https://kiro.dev/docs/) | [mcp-server-trello no npm](https://www.npmjs.com/package/mcp-server-trello) | [Repositório GitHub](https://github.com/delorenj/mcp-server-trello)
