---
inclusion: manual
---

# Git Flow — Guia de Trabalho

## ⚠️ REGRA CRÍTICA — NUNCA COMMITAR DIRETO NA DEVELOP

**É PROIBIDO fazer commits diretamente na branch `develop` ou `main`.**

Antes de qualquer commit, o agente DEVE obrigatoriamente:
1. Garantir que está na `develop` atualizada (`git pull origin develop`)
2. **Criar uma nova branch** a partir da `develop` com a nomenclatura correta
3. **Mudar para essa nova branch** (`git checkout -b <tipo>/<descricao>`)
4. Só então fazer `git add`, `git commit` e `git push -u origin <branch>`

Se o agente já estiver na `develop` e houver alterações pendentes, ele DEVE criar a branch antes de commitar. Não existe exceção para essa regra.

---

## Regras de Branching

1. **Toda branch deve ser criada a partir da `develop`.**
   - Antes de criar uma nova branch, garantir que a `develop` local está atualizada: `git pull origin develop`
   - Nunca criar branches a partir de `main` ou de outras feature branches.

2. **Nomenclatura de branches:**
   - `feature/<descricao-curta>` — para novas funcionalidades
   - `fix/<descricao-curta>` — para correções de bugs
   - `refactor/<descricao-curta>` — para refatorações
   - `docs/<descricao-curta>` — para alterações de documentação
   - `chore/<descricao-curta>` — para tarefas de manutenção (deps, configs, CI)

## Regras de Commit

### Após cada commit, realizar push para a origin

```bash
git push -u origin <nome-da-branch>
```

### Formato da mensagem de commit (Conventional Commits)

```
<tipo>(<escopo>): <descrição curta>

<corpo opcional>

<footer opcional>
```

### Tipos permitidos

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Alteração de documentação |
| `style` | Formatação (sem mudança de lógica) |
| `refactor` | Refatoração de código existente |
| `test` | Adição ou correção de testes |
| `chore` | Manutenção (deps, configs, scripts) |
| `perf` | Melhoria de performance |
| `ci` | Alterações em CI/CD |

### Boas práticas para mensagens de commit

1. **Descrição curta (subject line):**
   - Máximo de 72 caracteres
   - Usar imperativo no presente: "adiciona filtro" (não "adicionado filtro" ou "adicionando filtro")
   - Primeira letra minúscula
   - Sem ponto final

2. **Corpo (body) — quando necessário:**
   - Separar do subject por uma linha em branco
   - Explicar **o quê** e **por quê**, não o como
   - Quebrar linhas em 72 caracteres
   - Usar quando a mudança não é óbvia apenas pelo subject

3. **Footer — quando aplicável:**
   - Referenciar issues/cards: `Refs: #123` ou `Closes: #456`
   - Breaking changes: `BREAKING CHANGE: <descrição>`

### Exemplos

```
feat(products): adiciona validação de preço mínimo

Produtos com preço menor ou igual a zero agora são rejeitados
na criação e atualização. A validação ocorre na camada de
validators antes de chegar à rota.

Refs: CARD-42
```

```
fix(filters): corrige filtro por categoria case-sensitive

O filtro agora normaliza a categoria para lowercase antes
de comparar, evitando falsos negativos na busca.
```

```
chore(deps): atualiza fastify para v5.2.0
```

## Regra de Pull Request

### Após o push, abrir Pull Request para `develop`

Imediatamente após o `git push`, o agente DEVE abrir uma Pull Request da branch atual para a `develop` utilizando o GitHub CLI (`gh pr create`).

**⚠️ IMPORTANTE: SEMPRE usar os flags `--title` e `--body` inline no comando.**
Nunca executar `gh pr create` sem esses flags, pois sem eles o CLI abre um editor interativo que trava a execução do agente.

**⚠️ QUEBRAS DE LINHA NO BODY: Usar `` `n `` (escape do PowerShell) para quebras de linha.**
NUNCA usar quebras de linha literais (Enter) dentro do valor de `--body`. Isso faz o shell interpretar o comando como incompleto e travar esperando mais input. Sempre usar `` `n `` dentro de aspas duplas para representar newlines.

**Regras da PR:**

1. **Base branch:** sempre `develop`
2. **Título:** seguir o mesmo padrão do commit principal (Conventional Commits)
3. **Descrição:** deve ser detalhada e conter:
   - **O que foi alterado** — resumo claro das mudanças realizadas
   - **Por que foi alterado** — motivação ou contexto da mudança
   - **O que foi testado** — como a mudança foi validada (testes, build, etc.)
   - **Arquivos afetados** — lista dos principais arquivos modificados

4. **Comando (obrigatoriamente não-interativo com `` `n `` para quebras de linha):**

```powershell
gh pr create --base develop --title "<tipo>(escopo): descrição curta" --body "## O que foi alterado`n- Descrição das mudanças`n`n## Por que foi alterado`n- Motivação`n`n## O que foi testado`n- Validações realizadas`n`n## Arquivos afetados`n- lista/de/arquivos"
```

### Exemplo completo de PR

```powershell
gh pr create --base develop --title "test(filters): padroniza testes do productFilter conforme steering" --body "## O que foi alterado`n- Reestruturação completa dos testes unitários do módulo productFilter`n- Aplicação do padrão AAA (Arrange, Act, Assert) em todos os cenários`n`n## Por que foi alterado`n- Os testes não seguiam o padrão AAA definido no steering padroes-testes.md`n- Cobertura insuficiente (apenas 2 cenários)`n`n## O que foi testado`n- Todos os 21 testes passando via npx vitest run`n`n## Arquivos afetados`n- tests/unit/productFilter.test.ts"
```

---

## Fluxo Resumido

```powershell
# 1. Atualizar develop
git checkout develop
git pull origin develop

# 2. Criar branch a partir de develop
git checkout -b feature/minha-feature

# 3. Fazer alterações e commitar
git add <arquivos>
git commit -m "feat(escopo): descrição curta"

# 4. Push para origin
git push -u origin feature/minha-feature

# 5. Abrir Pull Request para develop (usar `n para quebras de linha, NUNCA Enter literal)
gh pr create --base develop --title "feat(escopo): descrição curta" --body "## O que foi alterado`n- Mudanças realizadas`n`n## Por que foi alterado`n- Motivação`n`n## O que foi testado`n- Validações`n`n## Arquivos afetados`n- arquivos"
```
