---
name: revisar-codigo
description: Faz code review do código seguindo o checklist do time. Use quando pedir para revisar, checar qualidade, ou validar código antes de commit.
---

# Revisar Código

Realiza code review seguindo os padrões do time backend.

## Checklist

### Arquitetura
- [ ] Handler não contém lógica de negócio
- [ ] Service não conhece HTTP (sem statusCode, headers)
- [ ] Utils são genéricos sem acoplamento a domínio

### Tratamento de Erros
- [ ] Handler envolto em try/catch
- [ ] Erros de domínio usam classes customizadas (ValidacaoError, etc.)
- [ ] Erros inesperados retornam 500 genérico (sem stack trace)
- [ ] Toda resposta de erro inclui `{ sucesso: false, mensagem: "..." }`

### Validação
- [ ] Campos obrigatórios validados antes de processar
- [ ] Body nulo/undefined tratado no handler
- [ ] Valores fora do domínio rejeitados (ex: prioridade inválida)

### Segurança
- [ ] Sem detalhes internos em mensagens de erro
- [ ] Headers CORS em todas as respostas

### Boas Práticas
- [ ] Usa `const` (nunca `var`, `let` só quando necessário)
- [ ] Imports com extensão explícita (.mjs ou .ts)
- [ ] Named exports (sem default exports)
- [ ] Nomes descritivos em português

## Formato de Saída

Para cada issue encontrada:

| Severidade | Arquivo:Linha | Problema | Sugestão |
|------------|---------------|----------|----------|

Severidades:
- 🔴 Crítico — bloqueia merge
- 🟡 Atenção — deve ser corrigido
- 🔵 Sugestão — melhoria opcional

Se tudo ok: "✅ Código aprovado — nenhum problema encontrado."
