---
name: "github-pr-opener"
displayName: "GitHub PR Opener"
description: "Automatiza a abertura de Pull Requests no GitHub seguindo boas práticas de commits convencionais, nomenclatura de branches e descrição detalhada das alterações."
keywords: ["github", "pull-request", "pr", "conventional-commits", "branch", "commit"]
author: "Utikawa"
---

# GitHub PR Opener

## Overview

Este power automatiza todo o fluxo de abertura de Pull Requests no GitHub. Ele analisa as alterações locais, cria uma branch com nomenclatura adequada, faz commit seguindo Conventional Commits, envia para o remote e abre uma PR com descrição detalhada.

O objetivo é eliminar o trabalho manual repetitivo e garantir consistência na nomenclatura de branches, mensagens de commit e descrições de PR em todos os projetos.

## Regras do Workflow

1. **Analisar alterações** — verificar o que foi modificado e está pronto para commit
2. **Commit convencional** — seguir o padrão Conventional Commits (feat, fix, test, refactor, docs, chore, style, perf, ci, build)
3. **Nunca commitar em branches protegidas** — NUNCA fazer commit diretamente em `main`, `master` ou `develop`
4. **Criar branch nova** — sempre criar uma branch a partir de `main` com nome descritivo
5. **Push para origin** — enviar a branch para o remote
6. **Abrir PR** — criar Pull Request com descrição detalhada de todas as alterações

## Onboarding

### Pré-requisitos

- Git instalado e configurado localmente
- Repositório GitHub clonado localmente
- GitHub Personal Access Token com permissões: `repo`, `read:org`
- Node.js 18+ (para executar o MCP server via npx)

### Configuração do Token

1. Acesse https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Selecione os scopes: `repo` (acesso completo a repositórios)
4. Copie o token gerado
5. Configure como variável de ambiente:
   - Windows: `set GITHUB_PERSONAL_ACCESS_TOKEN=ghp_seu_token_aqui`
   - Linux/macOS: `export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_seu_token_aqui`

### Verificação

```bash
# Verificar que o git está configurado
git config user.name
git config user.email

# Verificar que está em um repositório válido
git remote -v
```

## Workflow Completo: Abrir PR

### Passo 1: Analisar Alterações

Antes de tudo, analise o estado do repositório local:

```bash
# Ver status das alterações
git status

# Ver diff detalhado das alterações
git diff
git diff --staged

# Ver arquivos modificados (resumido)
git diff --name-status
git diff --staged --name-status
```

**Importante:** Identifique o tipo de alteração para determinar o prefixo correto do commit:
- Novas funcionalidades → `feat`
- Correções de bugs → `fix`
- Testes → `test`
- Refatoração (sem mudança de comportamento) → `refactor`
- Documentação → `docs`
- Estilo de código (formatação, semicolons) → `style`
- Performance → `perf`
- CI/CD → `ci`
- Build system → `build`
- Tarefas auxiliares → `chore`

### Passo 2: Verificar Branch Atual

```bash
# NUNCA commitar nestas branches:
# - main
# - master
# - develop
git branch --show-current
```

**Se estiver em main, master ou develop:** PARE e crie uma nova branch antes de continuar.

### Passo 3: Criar Nova Branch

Crie uma branch a partir de `main` com nomenclatura descritiva:

```bash
# Garantir que main está atualizada
git checkout main
git pull origin main

# Criar e mudar para nova branch
git checkout -b <tipo>/<descricao-curta>
```

**Padrão de nomenclatura de branches:**
- `feat/adicionar-autenticacao-oauth`
- `fix/corrigir-validacao-email`
- `test/adicionar-testes-unitarios-usuario`
- `refactor/extrair-servico-notificacao`
- `docs/atualizar-readme-instalacao`
- `chore/atualizar-dependencias`
- `hotfix/corrigir-crash-login`

**Regras para nomes de branch:**
- Usar kebab-case (minúsculas separadas por hífen)
- Ser descritivo mas conciso
- Prefixar com o tipo de alteração
- Sem caracteres especiais, acentos ou espaços

### Passo 4: Fazer Commit

```bash
# Adicionar arquivos ao staging
git add <arquivos>
# OU para todas as alterações:
git add .

# Commit com mensagem convencional
git commit -m "<tipo>(<escopo-opcional>): <descrição>"
```

**Formato do Conventional Commits:**
```
<tipo>(<escopo>): <descrição curta>

<corpo opcional - explicação detalhada>

<rodapé opcional - breaking changes, issues relacionadas>
```

