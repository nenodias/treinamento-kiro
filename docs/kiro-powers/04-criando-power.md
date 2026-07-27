# ⚡ Módulo 04 — Criando seu próprio Power

> ⏱️ Tempo estimado: ~8 minutos

---

## Por que criar um Power?

- Empacotar **boas práticas do seu time** em formato reutilizável
- Compartilhar **conhecimento especializado** com a comunidade
- Automatizar **setup de projetos** com ferramentas específicas
- Documentar **workflows complexos** de forma que o agente entenda

---

## Passo 1: Criar a estrutura

No mínimo, você precisa de um diretório com `POWER.md`:

```bash
mkdir power-meu-framework
cd power-meu-framework
touch POWER.md
```

Estrutura mínima:

```
power-meu-framework/
└── POWER.md
```

Estrutura completa:

```
power-meu-framework/
├── POWER.md              # Obrigatório
├── mcp.json              # Se usar ferramentas MCP
└── steering/             # Se tiver múltiplos workflows
    ├── setup.md
    └── patterns.md
```

---

## Passo 2: Escrever o POWER.md

### Frontmatter

```yaml
---
name: "meu-framework"
displayName: "Meu Framework Power"
description: "Boas práticas e ferramentas para o Meu Framework"
keywords: ["meu-framework", "componentes", "setup", "deploy"]
author: "Seu Nome"
---
```

**Dicas para keywords:**
- Use palavras que desenvolvedores realmente falam no dia a dia
- Inclua o nome da ferramenta + conceitos relacionados
- Pense em sinônimos e termos em inglês e português

### Seção de Onboarding

```markdown
# Onboarding

## Step 1: Verificar pré-requisitos
Antes de usar, confirme que está instalado:
- **Node.js** >= 18: `node --version`
- **Meu Framework CLI**: `mf --version`

## Step 2: Inicializar projeto
Se ainda não há um projeto configurado:
```bash
mf init --template=recommended
```

## Step 3: Criar hook de qualidade (opcional)
Adicione em `.kiro/hooks/quality-check.kiro.hook`:
```json
{
  "name": "Quality Check",
  "version": "1.0.0",
  "when": { "type": "userTriggered" },
  "then": {
    "type": "askAgent",
    "prompt": "Run quality checks on the current project"
  }
}
```
```

### Seção de Boas Práticas (power simples)

Para powers sem steering separado, inclua tudo no POWER.md:

```markdown
# Best Practices

## Estrutura de componentes
- Use composição ao invés de herança
- Separe lógica de apresentação
- Nomeie componentes com PascalCase

## Padrões de estado
- Estado local para UI
- Estado global para dados compartilhados
- Use selectors para derivar dados

## Exemplo: Componente padrão
```typescript
export function UserProfile({ userId }: Props) {
  const user = useUser(userId);
  return <ProfileView user={user} />;
}
```
```

### Seção de Steering (power complexo)

Para powers com muitos workflows, mapeie steering files:

```markdown
# When to Load Steering Files
- Criando componentes novos → `component-patterns.md`
- Configurando estado global → `state-management.md`
- Fazendo deploy → `deployment-guide.md`
- Escrevendo testes → `testing-patterns.md`
```

---

## Passo 3: Adicionar MCP (opcional)

Se o power usa ferramentas MCP, crie `mcp.json`:

```json
{
  "mcpServers": {
    "meu-framework-tools": {
      "command": "npx",
      "args": ["-y", "@meu-framework/mcp-server"],
      "env": {
        "API_KEY": "${MEU_FRAMEWORK_API_KEY}"
      }
    }
  }
}
```

**Regras:**
- Nomes de servidores no POWER.md devem bater com `mcpServers`
- Use `${VARIAVEL}` para secrets (nunca hardcode)
- O Kiro fará namespace automático na instalação

---

## Passo 4: Testar localmente

1. Abra o Kiro IDE
2. Painel de Powers → **Add Custom Power**
3. Selecione **Import power from a folder**
4. Aponte para o diretório do seu power
5. Teste a ativação mencionando keywords na conversa

```
Teste: "Quero criar um componente com meu-framework"
  → O power deve ativar e o agente deve usar o contexto do POWER.md
```

---

## Passo 5: Compartilhar

### Via GitHub (público)

```bash
git init
git add POWER.md mcp.json steering/
git commit -m "Initial release"
git push origin main
```

Outros instalam via: **Add Custom Power** → **Import power from GitHub** → URL do repo.

> ℹ️ O repositório precisa ser público para compartilhamento amplo. Repos privados exigem permissão de acesso.

### Via pasta compartilhada (time)

Para uso interno do time, mantenha o power em um repositório Git que todos tenham acesso e instrua a instalação local.

---

## Exemplo completo: Power para API Express

```
power-express-api/
├── POWER.md
└── steering/
    └── error-handling.md
```

**POWER.md:**

```markdown
---
name: "express-api"
displayName: "Express API Patterns"
description: "Best practices for building REST APIs with Express.js"
keywords: ["express", "api", "rest", "middleware", "routes", "endpoint"]
author: "Time Backend"
---

# Onboarding

## Step 1: Verificar Express
- Confirme que `express` está nas dependências: `npm list express`

# Best Practices

## Estrutura de rotas
- Route handlers são finos: validar input, chamar service, retornar response
- Services contêm lógica de negócio (funções puras)
- Use middleware para concerns transversais (auth, logging, error handling)

## Validação
- Valide todos os inputs antes de processar
- Retorne erros coletados de uma vez (não pare no primeiro erro)
- Use HTTP status codes corretos (400 para input inválido, 404 para não encontrado)

## Error handling
- Use um middleware centralizado de error handling
- Nunca exponha stack traces em produção
- Logue erros com contexto suficiente para debug

# When to Load Steering Files
- Implementando error handling → `error-handling.md`
```

---

## Checklist: Meu Power está pronto?

- [ ] `POWER.md` com frontmatter válido (name, displayName, description, keywords, author)
- [ ] Keywords refletem como devs realmente falam sobre o assunto
- [ ] Seção de onboarding valida pré-requisitos
- [ ] Boas práticas documentadas (no POWER.md ou em steering files)
- [ ] Se usa MCP: `mcp.json` com nomes consistentes
- [ ] Testado localmente via "Import power from a folder"
- [ ] Repositório Git pronto para compartilhar (se público)

---

## Resumo

| Etapa | Ação |
|-------|------|
| 1. Estrutura | Criar diretório com POWER.md |
| 2. POWER.md | Frontmatter + onboarding + boas práticas |
| 3. MCP | Adicionar mcp.json se usar ferramentas |
| 4. Testar | Instalar local e verificar ativação por keywords |
| 5. Compartilhar | Push para GitHub ou compartilhar pasta |

---

> 📌 **Fonte oficial**: [Documentação Kiro - Create Powers](https://kiro.dev/docs/powers/create/)
