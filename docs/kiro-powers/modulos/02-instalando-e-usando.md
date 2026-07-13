# 📦 Módulo 02 — Instalando e Usando Powers

> ⏱️ Tempo estimado: ~5 minutos

---

## Como instalar um Power

### Opção 1: Pela Galeria (recomendado)

1. Abra a **Command Palette** (`Ctrl + Shift + P`)
2. Digite: `Kiro: Configure Powers`
3. O painel lateral de Powers abre
4. Navegue pelos Powers disponíveis
5. Clique em **Install**

```
┌─────────────────────────────────────┐
│  ⚡ Powers                    [+]   │
│                                     │
│  📦 aws-infrastructure-as-code     │
│     Build AWS infra with CDK        │
│     [Install]                       │
│                                     │
│  📦 terraform                       │
│     Deploy infra with Terraform     │
│     [Install]                       │
│                                     │
│  📦 power-builder                   │
│     Guide to build custom Powers    │
│     [Install]                       │
└─────────────────────────────────────┘
```

### Opção 2: Via diretório local

Para Powers customizados do time:

1. Coloque a pasta do Power em `~/.kiro/powers/` ou no workspace
2. Configure via o painel de Powers

---

## Powers disponíveis na galeria (sem key)

Estes Powers funcionam **sem nenhuma API key ou token**:

| Power | O que faz | Precisa de key? |
|-------|-----------|-----------------|
| **power-builder** | Guia para criar Powers | ❌ Não (knowledge base) |
| **aws-infrastructure-as-code** | Gera CDK/CloudFormation | ❌ Não |
| **aws-sam** | Serverless com SAM | ❌ Não |
| **cloud-architect** | Arquitetura AWS | ❌ Não |
| **terraform** | Infra com Terraform | ❌ Não (precisa Docker) |
| **strands** | Agentes com Strands SDK | ❌ Não |

> ⚠️ Powers como **stripe**, **datadog**, **neon**, **postman** precisam de API key.

---

## Como o Kiro ativa um Power

Powers são ativados por **keywords**. Quando você menciona um tema relacionado, o Kiro carrega o Power automaticamente.

### Exemplo prático:

```
Você digita: "Crie uma stack CDK com Lambda e DynamoDB"

O Kiro detecta: keywords "cdk", "lambda", "dynamodb"
                → Ativa o power "aws-infrastructure-as-code"
                → Carrega documentação e ferramentas
                → Responde com conhecimento especializado
```

---

## Usando um Power no chat

Depois de instalado, o uso é **transparente**. Você fala normalmente e o Kiro ativa o Power quando relevante.

### Exemplo com o Power Builder:

```
Prompt: "Me ajude a criar um Power para o meu time"

Kiro: [ativa power-builder automaticamente]
      "Vou te guiar na criação. Primeiro, que tipo de Power
       você quer criar? Um com ferramentas MCP ou só documentação?"
```

### Exemplo com AWS IaC:

```
Prompt: "Gere um template CloudFormation para uma fila SQS com DLQ"

Kiro: [ativa aws-infrastructure-as-code]
      [usa ferramentas MCP para validar o template]
      "Aqui está o template validado..."
```

---

## Gerenciando Powers instalados

### Ver Powers ativos

No chat, o Kiro pode listar seus Powers:

```
Prompt: "Quais Powers eu tenho instalados?"
```

### Desinstalar um Power

1. Abra o painel de Powers (`Ctrl + Shift + P` → `Configure Powers`)
2. Encontre o Power instalado
3. Clique em **Uninstall**

---

## Onde ficam os arquivos?

| Local | Caminho | Propósito |
|-------|---------|-----------|
| Configuração de Powers | `~/.kiro/powers.mcp.json` | Auto-gerado pelo Kiro |
| MCP do workspace | `.kiro/settings/mcp.json` | Servers do projeto |
| MCP do usuário | `~/.kiro/settings/mcp.json` | Servers globais |

> 💡 O `powers.mcp.json` é gerado automaticamente quando você instala Powers pela galeria. Não edite manualmente.

---

## Resumo

- Instale Powers pela galeria (1 clique) ou por diretório local
- Powers sem key: power-builder, aws-iac, aws-sam, cloud-architect, terraform, strands
- Ativação é automática por keywords — use o chat normalmente
- Gerencie Powers pelo painel lateral ou pela Command Palette

---

> 📌 **Próximo**: [Módulo 03 — Configurando MCP Servers](03-configurando-mcp.md)
