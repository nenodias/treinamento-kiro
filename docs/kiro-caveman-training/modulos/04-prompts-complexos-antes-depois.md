# Módulo 4: Prompts Complexos — Antes vs Depois

> Este módulo demonstra prompts reais e complexos, mostrando o ganho concreto de tokens com CAVEMAN ativado.

---

## Prompt 1: Debugging de Performance em Lambda

### 🎤 Prompt do Usuário:

```
Minha Lambda está com cold start de 8 segundos. Usa Node.js 18, conecta no RDS PostgreSQL 
com Sequelize, importa o AWS SDK v3 inteiro, e o bundle tem 45MB. Me diz o que está errado 
e como resolver passo a passo.
```

### ❌ Resposta Normal (~380 tokens):

> "I'd be happy to help you troubleshoot your Lambda cold start issue! Based on what you've described, there are several problems contributing to the 8-second cold start time. Let me walk you through each issue and provide a step-by-step solution:
>
> **Problem 1: Bundle Size (45MB)**
> Your bundle is extremely large for a Lambda function. The recommended maximum is around 5MB for optimal cold start performance. This is likely because you're importing the entire AWS SDK v3 instead of just the clients you need.
>
> **Problem 2: Database Connection**
> Sequelize is a heavy ORM that adds significant initialization time. Additionally, establishing a new PostgreSQL connection on every cold start adds network latency.
>
> **Problem 3: SDK Import**
> Importing the entire AWS SDK v3 (`@aws-sdk/client-*`) pulls in many modules you don't use.
>
> **Step-by-step solution:**
>
> 1. First, replace your full SDK import with specific client imports...
> 2. Second, consider replacing Sequelize with a lighter alternative...
> 3. Third, implement connection pooling with RDS Proxy...
> 4. Finally, enable provisioned concurrency for critical paths..."

### ✅ Resposta CAVEMAN Full (~95 tokens):

> "3 problemas:
>
> 1. **Bundle 45MB** — import SDK inteiro. Fix: import só clients usados (`@aws-sdk/client-s3` etc). Meta: <5MB
> 2. **Sequelize pesado** — init lenta. Fix: trocar por `pg` direto ou `kysely`. Connection outside handler
> 3. **RDS direto** — cold start inclui TCP handshake. Fix: RDS Proxy
>
> Bônus: provisioned concurrency pra paths críticos. ESBuild com tree-shaking pro bundle."

### 📊 Economia: ~75% (380 → 95 tokens)

---

## Prompt 2: Arquitetura de Microsserviços

### 🎤 Prompt do Usuário:

```
Preciso migrar um monolito Node.js/Express com 200k linhas para microsserviços na AWS. 
Temos 15 desenvolvedores, deploy manual via SSH, banco PostgreSQL único com 80 tabelas, 
e o sistema processa 5000 req/s no pico. Me dá uma estratégia de migração.
```

### ❌ Resposta Normal (~520 tokens):

> "That's quite an ambitious migration project! Let me help you develop a comprehensive strategy. Given your constraints — 15 developers, manual SSH deployments, a monolithic PostgreSQL database, and significant traffic — I'd recommend a phased approach that minimizes risk while gradually modernizing your architecture.
>
> **Phase 1: Foundation (Weeks 1-4)**
> Before splitting any services, you need to establish the infrastructure foundation. This means setting up a CI/CD pipeline first, because you can't effectively manage microservices with manual SSH deployments. I'd recommend starting with AWS CodePipeline or GitHub Actions...
>
> **Phase 2: Strangler Fig Pattern (Weeks 5-16)**
> Rather than attempting a big-bang rewrite, I'd strongly recommend using the Strangler Fig pattern. This involves identifying bounded contexts in your domain model and gradually extracting them as independent services while keeping the monolith running...
>
> **Phase 3: Data Decomposition (Weeks 12-24)**
> The database is usually the hardest part. You'll want to start by identifying which tables belong to which bounded context, then implement the shared-nothing architecture gradually...
>
> **Phase 4: Observability and Resilience (Ongoing)**
> With distributed systems, you absolutely need proper observability from day one..."

