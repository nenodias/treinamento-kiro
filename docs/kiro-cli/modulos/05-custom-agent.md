# 5. Custom Agents

## O que são Custom Agents?

Custom Agents são configurações especializadas que definem **como** o Kiro se comporta para diferentes workflows. Cada agente pode ter suas próprias ferramentas, permissões, contexto e personalidade.

---

## Criando um Agente

### Criação assistida por IA (recomendado)

```bash
> /agent create code-reviewer
```

O Kiro faz perguntas para entender o propósito e gera a configuração automaticamente.

### Com descrição e MCP servers

```bash
> /agent create code-reviewer -D "Revisão de código focada em segurança" -m github
```

### Criação manual via editor

```bash
> /agent create code-reviewer --manual
```

Abre o editor para escrever a configuração diretamente.

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
> /agent list           # Lista todos os agentes disponíveis
> /agent swap reviewer  # Troca para outro agente em runtime
> /agent edit           # Edita o agente atual
> /agent set-default    # Define agente padrão para o workspace
```

---

## Iniciando com Agente Específico

```bash
kiro-cli chat --agent code-reviewer
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

1. Criar um agente: `/agent create test-writer`
2. Responder as perguntas do assistente de criação
3. Listar agentes: `/agent list`
4. Trocar para o novo agente: `/agent swap test-writer`
5. Pedir para gerar testes de uma função existente
6. Voltar ao agente padrão: `/agent swap default`

---

> Próximo: Spec-Driven Development no terminal.
