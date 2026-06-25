# Code Review

## Objetivo
Garantir qualidade, consistência e segurança do código antes de integrar mudanças.

## Checklist Geral

### Clareza & Legibilidade
- Nomes de variáveis e funções descritivos e em português (domínio do projeto)
- Funções pequenas com responsabilidade única
- Comentários apenas onde o "porquê" não é óbvio pelo código
- Sem código morto ou comentado (remover antes de commitar)

### Arquitetura & Separação de Camadas
- Handlers não contêm lógica de negócio — apenas parse, chamada ao service e formatação de resposta
- Services não conhecem HTTP (sem `statusCode`, sem `headers`)
- Utils são genéricos e reutilizáveis, sem acoplamento a domínio específico

### Tratamento de Erros
- Handlers sempre envoltos em try/catch
- Erros de domínio usam classes customizadas (`ValidacaoError`, `TarefaNaoEncontradaError`, etc.)
- Erros inesperados retornam 500 com mensagem genérica (sem vazar stack trace)
- Toda resposta de erro inclui `{ sucesso: false, mensagem: "..." }`

### Validação de Entrada
- Validar campos obrigatórios antes de processar
- Tratar `body: null` e `body: undefined` nos handlers
- Sanitizar strings (trim) quando aplicável
- Rejeitar valores fora do domínio (ex: prioridade inválida)

### Segurança
- Não expor detalhes internos em mensagens de erro para o cliente
- Não logar dados sensíveis
- Headers CORS presentes em todas as respostas (sucesso e erro)

### Performance & Boas Práticas
- Evitar loops desnecessários ou operações O(n²)
- Preferir `const` sobre `let`; nunca usar `var`
- Imports explícitos com extensão (`.mjs` ou `.ts`)
- Named exports preferidos sobre default exports

## Padrão de Resposta ao Revisar

Ao fazer code review, seguir esta estrutura:

1. **Resumo** — O que a mudança faz em 1-2 frases
2. **Pontos positivos** — O que está bem feito
3. **Problemas** — Bugs, vulnerabilidades ou violações de padrão (com severidade: 🔴 crítico, 🟡 atenção, 🔵 sugestão)
4. **Sugestões** — Melhorias opcionais de legibilidade ou performance

## Severidades

| Emoji | Nível | Ação |
|-------|-------|------|
| 🔴 | Crítico | Bloqueia merge — bug, vulnerabilidade ou quebra de contrato |
| 🟡 | Atenção | Deve ser corrigido, mas não bloqueia se justificado |
| 🔵 | Sugestão | Melhoria opcional, a critério do autor |

## O Que NÃO Fazer em Review
- Não pedir mudanças de estilo pessoal sem base em padrão do projeto
- Não reescrever o código do autor sem motivo técnico
- Não bloquear por nitpicks — usar 🔵 e seguir em frente
- Não ignorar testes — verificar se cenários relevantes estão cobertos
