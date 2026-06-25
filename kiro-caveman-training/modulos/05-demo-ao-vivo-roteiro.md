# Módulo 5: Roteiro de Demonstração ao Vivo

> Roteiro para o apresentador executar durante o treinamento. Cada demo mostra um caso real e o ganho imediato.

---

## Setup Antes da Demo

1. Abrir Kiro IDE com um projeto Node.js/AWS
2. Ter um arquivo com código problemático preparado
3. Terminal limpo e visível
4. Chat do Kiro aberto

---

## Demo 1: Ativação e Níveis (3 min)

### Passo 1: Modo Normal

```
Prompt: "Explica o que é event-driven architecture e quando usar"
```

*Mostrar resposta verbosa. Destacar: "Happy to help", "Let me explain", parágrafos longos.*

### Passo 2: Ativar CAVEMAN

```
/caveman
```

### Passo 3: Mesmo prompt

```
Prompt: "Explica o que é event-driven architecture e quando usar"
```

*Mostrar resposta compacta. Comparar lado a lado.*

### Passo 4: Trocar para Ultra

```
/caveman ultra
```

```
Prompt: "Explica o que é event-driven architecture e quando usar"
```

*Mostrar compressão máxima. Destacar que termos técnicos ficam intactos.*

---

## Demo 2: Debugging Real (5 min)

### Setup: Criar arquivo com bug

```javascript
// src/handlers/process-order.mjs
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const order = JSON.parse(event.body);
  
  // Bug 1: sem validação
  // Bug 2: sem try/catch
  // Bug 3: table name hardcoded
  // Bug 4: sem idempotency key
  // Bug 5: resposta não segue padrão API Gateway
  
  await docClient.send(new PutCommand({
    TableName: 'Orders',
    Item: {
      orderId: order.id,
      userId: order.userId,
      total: order.total,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  }));
  
  return { statusCode: 200, body: 'OK' };
};
```

### Executar

```
Prompt: "Review esse handler e me diz todos os problemas"
```

*Mostrar output estilo caveman-review: uma linha por finding, com localização exata.*

### Pedir o fix

```
Prompt: "Fix todos os problemas. Mostra o código corrigido."
```

*Destacar: código gerado é idêntico com ou sem CAVEMAN. Só a explicação é compacta.*

---

## Demo 3: caveman-commit (2 min)

### Fazer uma mudança no código

(Aplicar o fix da demo anterior)

### Gerar commit

```
/caveman-commit
```

*Mostrar: subject ≤50 chars, sem body desnecessário.*

### Comparar com commit normal

```
stop caveman
```

Pedir commit normal e comparar.

---

## Demo 4: caveman-review em PR (3 min)

### Abrir um diff com múltiplos problemas

```
Prompt: "/caveman-review — analisa esse diff: [colar diff ou referenciar branch]"
```

*Output esperado:*
```
src/auth.js:12: 🔴 critical: password stored plaintext. Use bcrypt.hash().
src/auth.js:34: 🟡 warning: no rate limiting on login. Add express-rate-limit.
src/routes/api.js:8: 🟡 warning: CORS allow-origin = *. Restrict to known domains.
src/db.js:5: 🔵 style: connection string in code. Move to env.
totals: 1🔴 2🟡 1🔵 0❓
```

*Destacar: todo finding é actionable, com localização exata e fix sugerido.*

---

## Demo 5: CAVECREW — Investigação em Codebase (5 min)

### Cenário: Bug reportado "usuários não recebem email de confirmação"

### Passo 1: Investigar

```
Prompt: "Encontra todo código relacionado a envio de email de confirmação. 
Quero saber: onde é disparado, qual service manda, e se tem retry."
```

*Se cavecrew-investigator for usado, output será:*
```
Email confirmation dispatch:
- src/services/email-service.js:45 — `sendConfirmation` — uses SES, no retry
- src/handlers/register.js:23 — calls `sendConfirmation` — no await (fire-and-forget)
- src/queues/email-queue.js — exists but not connected to registration flow
totals: 3 sites, 0 retry logic, 1 orphan queue.
```

### Passo 2: Fix

```
Prompt: "Fix: conectar registration ao email-queue com retry de 3 tentativas"
```

*Destacar: investigação retornou ~700 tokens (vs ~2000 normal), sobrando mais contexto pro fix.*

---

## Demo 6: Prompt Complexo de Arquitetura (5 min)

### Prompt Grande e Realista

```
Prompt: "Preciso de um sistema de notificações push para app mobile com:
- 500k usuários ativos
- Notificações segmentadas por região e preferências
- Suporte a iOS (APNs) e Android (FCM)
- Delivery tracking (entregou? abriu?)
- Rate limiting para não spammar
- Custo otimizado (não pagar por device inativo)

Me dá: arquitetura AWS, estimativa de custo mensal, e os trade-offs 
de usar SNS Mobile Push vs implementação custom com SQS+Lambda."
```

*Com CAVEMAN, resposta será ~150 tokens com toda informação essencial vs ~600 tokens normal.*

---

## Demo 7: Sessão Longa Simulada (2 min)

### Mostrar o impacto acumulado

```
/caveman-stats
```

*Se disponível, mostrar métricas reais da sessão.*

### Fazer a conta ao vivo:

```
"Em 50 interações nessa sessão:
- Sem CAVEMAN: ~100k tokens output → context esgota
- Com CAVEMAN: ~25k tokens output → context sobra para mais 3-4x código"
```

---

## Talking Points para Cada Demo

### Por que isso importa?

1. **Custo** — Menos tokens = menos custo de API (relevante para Kiro CLI com billing)
2. **Context** — Mais espaço = sessões mais longas sem perda de memória
3. **Velocidade** — Menos tokens gerados = resposta mais rápida
4. **Foco** — Sem fluff = informação mais fácil de processar mentalmente

### Quando NÃO usar?

- Documentação pública que outros vão ler
- Onboarding de devs novos (precisam de explicações completas)
- Situações de segurança (CAVEMAN desativa automaticamente)
- Ações irreversíveis (CAVEMAN desativa automaticamente)

---

## Checklist Pós-Demo

- [ ] Mostrou ativação/desativação
- [ ] Mostrou pelo menos 2 níveis (full + ultra)
- [ ] Mostrou código intacto (nunca comprimido)
- [ ] Mostrou pelo menos 1 prompt complexo com antes/depois
- [ ] Mostrou caveman-commit ou caveman-review
- [ ] Mencionou auto-clarity (segurança volta ao normal)
- [ ] Fez a conta de economia de tokens
