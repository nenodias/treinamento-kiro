---
name: pr-review
description: Revisa pull requests verificando qualidade de código, vulnerabilidades de segurança e cobertura de testes. Use ao revisar PRs, fazer code review ou preparar código para merge.
metadata:
  author: time-engenharia
  version: "1.0"
---

## Processo de Review

Ao revisar um pull request, siga este checklist na ordem:

### 1. Segurança
- Verificar secrets hardcoded (API keys, senhas, tokens)
- Checar inputs não validados (SQL injection, XSS)
- Confirmar que permissões estão sendo verificadas
- Procurar dependências com vulnerabilidades conhecidas

### 2. Tratamento de erros
- Verificar que erros são capturados e tratados
- Confirmar que mensagens de erro são úteis (sem expor internals)
- Checar que promises têm .catch() ou try/catch
- Validar que recursos são liberados em caso de erro

### 3. Testes
- Novos cenários devem ter testes correspondentes
- Edge cases cobertos (null, undefined, arrays vazios)
- Mocks apropriados (sem over-mocking)
- Testes são legíveis e descritivos

### 4. Qualidade de código
- Funções com responsabilidade única
- Nomes descritivos (variáveis, funções, classes)
- Sem código duplicado (DRY)
- Complexidade ciclomática aceitável (< 10)

### 5. Performance
- Sem N+1 queries
- Sem loops desnecessários em coleções grandes
- Lazy loading onde apropriado
- Cache utilizado quando faz sentido

## Formato do output

Apresente o review organizado por severidade:

🔴 **Crítico** (bloqueia merge):
- [arquivo:linha] Descrição do problema
  - Sugestão de correção

🟡 **Sugestão** (melhoria recomendada):
- [arquivo:linha] Descrição
  - Alternativa proposta

🟢 **Positivo** (boas práticas):
- [arquivo:linha] O que está bom e por quê

## Regras gerais

- Seja construtivo, não destrutivo
- Sugira alternativas, não apenas aponte problemas
- Reconheça boas práticas encontradas
- Priorize: segurança > correção > performance > estilo
