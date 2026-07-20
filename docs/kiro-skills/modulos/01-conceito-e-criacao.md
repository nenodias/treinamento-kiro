# Módulo 01 — O que são Skills e como criar

## O que são?

Skills são **pacotes portáveis de instruções** que ensinam o Kiro a executar workflows específicos. Seguem o padrão aberto [Agent Skills](https://agentskills.io/), podendo ser compartilhadas entre ferramentas e times.

**Problema que resolvem**: sem Skills, você repete instruções complexas toda vez. Com Skills, o Kiro carrega o workflow automaticamente quando detecta que é relevante.

## Skills vs Steering vs Powers

| | Skills | Steering | 
|--|--------|----------|
| Carregamento | Sob demanda | Sempre/condicional
| Portabilidade | ✅ Padrão aberto | Apenas Kiro
| Scripts | ✅ Sim | Não | Via MCP |
| Uso ideal | Workflows reutilizáveis | Regras constantes | Integrações |

## Onde ficam

| Escopo | Localização | Quando usar |
|--------|-------------|-------------|
| Workspace | `.kiro/skills/` | Workflows do projeto/time |
| Global | `~/.kiro/skills/` | Workflows pessoais (todos os projetos) |

> Workspace tem prioridade sobre Global em caso de conflito de nomes.

## Como criar uma Skill

### Estrutura mínima

```
.kiro/skills/pr-review/
└── SKILL.md
```

### Estrutura completa (opcional)

```
.kiro/skills/pr-review/
├── SKILL.md           # Obrigatório
├── scripts/           # Código executável
├── references/        # Documentação extra
└── assets/            # Templates
```

### Formato do SKILL.md

```markdown
---
name: pr-review
description: Revisa pull requests para qualidade e segurança. Use ao revisar PRs ou fazer code review.
---

## Processo de review

1. Verificar vulnerabilidades de segurança
2. Checar tratamento de erros
3. Confirmar cobertura de testes
4. Revisar nomenclatura e estrutura
```

### Campos do frontmatter

| Campo | Obrigatório | Regras |
|-------|-------------|--------|
| `name` | ✅ | Minúsculas + hífens, máx 64 chars, igual ao nome da pasta |
| `description` | ✅ | Máx 1024 chars — descreve O QUE faz e QUANDO usar |
| `license` | ❌ | Licença da skill |
| `compatibility` | ❌ | Requisitos de ambiente |
| `metadata` | ❌ | Chave-valor (author, version, etc.) |

### Regras do campo `name`

```bash
# ✅ Válidos
pr-review
cdk-deploy
api-docs-v2

# ❌ Inválidos
PR-Review       # maiúsculas
-minha-skill    # começa com hífen
minha--skill    # hífens consecutivos
```

### Dica: a description é crucial

O Kiro usa a `description` para decidir quando ativar. Inclua keywords específicas:

```yaml
# ✅ Boa — específica com keywords
description: Revisa PRs verificando segurança, testes e qualidade. Use ao fazer code review.

# ❌ Ruim — vaga demais
description: Ajuda com código.
```

## Progressive Disclosure

Skills carregam em camadas para manter performance:

1. **Startup** → apenas `name` + `description` (~100 tokens por skill)
2. **Ativação** → corpo completo do SKILL.md (< 5000 tokens recomendado)
3. **Execução** → scripts/references só quando instruções direcionam

Se o SKILL.md ficar grande, mova detalhes para `references/`:

```markdown
Para deploy ECS, siga `references/ecs-guide.md`.
```

---

> 📌 **Próximo**: [02 - Importar, comandos e uso](02-importar-comandos-e-uso.md)
