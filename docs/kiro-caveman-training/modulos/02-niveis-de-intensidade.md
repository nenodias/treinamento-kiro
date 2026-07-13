# Módulo 2: Níveis de Intensidade

## Visão Geral

| Nível | Comando | Compressão | Quando usar |
|-------|---------|-----------|-------------|
| **Lite** | `/caveman lite` | ~40% | Comunicação profissional, PRs públicos |
| **Full** | `/caveman` | ~75% | Dia a dia de desenvolvimento (padrão) |
| **Ultra** | `/caveman ultra` | ~85% | Sessões longas, investigação intensa |

---

## Comparação com Mesmo Prompt

### Pergunta: "Por que meu componente React re-renderiza toda hora?"

---

### 🟢 Lite — Profissional e conciso

> "Your component re-renders because you create a new object reference each render. Wrap it in `useMemo`."

**Características:**
- Sem filler/hedging
- Sentenças completas com artigos
- Tom profissional

---

### 🟡 Full — Caveman clássico (padrão)

> "New object ref each render. Inline object prop = new ref = re-render. Wrap in `useMemo`."

**Características:**
- Sem artigos
- Fragmentos OK
- Sinônimos curtos
- Padrão: `[coisa] [ação] [razão]. [próximo passo].`

---

### 🔴 Ultra — Máxima compressão

> "Inline obj prop → new ref → re-render. `useMemo`."

**Características:**
- Abreviações de prosa (DB/auth/config/req/res/fn/impl)
- Setas para causalidade (X → Y)
- Uma palavra quando uma basta
- **NUNCA** abrevia: nomes de funções, symbols de código, APIs, error strings

---

## Demo ao Vivo: Database Connection Pooling

### Pergunta: "Explica connection pooling de banco de dados"

| Nível | Resposta |
|-------|----------|
| Lite | "Connection pooling reuses open connections instead of creating new ones per request. Avoids repeated handshake overhead." |
| Full | "Pool reuse open DB connections. No new connection per request. Skip handshake overhead." |
| Ultra | "Pool = reuse DB conn. Skip handshake → fast under load." |

---

## Quando usar cada nível

```
┌─────────────────────────────────────────────────┐
│ LITE                                             │
│ • Code reviews públicos                         │
│ • Documentação para o time                      │
│ • Comunicação com stakeholders                  │
├─────────────────────────────────────────────────┤
│ FULL (padrão)                                   │
│ • Desenvolvimento diário                        │
│ • Debugging                                     │
│ • Pair programming com Kiro                     │
├─────────────────────────────────────────────────┤
│ ULTRA                                           │
│ • Sessões de 2+ horas                           │
│ • Investigação em codebase grande               │
│ • Múltiplas delegações para subagents           │
│ • Quando context window está perto do limite    │
└─────────────────────────────────────────────────┘
```

---

## Nota Importante: Ultra NUNCA abrevia código

```javascript
// CORRETO — Ultra mantém código intacto:
"Error in `handleUserAuthentication`. Missing null check on `req.session.user`."

// ERRADO — Ultra NUNCA faria isso:
"Error in `handleUsrAuth`. Missing null chk on `req.sess.usr`."
```

A abreviação é só para **prosa**, nunca para symbols reais do código.
