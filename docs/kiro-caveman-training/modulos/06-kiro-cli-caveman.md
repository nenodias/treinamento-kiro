# Módulo 6: CAVEMAN no Kiro CLI

> O CAVEMAN funciona tanto no Kiro IDE quanto no Kiro CLI. No CLI, a economia de tokens é ainda mais crítica por conta do billing direto e do contexto limitado no terminal.

---

## Por que CAVEMAN é ainda mais importante no CLI?

| Aspecto | IDE | CLI |
|---------|-----|-----|
| Context visual | Arquivo aberto, tree visível | Só o que cabe no terminal |
| Billing | Incluído no plano | Tokens contam diretamente |
| Sessão típica | Pode ser longa com GUI | Mais curta, mais focada |
| Output legibility | Syntax highlight, collapse | Texto puro, scrollback limitado |

No CLI, cada token desperdiçado com "Sure! I'd be happy to help!" é dinheiro e espaço jogados fora.

---

## Ativação no Kiro CLI

### Opção 1: No início da sessão

```bash
kiro chat
```

Primeira mensagem:
```
/caveman
```

### Opção 2: Inline no prompt

```bash
kiro chat --message "use caveman mode. Fix the memory leak in src/worker.js"
```

### Opção 3: Via configuração (persistente)

```bash
# ~/.config/caveman/config.json
{
  "defaultMode": "full"
}
```

Ou via env var:
```bash
export CAVEMAN_DEFAULT_MODE=full
```

---

## Cenários Ideais para CLI + CAVEMAN

### 1. Quick Fix em Pipeline CI/CD

```bash
kiro chat --message "/caveman. Build failing with: 'Cannot find module @aws-sdk/client-s3'. Fix package.json"
```

**Resposta CAVEMAN:**
```
Missing dep. Run:
npm install @aws-sdk/client-s3

Or add to package.json dependencies:
"@aws-sdk/client-s3": "^3.x"
```

vs. Normal: parágrafo explicando o que são módulos, como npm resolve...

---

### 2. Investigação de Logs

```bash
kiro chat --message "/caveman ultra. Analisa esse error log e diz root cause:
ERROR: Task timed out after 30.00 seconds
REPORT RequestId: abc-123 Duration: 30015.45ms Memory: 128MB MaxMemory: 127MB"
```

**Resposta CAVEMAN Ultra:**
```
OOM → timeout. 127/128MB used. Lambda hit memory ceiling → GC thrash → timeout.
Fix: bump memory to 256MB or optimize payload size.
```

---

### 3. Geração de IaC Rápida

```bash
kiro chat --message "/caveman. Gera um template SAM para: API Gateway + Lambda + DynamoDB. 
CRUD básico de 'products'. Node.js 20. Sem explicação, só o YAML."
```

**Resposta:** Direto o `template.yaml` sem introdução, sem "Here's the template:", sem "Let me explain each section:".

---

### 4. Batch de Perguntas

```bash
kiro chat --message "/caveman ultra. Responde rápido:
1. Max size Lambda deployment package?
2. DynamoDB max item size?
3. SQS max message size?
4. API Gateway timeout limit?
5. S3 max object size?"
```

**Resposta CAVEMAN Ultra:**
```
1. 250MB (unzipped), 50MB (zipped direct upload)
2. 400KB
3. 256KB (extended: 2GB via S3 pointer)
4. 29 seconds
5. 5TB
```

vs. Normal: cada resposta teria parágrafo com contexto, links, "it's worth noting that..."

---

## Comandos CLI Úteis com CAVEMAN

### Script de inicialização

```bash
# ~/.bashrc ou ~/.zshrc
alias kc="kiro chat --message '/caveman.'"
alias kcu="kiro chat --message '/caveman ultra.'"

# Uso:
kc "Fix type error in src/handler.ts line 42"
kcu "List all unused exports in src/"
```

### One-liner para review

```bash
git diff main | kiro chat --message "/caveman-review. Review esse diff:"
```

### One-liner para commit message

```bash
git diff --staged | kiro chat --message "/caveman-commit. Gera commit message pra esse diff:"
```

---

## Comparação: Mesma Task no CLI

### Task: "Encontra e fixa todos os N+1 queries no projeto"

#### Sem CAVEMAN (~800 tokens de output):

```
Sure! I'll help you find and fix N+1 query problems in your project. Let me analyze 
your codebase systematically.

First, let me explain what N+1 queries are for context. An N+1 query occurs when your 
code executes one query to fetch a list of N records, and then executes N additional 
queries to fetch related data for each record. This is extremely inefficient because...

After analyzing your project, I found the following N+1 query patterns:

1. In `src/services/order-service.js` at line 45:
   You're fetching all orders and then querying the user table for each order 
   individually in a loop. This should be refactored to use a JOIN or batch query...

2. In `src/routes/products.js` at line 23:
   The product listing endpoint fetches products, then loops through each to get 
   categories. This could be solved with an eager loading strategy...

[... mais 3-4 parágrafos de explicação ...]

Would you like me to implement these fixes?
```

#### Com CAVEMAN Full (~180 tokens de output):

```
Found 3 N+1 patterns:

1. `src/services/order-service.js:45` — loop queries user per order. Fix: JOIN or WHERE IN
2. `src/routes/products.js:23` — loop queries category per product. Fix: eager load
3. `src/api/reports.js:67` — nested loop: orders→items→prices. Fix: single aggregation query

Fixing all 3:

[código direto, sem explicação prévia]
```

#### Economia: ~78% (800 → 180 tokens)

---

## Dica Final: CAVEMAN + Piping no CLI

```bash
# Analisa CloudWatch logs piped
aws logs get-log-events --log-group-name /aws/lambda/my-func --limit 50 \
  | kiro chat --message "/caveman ultra. Analisa esses logs. Encontra errors e dá root cause."

# Review de Terraform plan
terraform plan -no-color \
  | kiro chat --message "/caveman-review. Review esse terraform plan. Foca em security e cost."

# Analisa package vulnerabilities
npm audit --json \
  | kiro chat --message "/caveman. Prioriza essas vulns. Quais corrigir primeiro e como."
```

---

## Resumo: CLI + CAVEMAN

| Benefício | Impacto |
|-----------|---------|
| Menos tokens = menor custo | ~75% economia por interação |
| Respostas cabem no terminal | Sem scroll infinito |
| Mais rápido para ler | Só substância, sem fluff |
| Funciona em scripts/pipes | Output limpo para automação |
| Context dura mais | Sessões CLI podem ser mais longas |
