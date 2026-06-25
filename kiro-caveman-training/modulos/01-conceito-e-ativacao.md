# Módulo 1: Conceito e Ativação

## O Problema

Em sessões longas com agentes AI:
- Context window enche rápido
- Respostas verbosas ocupam tokens que poderiam ser usados para mais código
- "Sure! I'd be happy to help you with that. Let me explain..." = desperdício puro

## A Solução: CAVEMAN

Comunicação comprimida estilo "caveman inteligente". Toda substância técnica permanece. Só o fluff morre.

---

## Como Ativar

### No Kiro IDE (chat)

```
/caveman
```

Ou simplesmente diga:
```
use caveman mode
```

### Trocar Nível

```
/caveman lite
/caveman full       ← padrão
/caveman ultra
```

### Desativar

```
stop caveman
```
ou
```
normal mode
```

---

## Exemplo Rápido

### ❌ Sem CAVEMAN (132 tokens):

> "Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by the authentication middleware not properly validating the JWT token's expiration time. It seems like the comparison operator is using a strict less-than instead of less-than-or-equal, which means tokens that expire at exactly the current second are incorrectly being rejected. Here's how you can fix it:"

### ✅ Com CAVEMAN (28 tokens):

> "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:"

**Economia: ~79% dos tokens**

---

## Regras Principais

1. **Código inalterado** — blocos de código nunca são comprimidos
2. **Termos técnicos exatos** — `useMemo`, `DynamoDB`, `kubectl` ficam como são
3. **Erros quoted exact** — mensagens de erro nunca são parafraseadas
4. **Idioma do usuário preservado** — se você fala português, CAVEMAN responde em português
5. **Auto-clarity** — em avisos de segurança ou ações irreversíveis, volta ao normal automaticamente

---

## Para Lembrar

| Aspecto | Comportamento |
|---------|--------------|
| Artigos | Removidos |
| Fillers (just/really/basically) | Removidos |
| Pleasantries (sure/certainly) | Removidos |
| Hedging (I think/maybe/perhaps) | Removido |
| Código | Intacto |
| Nomes técnicos | Intactos |
| Mensagens de erro | Intactas |
| Idioma | Mantém o do usuário |
