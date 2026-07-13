---
name: commit-msg
description: Gera mensagens de commit seguindo Conventional Commits em português. Use quando precisar fazer commit, escrever mensagem de commit, preparar changelog ou padronizar histórico Git.
metadata:
  author: time-engenharia
  version: "1.0"
---

## Formato

Siga estritamente o padrão Conventional Commits:

```
<type>(<scope>): <description>

[body opcional - explicar O QUE e POR QUÊ]

[footer opcional - breaking changes, issues]
```

## Types permitidos

| Type | Quando usar | Exemplo |
|------|-------------|---------|
| feat | Nova funcionalidade | `feat(auth): adicionar login com Google` |
| fix | Correção de bug | `fix(api): corrigir timeout em requisições` |
| docs | Apenas documentação | `docs: atualizar README com setup` |
| style | Formatação sem mudança de lógica | `style: aplicar prettier no projeto` |
| refactor | Refatoração sem feat/fix | `refactor(db): extrair repository pattern` |
| test | Adição/correção de testes | `test(auth): cobrir edge cases de login` |
| chore | Manutenção (build, CI, deps) | `chore(deps): atualizar express para 5.x` |
| perf | Melhoria de performance | `perf(query): adicionar índice em users` |
| ci | Mudanças em CI/CD | `ci: adicionar step de lint no pipeline` |

## Regras

1. Description em português, modo imperativo: "adicionar", "corrigir", "remover"
2. Máximo 72 caracteres na primeira linha
3. Scope opcional mas recomendado: indica a área afetada
4. Body separado por linha em branco, explica motivação
5. Breaking changes: adicionar `!` após type ou `BREAKING CHANGE:` no footer

## Exemplos completos

### Simples
```
feat(users): adicionar endpoint de busca por email
```

### Com body
```
fix(auth): corrigir expiração de token JWT

O token estava sendo validado com timezone UTC mas gerado
com timezone local, causando expiração prematura em
servidores fora do horário de Brasília.
```

### Breaking change
```
feat(api)!: alterar formato de resposta de erro para RFC 7807

BREAKING CHANGE: o campo "error" foi substituído por "code" e "message".
Clientes precisam atualizar o parsing de erros.

Closes #142
```

## Ao gerar mensagem

1. Analise o diff das mudanças
2. Identifique o type correto
3. Determine o scope (área/módulo afetado)
4. Escreva description concisa e imperativa
5. Adicione body se a mudança não for óbvia
6. Mencione issues relacionadas no footer
