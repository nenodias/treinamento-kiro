# Módulo 03 — Demonstração Prática

## Demo 1: Criar uma Skill de Code Review (2 min)

**1. Criar a pasta:**
```
.kiro/skills/pr-review/
```

**2. Criar o SKILL.md:**

```markdown
---
name: pr-review
description: Revisa pull requests para qualidade, segurança e testes. Use ao revisar PRs ou fazer code review.
---

## Checklist

### Segurança
- Sem secrets hardcoded
- Inputs validados

### Qualidade
- Funções com responsabilidade única
- Nomes descritivos
- Tratamento de erros

### Testes
- Novos cenários cobertos
- Edge cases testados

## Output

🔴 **Crítico**: bloqueia merge
🟡 **Sugestão**: melhoria recomendada
🟢 **Positivo**: boas práticas encontradas
```

**3. Testar:**
```
> /pr-review
> Revise este código para segurança
```

---

## Demo 2: Skill com referências (2 min)

```
.kiro/skills/api-docs/
├── SKILL.md
└── references/
    └── openapi-patterns.md
```

**SKILL.md:**
```markdown
---
name: api-docs
description: Gera documentação OpenAPI 3.0. Use quando precisar documentar endpoints ou criar specs de API.
---

## Workflow

1. Identificar endpoints no projeto
2. Documentar path, método, params, responses
3. Seguir padrões em `references/openapi-patterns.md`
4. Incluir exemplos de request/response
```

---

## Demo 3: Importar e usar em outro projeto (1 min)

1. **Importar**: Kiro Panel → + → Import a skill → GitHub URL
2. **Testar**: `/nome-da-skill` no novo projeto
3. **Adaptar**: editar SKILL.md com regras do seu time
4. **Compartilhar**: `git add .kiro/skills/ && git commit && git push`

---

## Resumo visual

```
┌─────────────────────────────────────────────┐
│  CRIAR                                       │
│  .kiro/skills/nome/SKILL.md                  │
├─────────────────────────────────────────────┤
│  USAR                                        │
│  /nome-da-skill  ou  ativação automática     │
├─────────────────────────────────────────────┤
│  COMPARTILHAR                                │
│  git push  ou  importar via GitHub URL       │
└─────────────────────────────────────────────┘
```

---

> 📌 **Voltar ao início**: [README](../README.md)
