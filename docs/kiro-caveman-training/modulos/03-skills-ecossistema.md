# Módulo 3: Skills do Ecossistema CAVEMAN

## Família de Skills

| Skill | Comando | Função |
|-------|---------|--------|
| `caveman` | `/caveman` | Modo principal de comunicação comprimida |
| `caveman-commit` | `/caveman-commit` | Gera commit messages ultra-compactas |
| `caveman-review` | `/caveman-review` | Code review em uma linha por finding |
| `caveman-compress` | `/caveman-compress <file>` | Comprime arquivos .md de memória |
| `caveman-stats` | `/caveman-stats` | Mostra economia real de tokens na sessão |
| `caveman-help` | `/caveman-help` | Cartão de referência rápida |
| `cavecrew` | (automático) | Subagents com output comprimido |

---

## 1. caveman-commit

Gera commits no formato Conventional Commits, ultra-compactos.

**Regras:**
- Subject ≤ 50 caracteres
- Body só quando o "porquê" não é óbvio
- Formato: `type(scope): description`

### Exemplo

```
feat(auth): add JWT refresh token rotation
```

vs. commit normal:
```
feat(auth): Implement JWT refresh token rotation mechanism to improve security by automatically rotating tokens on each refresh request
```

---

## 2. caveman-review

Cada finding = uma linha com localização, problema e fix.

### Formato

```
path:line: emoji severity: problem. fix.
```

### Exemplo de Output

```
src/auth.js:42: 🔴 critical: SQL injection via string concat. Use parameterized query.
src/auth.js:67: 🟡 warning: JWT secret hardcoded. Move to env var.
src/utils.js:15: 🔵 style: unused import `lodash`. Remove.
totals: 1🔴 1🟡 1🔵 0❓
```

**Economia vs review tradicional:** ~80% menos tokens

---

## 3. caveman-compress

Comprime arquivos de memória (.md, CLAUDE.md, steering files) para formato caveman.

**Uso:**
```
/caveman-compress ./docs/architecture.md
```

**Resultado:**
- Arquivo original salvo como `architecture.original.md`
- Versão comprimida sobrescreve o original
- ~46% economia em tokens de input

**Ideal para:**
- Steering files que são lidos toda sessão
- Documentação de contexto pesada
- CLAUDE.md / .kiro/steering/*.md

---

## 4. caveman-stats

Mostra economia real da sessão atual.

**Uso:**
```
/caveman-stats
```

**Output exemplo:**
```
Session tokens:
  Input:  12,847
  Output:  3,204
  Estimated normal output: ~12,816
  Savings: ~75% output tokens
```

---

## 5. CAVECREW — Subagents Comprimidos

Três subagents especializados com output ~60% menor:

### cavecrew-investigator
- **Função:** Localiza código (onde está X, quem chama Y)
- **Output:** `path:line — \`symbol\` — nota curta`
- **Quando usar:** "Where is X defined / what calls Y / list uses of Z"

### cavecrew-builder
- **Função:** Edições cirúrgicas em 1-2 arquivos
- **Output:** `path:line-range — mudança em ≤10 palavras`
- **Quando usar:** Fix pontual com escopo claro

### cavecrew-reviewer
- **Função:** Review de diff/branch para bugs
- **Output:** `path:line: emoji severity: problema. fix.`
- **Quando usar:** Auditar mudanças antes de merge

### Padrão Mais Comum: Locate → Fix → Verify

```
1. cavecrew-investigator → retorna lista de sites
2. Main thread pega 1-2 sites → passa para cavecrew-builder
3. cavecrew-reviewer → audita o diff
```

### Economia Real

| Abordagem | Tokens por delegação | Em 20 delegações |
|-----------|---------------------|-------------------|
| Subagent normal | ~2,000 | ~40,000 |
| Cavecrew | ~700 | ~14,000 |
| **Economia** | **65%** | **26,000 tokens salvos** |

Isso é a diferença entre o context esgotar ou terminar a task.