### ✅ Resposta CAVEMAN Full (~140 tokens):

> "Estratégia em 4 fases:
>
> **F1 (sem 1-4): Foundation**
> - CI/CD primeiro. Sem pipeline = sem microsserviço. GitHub Actions ou CodePipeline
> - Containerizar monolito (ECS Fargate). Matar SSH deploy
> - Observability: X-Ray + CloudWatch
>
> **F2 (sem 5-16): Strangler Fig**
> - Mapear bounded contexts nas 80 tabelas
> - Extrair serviço menos acoplado primeiro (notificações? auth?)
> - API Gateway na frente. Roteio gradual monolito → serviço novo
>
> **F3 (sem 12-24): Data decomposition**
> - Database-per-service. Começar com read replicas por contexto
> - Event-driven sync (EventBridge) entre domínios
> - Padrão Outbox pra consistência eventual
>
> **F4 (contínuo): Resiliência**
> - Circuit breakers, retry com backoff
> - 5000 req/s pico → auto-scaling policies + load test antes de cada cutover
>
> 15 devs: dividir em 3-4 squads por bounded context."

### 📊 Economia: ~73% (520 → 140 tokens)

---

## Prompt 3: Diagnóstico de Erro Complexo

### 🎤 Prompt do Usuário:

```
Estou recebendo esse erro intermitente em produção:
"FATAL: too many connections for role \"app_user\"" 
O RDS tem max_connections=100, mas nosso serviço ECS tem 10 tasks rodando com 
Sequelize pool de { min: 5, max: 20 }. O erro acontece aleatoriamente sob carga.
```

### ❌ Resposta Normal (~310 tokens):

> "I can see the issue right away! This is a classic connection pool exhaustion problem. Let me explain what's happening:
>
> Your math doesn't add up in terms of available connections. You have 10 ECS tasks, each configured with a Sequelize pool that can use up to 20 connections. That means your theoretical maximum is 10 × 20 = 200 connections, but your RDS instance only allows 100 connections total for the `app_user` role.
>
> Under normal load, each task might only use 5-10 connections, which keeps you under the limit. But when traffic spikes, multiple tasks try to scale their pools simultaneously, and you hit the 100-connection ceiling.
>
> Here's how to fix this:
>
> 1. **Immediate fix**: Reduce your pool max to 8-9 per task (10 tasks × 9 = 90, leaving headroom)
> 2. **Better solution**: Implement RDS Proxy, which manages connection pooling at the infrastructure level
> 3. **Long-term**: Consider if you actually need 10 tasks or if fewer tasks with proper autoscaling would work better
>
> Additionally, make sure you're properly releasing connections back to the pool after each query..."

### ✅ Resposta CAVEMAN Full (~80 tokens):

> "Math: 10 tasks × max 20 pool = 200 potenciais. RDS limit = 100. Estoura sob carga.
>
> Fix imediato: `max: 8` no pool (10×8=80, headroom seguro)
>
> Fix correto: **RDS Proxy** — gerencia pool na infra, não na app. Connection multiplexing resolve.
>
> Extra: `pool.idle` timeout baixo (10s). Garantir `release()` em every query path + error handlers."

### 📊 Economia: ~74% (310 → 80 tokens)

---

## Prompt 4: Terraform Multi-Account Setup

### 🎤 Prompt do Usuário:

```
Preciso configurar uma landing zone com 3 contas AWS (dev/staging/prod) usando Terraform.
Quero: VPC isoladas, Transit Gateway, SSO com Identity Center, SCPs para segurança, 
e budgets com alertas. Me dá a estrutura de módulos.
```

### ❌ Resposta Normal (~450 tokens):

> "Great question! Setting up a proper multi-account landing zone is a critical foundation for your AWS infrastructure. I'll help you design a modular Terraform structure that handles all of these requirements. Let me walk you through the recommended module structure:
>
> First, I'd suggest organizing your Terraform code into the following hierarchy. The key principle here is separation of concerns — each module should handle one specific aspect of your infrastructure, and the root modules for each account should compose these together.
>
> Here's the directory structure I'd recommend:
> ..."
>
> [seguido de estrutura detalhada com explicações longas sobre cada módulo]