**Exemplos:**
```bash
git commit -m "feat(auth): adicionar login com Google OAuth"
git commit -m "fix(api): corrigir timeout na requisição de usuários"
git commit -m "test(user): adicionar testes unitários para serviço de cadastro"
git commit -m "refactor(database): extrair connection pool para módulo separado"
git commit -m "docs: atualizar instruções de instalação no README"
```

**Regras para mensagens de commit:**
- Primeira linha com no máximo 72 caracteres
- Usar imperativo ("adicionar", não "adicionado" ou "adicionando")
- Não terminar com ponto final
- Escopo é opcional mas recomendado para projetos grandes

### Passo 5: Push para Origin

```bash
# Enviar branch para o remote
git push -u origin <nome-da-branch>
```

### Passo 6: Abrir Pull Request

Use o MCP do GitHub para criar a PR:

**Informações necessárias:**
- `owner`: dono do repositório (username ou organização)
- `repo`: nome do repositório
- `title`: título da PR (conciso, descritivo)
- `head`: nome da branch criada
- `base`: `main` (sempre)
- `body`: descrição detalhada em Markdown

**Formato da descrição da PR:**

```markdown
## Descrição

Breve resumo do que foi feito e por quê.

## Alterações

- Lista detalhada de cada alteração significativa
- Explicação do que foi adicionado/modificado/removido
- Contexto técnico relevante

## Tipo de Mudança

- [ ] Nova funcionalidade (feat)
- [ ] Correção de bug (fix)
- [ ] Refatoração (refactor)
- [ ] Documentação (docs)
- [ ] Testes (test)
- [ ] Outros (chore, style, perf, ci, build)

## Como Testar

Passos para testar/verificar as alterações:
1. ...
2. ...

## Observações

Qualquer informação adicional relevante para o reviewer.
```

**Para identificar owner e repo do repositório atual:**
```bash
git remote get-url origin
# Exemplo de output: https://github.com/owner/repo.git
# ou: git@github.com:owner/repo.git
```

## Troubleshooting

### Erro: "Permission denied" ao fazer push

**Causa:** Token sem permissão ou credenciais expiradas
**Solução:**
1. Verifique se o token tem scope `repo`
2. Atualize as credenciais: `git credential reject`
3. Tente o push novamente

### Erro: "Branch already exists" no remote

**Causa:** Branch com mesmo nome já existe no remote
**Solução:**
1. Escolha um nome diferente para a branch
2. Ou delete a branch remota se não estiver em uso: `git push origin --delete <branch>`

### Erro: "PR creation failed"

**Causa:** Permissões insuficientes ou branch não encontrada no remote
**Solução:**
1. Confirme que o push foi bem-sucedido: `git log origin/<branch> --oneline -1`
2. Verifique permissões do token no repositório
3. Confirme owner/repo corretos

### Erro: Commit acidental em main/master/develop

**Causa:** Esqueceu de criar branch antes de commitar
**Solução:**
1. Crie a branch: `git branch <nova-branch>`
2. Reset main: `git reset --hard HEAD~1`
3. Mude para a branch: `git checkout <nova-branch>`

## Best Practices

- Sempre verifique a branch atual antes de commitar
- Mantenha commits atômicos (uma alteração lógica por commit)
- Escreva descrições de PR pensando no reviewer
- Use o corpo do commit para explicar o "porquê", não o "o quê"
- Atualize a branch com main antes de abrir a PR se houver conflitos
- Prefira commits menores e PRs focadas a PRs gigantes

## MCP Config Placeholders

**IMPORTANTE:** Antes de usar este power, substitua o seguinte placeholder no `mcp.json`:

- **`GITHUB_PERSONAL_ACCESS_TOKEN`**: Seu Personal Access Token do GitHub.
  - **Como obter:**
    1. Acesse https://github.com/settings/tokens
    2. Clique em "Generate new token (classic)"
    3. Dê um nome descritivo (ex: "Kiro PR Opener")
    4. Selecione o scope `repo` (acesso completo a repositórios privados e públicos)
    5. Clique em "Generate token"
    6. Copie o token gerado e configure como variável de ambiente no seu sistema

**Configuração via variável de ambiente (recomendado):**

Defina a variável `GITHUB_PERSONAL_ACCESS_TOKEN` no seu sistema para que o MCP server a utilize automaticamente.

---

**MCP Server:** `@modelcontextprotocol/server-github`
**Comandos locais necessários:** `git`
