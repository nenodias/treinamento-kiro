# 5. Custom Agents

## O que são Custom Agents?

Custom Agents são configurações especializadas que definem **como** o Kiro se comporta para diferentes workflows. Cada agente pode ter suas próprias ferramentas, permissões, contexto e personalidade.


---

## Formato do Agente (Markdown)

Agentes são arquivos Markdown auto-contidos:

```markdown
---
name: code-reviewer
description: Revisão de código focada em segurança e boas práticas
tools:
  - read
  - web
permissions:
  rules:
    - capability: fs_write
      effect: deny
    - capability: shell
      effect: deny
---

Você é um revisor de código especializado em segurança.
Analise código buscando vulnerabilidades, más práticas e problemas de performance.
Nunca modifique arquivos — apenas reporte findings com severity e sugestão de fix.
```

### Tags de ferramentas

| Tag | O que inclui |
|-----|-------------|
| `read` | Leitura de arquivos |
| `write` | Escrita de arquivos |
| `shell` | Execução de comandos |
| `web` | Busca web e fetch de URLs |
| `spec` | Ferramentas de specs |
| `*` | Todas as ferramentas |

---

## Gerenciando Agentes

```bash
> /agent                # Lista todos os agentes disponíveis
> /agent swap reviewer  # Troca para outro agente em runtime
> /agent edit           # Edita o agente atual
```

---

## Iniciando com Agente Específico

```bash
kiro-cli chat --agent kiro_guide
```

---

## Localização dos Agentes

```
.kiro/agents/        # Workspace (específico do projeto)
~/.kiro/agents/      # Global (disponível em todos os projetos)
```

---

## Exemplos Práticos

### Agente de Testes

```markdown
---
name: test-writer
description: Gera testes unitários e de integração
tools:
  - read
  - write
  - shell
---

Você é um especialista em testes.
Use Vitest como framework. Siga os padrões em .kiro/steering/padroes-testes.md.
Gere testes em tests/unit/ para funções isoladas e tests/integration/ para endpoints.
Sempre rode `npm test` após criar os testes para garantir que passam.
```

### Agente de Documentação

```markdown
---
name: doc-writer
description: Mantém documentação atualizada
tools:
  - read
  - write
permissions:
  rules:
    - capability: shell
      effect: deny
    - capability: fs_write
      effect: allow
      match:
        - "docs/**"
        - "README.md"
---

Você é um technical writer.
Mantenha documentação clara, concisa e atualizada.
Só pode escrever em docs/ e no README.md.
Use português brasileiro.
```

---

## Quando usar Custom Agents?

| Cenário | Agente sugerido |
|---------|----------------|
| Code review antes de PR | `code-reviewer` (read-only) |
| Geração de testes | `test-writer` (read + write + shell) |
| Documentação | `doc-writer` (write limitado a docs/) |
| DevOps / Infra | `devops` (shell com AWS/Terraform) |
| Refactoring | `refactorer` (read + write, sem shell) |

---

## Demo ao Vivo

1. /teste-generator analise e crie os testes do projeto
---

> Próximo: Spec-Driven Development no terminal.
