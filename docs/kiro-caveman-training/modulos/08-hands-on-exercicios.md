# Módulo 8: Hands-On — Exercícios para Participantes

> Exercícios para os participantes experimentarem CAVEMAN em tempo real.

---

## Exercício 1: Comparação Direta (5 min)

### Instruções:

1. Abra o Kiro IDE ou CLI
2. Faça essa pergunta SEM caveman:

```
Explica a diferença entre SQS Standard e SQS FIFO, quando usar cada um, 
e quais os limites de throughput de cada tipo.
```

3. Anote quantas linhas a resposta teve
4. Agora ative: `/caveman`
5. Faça a mesma pergunta
6. Compare: mesma informação? Menos linhas?

### Resultado Esperado:

- Normal: ~15-20 linhas com introdução, parágrafos, conclusão
- CAVEMAN: ~5-8 linhas, tabela ou fragmentos, mesma substância

---

## Exercício 2: Debugging com CAVEMAN (5 min)

### Instruções:

1. Ative `/caveman`
2. Cole esse código no chat:

```javascript
const fetchUsers = async () => {
  const users = await db.query('SELECT * FROM users');
  const result = [];
  for (const user of users) {
    const orders = await db.query(`SELECT * FROM orders WHERE user_id = ${user.id}`);
    const address = await db.query(`SELECT * FROM addresses WHERE user_id = ${user.id}`);
    result.push({ ...user, orders, address });
  }
  return result;
};
```

3. Prompt: `"Review e fix esse código. Me preocupo com: performance, segurança, e boas práticas."`

### O que Observar:

- Findings são diretos e localizados
- SQL injection detectado
- N+1 query detectado
- Fix é código completo (não comprimido)

---

## Exercício 3: Ultra Mode para Perguntas Rápidas (3 min)

### Instruções:

1. Ative `/caveman ultra`
2. Faça perguntas de uma linha:

```
Diferença entre PUT e PATCH?
```

```
Quando usar Step Functions vs SQS?
```

```
Max concurrent Lambda executions por região?
```

### O que Observar:

- Respostas de 1-3 linhas no máximo
- Zero filler
- 100% accurate

---

## Exercício 4: caveman-commit (3 min)

### Instruções:

1. Faça qualquer mudança em um arquivo (adicione um comentário, fix um typo)
2. Stage: `git add .`
3. No chat: `/caveman-commit`
4. Observe o formato: `type(scope): subject ≤50 chars`

### Variação:

Faça uma mudança mais complexa (refactor de uma função) e veja se o commit inclui body.

---

## Exercício 5: Prompt Complexo de Arquitetura (5 min)

### Instruções:

1. Com `/caveman` ativado, envie:

```
Preciso desenhar um sistema de processamento de imagens assíncrono:
- Upload via presigned URL para S3
- Trigger Lambda para resize (3 tamanhos: thumb, medium, original)
- Salvar metadata no DynamoDB
- Notificar frontend via WebSocket quando pronto
- Se falhar, retry 3x e notificar via email

Me dá: diagrama em texto, serviços AWS, e os pontos de falha que preciso tratar.
```

### O que Observar:

- Resposta completa em ~100-150 tokens
- Diagrama em ASCII/texto funcional
- Pontos de falha listados sem filler
- Serviços AWS nomeados corretamente (nunca abreviados)

---

## Exercício 6: Piping no CLI (opcional, para quem tem CLI)

### Instruções:

```bash
# 1. Gerar report de um terraform plan
terraform plan -no-color 2>&1 | kiro chat --message "/caveman. Resumo das mudanças e riscos:"

# 2. Analise de package.json
cat package.json | kiro chat --message "/caveman ultra. Deps desatualizadas ou redundantes?"

# 3. Quick fix
kiro chat --message "/caveman. TypeScript error: 'Property id does not exist on type User'. Interface User está em src/types.ts. Fix."
```

---

## Exercício Bônus: Comparação de Economia

### Instruções:

1. Abra 2 sessões (ou use a mesma alternando modos)
2. Faça as MESMAS 10 perguntas com e sem CAVEMAN
3. Conte os tokens/linhas de cada resposta
4. Calcule a economia percentual

### Template de Registro:

| # | Prompt | Tokens Normal | Tokens CAVEMAN | Economia % |
|---|--------|---------------|----------------|------------|
| 1 | | | | |
| 2 | | | | |
| ... | | | | |
| **Total** | | | | |

---

## Critérios de Sucesso

Após os exercícios, cada participante deve saber:

- [ ] Ativar e desativar CAVEMAN
- [ ] Escolher entre lite/full/ultra para cada contexto
- [ ] Reconhecer que código nunca é comprimido
- [ ] Usar /caveman-commit para commits concisos
- [ ] Entender a economia de tokens acumulada
- [ ] Saber quando voltar ao modo normal
