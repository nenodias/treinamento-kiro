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