---
name: "trello-to-pr"
displayName: "Trello to PR"
description: "Automatiza o fluxo completo desde o refinamento de um card do Trello até a abertura de uma Pull Request no GitHub. Inclui refinamento da história, implementação, versionamento com boas práticas e criação de PR."
keywords: ["trello", "github", "refinamento", "pull-request", "feature-branch", "workflow"]
author: "Fernando Henrique Utik"
---

# Trello to PR

## Overview

Este power automatiza o ciclo completo de desenvolvimento a partir de um card do Trello:

1. **Refinamento** — Lê o conteúdo do card no Trello, refina a história de usuário com critérios de aceite e atualiza o card com o refinamento.
2. **Validação** — Apresenta o refinamento ao desenvolvedor e aguarda confirmação antes de prosseguir.
3. **Implementação** — Desenvolve a solução baseada no refinamento aprovado.
4. **Versionamento** — Cria feature branch, faz commit com mensagem semântica e abre PR para a main.

O power segue boas práticas de nomenclatura de branches e commits, e nunca realiza commits diretamente em branches protegidas (main, master, develop).

## Available Steering Files

- **workflow** — Guia passo a passo completo do fluxo de trabalho, desde o card do Trello até a PR aberta.

## MCP Servers

Este power utiliza dois MCP servers:

### Trello MCP Server
- **Server:** `trello`
- **Package:** `@modelcontextprotocol/server-trello`
- **Finalidade:** Ler e atualizar cards do Trello

### GitHub MCP Server
- **Server:** `github`
- **Package:** `@modelcontextprotocol/server-github`
- **Finalidade:** Criar branches, commits e Pull Requests

## Workflow Resumido

```
Card do Trello → Refinamento → Validação → Implementação → Feature Branch → Commit → PR
```

### Etapa 1: Refinamento do Card

1. Ler o conteúdo do card do Trello (título, descrição, checklists)
2. Analisar o contexto e refinar a história de usuário:
   - Definir formato "Como [persona], eu quero [ação], para que [benefício]"
   - Adicionar critérios de aceite claros e testáveis
   - Identificar dependências e considerações técnicas
3. Atualizar o card do Trello com o refinamento completo

### Etapa 2: Validação

1. Apresentar o refinamento ao desenvolvedor
2. Perguntar: "O refinamento está OK para seguir para a implementação?"
3. Se não estiver OK, iterar no refinamento até aprovação
4. Somente prosseguir após confirmação explícita

### Etapa 3: Implementação

1. Com base no refinamento aprovado, implementar a solução
2. Seguir os critérios de aceite definidos
3. Garantir que o código está funcional e testável

### Etapa 4: Versionamento

1. **Nunca commitar em:** main, master ou develop
2. **Criar feature branch** a partir da main:
   - Formato: `feature/<descricao-curta-do-card>`
   - Exemplo: `feature/adicionar-filtro-busca-usuarios`
3. **Fazer commit** na feature branch:
   - Formato Conventional Commits: `tipo(escopo): descrição`
   - Exemplos:
     - `feat(users): adicionar filtro de busca por nome`
     - `fix(auth): corrigir validação de token expirado`
4. **Abrir Pull Request** para a main:
   - Título conciso (< 70 caracteres)
   - Descrição com resumo das mudanças e link para o card do Trello

## Best Practices

- Sempre validar o refinamento com o desenvolvedor antes de implementar
- Usar Conventional Commits para mensagens de commit
- Nomear branches de forma descritiva usando kebab-case
- Incluir link do card do Trello na descrição da PR
- Manter PRs focadas e de tamanho razoável
- Nunca fazer push direto em branches protegidas

## Troubleshooting

### Erro: "Card not found" no Trello
**Causa:** ID ou URL do card inválido
**Solução:**
1. Verificar se o card existe no board
2. Confirmar que o token tem acesso ao board
3. Usar o ID completo do card (visível na URL)

### Erro: "Permission denied" no GitHub
**Causa:** Token sem permissão para o repositório
**Solução:**
1. Verificar se o token tem scope `repo`
2. Confirmar acesso ao repositório específico
3. Regenerar token se necessário

### Erro: "Branch already exists"
**Causa:** Já existe uma branch com o mesmo nome
**Solução:**
1. Verificar se já há trabalho em andamento para esse card
2. Usar um nome mais específico para a branch
3. Deletar a branch antiga se não for mais necessária

## MCP Config Placeholders

Antes de usar este power, substitua os placeholders no `mcp.json`:

- **`YOUR_TRELLO_API_KEY`**: Sua API Key do Trello.
  - **Como obter:**
    1. Acesse https://trello.com/power-ups/admin
    2. Crie um novo Power-Up ou use um existente
    3. Copie a API Key gerada

- **`YOUR_TRELLO_TOKEN`**: Seu token de autorização do Trello.
  - **Como obter:**
    1. Com a API Key em mãos, acesse: `https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key=SUA_API_KEY`
    2. Autorize o acesso
    3. Copie o token gerado

- **`YOUR_GITHUB_TOKEN`**: Seu Personal Access Token do GitHub.
  - **Como obter:**
    1. Acesse https://github.com/settings/tokens
    2. Clique em "Generate new token (classic)"
    3. Selecione os scopes: `repo`, `workflow`
    4. Gere e copie o token

---

**MCP Servers:** trello, github
**Tipo:** Guided MCP Power
