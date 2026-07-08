# Módulo 02 — Importar, Comandos e Uso no Dia a Dia

## Importando Skills

### Pela interface do Kiro

1. Abra o painel **Agent Steering & Skills**
2. Clique **+** → **Import a skill**
3. Escolha a fonte:
   - **GitHub** — cole a URL da pasta da skill (deve ser subdiretório, não raiz)
   - **Local folder** — selecione a pasta com o SKILL.md

```
# Exemplos de URLs válidas para importar
https://github.com/usuario/repo/tree/main/skills/pr-review
https://github.com/usuario/repo/blob/main/skills/pr-review/SKILL.md
```

### Compartilhando com o time (via Git)

```bash
git add .kiro/skills/
git commit -m "feat: adicionar skills do time"
git push
# Pronto — qualquer dev que clonar já terá as skills
```

### Usando em outro projeto

| Método | Como |
|--------|------|
| Copiar pasta | `cp -r projeto-a/.kiro/skills/pr-review projeto-b/.kiro/skills/` |
| Importar do GitHub | Interface do Kiro → Import → GitHub URL |
| Skill global | Colocar em `~/.kiro/skills/` (disponível em todos os projetos) |

### Em Custom Agents (CLI)

```json
{
  "name": "meu-agente",
  "resources": [
    "skill://.kiro/skills/*/SKILL.md",
    "skill://~/.kiro/skills/*/SKILL.md"
  ]
}
```

---

## Comandos e Ativação

### Duas formas de ativar

| Forma | Como funciona |
|-------|---------------|
| **Automática** | Kiro compara seu pedido com as descriptions e ativa se houver match |
| **Slash command** | Digite `/nome-da-skill` para invocar diretamente |

### Exemplos

```
# Ativação automática (match com description)
> Revise este PR verificando segurança

# Slash command (invocação direta)
> /pr-review

# Slash command com argumentos
> /pr-review foque nas mudanças de autenticação
```

### Placeholders

Se o SKILL.md contém `$ARGUMENTS`, o texto após o comando é substituído:

```markdown
---
name: explain-code
description: Explica código de forma didática.
---

Explique o seguinte de forma clara:
$ARGUMENTS
```

Uso: `/explain-code a função de autenticação no auth.ts`

### Ver skills disponíveis

```
> /context show
```

### Gerenciamento pela interface

| Ação | Onde |
|------|------|
| Ver skills | Painel Agent Steering & Skills |
| Criar | + → Create a skill |
| Importar | + → Import a skill |
| Editar | Clicar na skill → editar SKILL.md |
| Remover | Deletar a pasta |

---

## Troubleshooting rápido

| Problema | Solução |
|----------|---------|
| Skill não ativa | Melhorar description com keywords mais específicas |
| Slash command não encontrado | Verificar que `name` = nome da pasta |
| Custom agent não encontra | Adicionar `skill://` no campo `resources` |

---

> 📌 **Próximo**: [03 - Demo prática](03-demo-pratica.md)