### ✅ Resposta CAVEMAN Full (~120 tokens):

> ```
> terraform/
> ├── modules/
> │   ├── vpc/              # CIDR, subnets, NAT, flow logs
> │   ├── transit-gateway/  # Peering cross-account, route tables
> │   ├── sso/              # Identity Center, permission sets
> │   ├── scp/              # Deny rules (no root, region lock, etc)
> │   ├── budgets/          # Per-account budgets + SNS alerts
> │   └── baseline/         # CloudTrail, Config, GuardDuty
> ├── accounts/
> │   ├── dev/              # terraform.tfvars: cidr=10.1.0.0/16
> │   ├── staging/          # terraform.tfvars: cidr=10.2.0.0/16
> │   └── prod/             # terraform.tfvars: cidr=10.3.0.0/16
> ├── management/           # Org, SCPs, SSO config
> └── shared/               # Transit GW, DNS, shared services
> ```
>
> Backend: S3 + DynamoDB lock por account. State isolation obrigatório.
> Execução: Terraform Cloud ou GitHub Actions com OIDC per-account role."

### 📊 Economia: ~73% (450 → 120 tokens)

---

## Prompt 5: Code Review Complexo (DynamoDB + Lambda)

### 🎤 Prompt do Usuário:

```
Review esse handler:

const handler = async (event) => {
  const items = JSON.parse(event.body);
  for (const item of items) {
    await dynamodb.put({ TableName: 'Orders', Item: item }).promise();
  }
  return { statusCode: 200, body: 'OK' };
};
```

### ❌ Resposta Normal (~350 tokens):

> "I've reviewed your handler and found several issues that should be addressed before this goes to production. Let me go through each one:
>
> 1. **No Input Validation**: You're directly parsing the event body without any validation. If `event.body` is null or not valid JSON, this will throw an unhandled exception...
>
> 2. **Sequential Writes**: You're using a for loop with await, which means each DynamoDB put operation waits for the previous one to complete. This is very slow for large batches...
>
> 3. **No Error Handling**: There's no try-catch block, so any DynamoDB error will result in an unhandled promise rejection...
>
> [continua com mais 4-5 pontos detalhados]"

### ✅ Resposta CAVEMAN Review (~90 tokens):

> ```
> handler.js:2: 🔴 critical: no try/catch. Unhandled JSON.parse throw → 500. Wrap in try.
> handler.js:2: 🟡 warning: no input validation. items could be anything. Validate array + schema.
> handler.js:3: 🔴 critical: sequential puts in loop. N items = N round trips. Use BatchWriteItem (max 25).
> handler.js:3: 🟡 warning: no partial failure handling. BatchWrite can partial-fail. Check UnprocessedItems.
> handler.js:4: 🟡 warning: .promise() = SDK v2 pattern. Migrate to SDK v3 (native promises).
> handler.js:5: 🔵 style: hardcoded table name. Use process.env.TABLE_NAME.
> totals: 2🔴 3🟡 1🔵 0❓
> ```

### 📊 Economia: ~74% (350 → 90 tokens)

---

## Resumo de Economia

| Prompt | Normal | CAVEMAN | Economia |
|--------|--------|---------|----------|
| Lambda Cold Start | 380 | 95 | 75% |
| Migração Microsserviços | 520 | 140 | 73% |
| Diagnóstico Conexão DB | 310 | 80 | 74% |
| Terraform Multi-Account | 450 | 120 | 73% |
| Code Review DynamoDB | 350 | 90 | 74% |
| **TOTAL** | **2,010** | **525** | **~74%** |

> Em uma sessão típica com 50 interações desse nível, isso significa:
> - **Normal:** ~100,000 tokens de output
> - **CAVEMAN:** ~26,000 tokens de output
> - **Economia:** ~74,000 tokens — espaço para MUITO mais contexto e código
