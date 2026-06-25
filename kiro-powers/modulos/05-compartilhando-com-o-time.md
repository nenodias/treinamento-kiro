# 🤝 Módulo 05 — Compartilhando Powers com o Time

> ⏱️ Tempo estimado: ~5 minutos

---

## O problema de compartilhamento

Você criou um Power incrível com os padrões do time. Agora precisa que **todos** usem. Como distribuir?

- ❌ Enviar por email/Slack → desatualiza rápido
- ❌ Wiki do time → ninguém lembra de consultar
- ✅ **Versionar no repositório** → sempre atualizado, versionado, revisado

---

## Estratégia 1: Power dentro do projeto (mais simples)

Coloque o Power **dentro do próprio repositório do projeto**:

```
meu-projeto/
├── .kiro/
│   └── settings/
│       └── mcp.json          ← MCP servers do projeto
├── powers/
│   └── padroes-do-time/
│       └── POWER.md          ← Power do time
├── src/
│   └── ...
└── package.json
```

**Vantagens:**
- Todo dev que clona o projeto já tem o Power
- Versionado junto com o código
- Pull Request para mudar padrões (review do time)

**Desvantagens:**
- Duplicado se o time tem vários projetos
- Precisa atualizar em cada repo

---

## Estratégia 2: Repositório dedicado de Powers (recomendado)

Crie um **repositório separado** só para os Powers do time:

```
team-kiro-powers/          ← Repositório no Azure DevOps
├── padroes-do-time/
│   ├── POWER.md
│   └── steering/
│       ├── api-patterns.md
│       └── testing.md
├── security-checklist/
│   └── POWER.md
├── onboarding-dev/
│   └── POWER.md
└── README.md
```

---

## Configurando no Azure DevOps

### Passo 1: Criar o repositório

```
Azure DevOps → Repos → New Repository
Nome: team-kiro-powers
```

### Passo 2: Estrutura inicial

```powershell
# Clonar
git clone https://dev.azure.com/sua-org/projeto/_git/team-kiro-powers

# Criar o primeiro Power
mkdir padroes-do-time
# ... criar POWER.md conforme Módulo 04 ...

# Commitar
git add .
git commit -m "feat: adicionar power de padrões do time"
git push
```

### Passo 3: Cada dev instala localmente

```powershell
# Clonar o repo de Powers em algum lugar
git clone https://dev.azure.com/sua-org/projeto/_git/team-kiro-powers ~/kiro-powers

# No Kiro: Configure Powers → Install from local directory
# Apontar para ~/kiro-powers/padroes-do-time
```

---

## Estratégia 3: Monorepo com pasta compartilhada

Se o time usa monorepo:

```
monorepo/
├── packages/
│   ├── api/
│   ├── web/
│   └── shared/
├── .kiro/
│   ├── settings/
│   │   └── mcp.json
│   └── powers/               ← Powers do time aqui
│       ├── padroes-api/
│       │   └── POWER.md
│       └── padroes-frontend/
│           └── POWER.md
└── package.json
```

---

## Fluxo de atualização

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Dev cria/  │     │  Code       │     │  Time usa   │
│  atualiza   │ ──▶ │  Review     │ ──▶ │  Power      │
│  Power      │     │  (PR)       │     │  atualizado │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Processo sugerido:

1. Dev identifica necessidade (novo padrão, regra, etc.)
2. Abre branch e edita o POWER.md
3. Cria Pull Request no Azure DevOps
4. Time revisa (como qualquer código)
5. Merge → todos atualizam (`git pull`)

---

## Boas práticas de compartilhamento

### ✅ Faça

| Prática | Motivo |
|---------|--------|
| Versionar no Git | Histórico, rollback, review |
| Usar Pull Requests | Consenso do time |
| Documentar no README | Novos devs sabem o que existe |
| Keywords específicas | Evita ativação indesejada |
| Revisar periodicamente | Padrões mudam com o tempo |

### ❌ Evite

| Prática | Problema |
|---------|----------|
| Copiar por Slack/email | Desatualiza imediatamente |
| Powers enormes (>1000 linhas) | Contexto poluído |
| Keywords genéricas ("código") | Ativa quando não deveria |
| Muitos Powers parecidos | Confunde o agente |
| Secrets no POWER.md | Exposição de credenciais |

---

## Compatibilidade com outros Gits

A abordagem funciona com **qualquer Git**:

| Plataforma | Funciona? | Como clonar |
|------------|-----------|-------------|
| Azure DevOps | ✅ | `git clone https://dev.azure.com/...` |
| GitLab | ✅ | `git clone https://gitlab.com/...` |
| Bitbucket | ✅ | `git clone https://bitbucket.org/...` |
| GitHub | ✅ | `git clone https://github.com/...` |
| Self-hosted | ✅ | `git clone https://seu-git.empresa/...` |

> Powers são **arquivos Markdown + JSON**. Funcionam em qualquer plataforma Git.

---

## Resumo

- 3 estratégias: dentro do projeto, repo dedicado, ou monorepo
- Repo dedicado é o mais escalável para múltiplos projetos
- Funciona com Azure DevOps, GitLab, Bitbucket — qualquer Git
- Use Pull Requests para mudanças nos padrões
- Powers são só Markdown/JSON — sem dependência de plataforma

---

> 📌 **Próximo**: [Módulo 06 — Demo ao vivo: Criando um Power](06-demo-ao-vivo.md)
