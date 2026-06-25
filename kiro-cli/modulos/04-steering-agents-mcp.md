# 04 — Steering, Agents e MCP

## 💡 Em uma frase

> "Você ensina a IA como seu projeto funciona — uma vez só. Depois ela segue as regras sempre."

---

## Steering — regras que a IA sempre segue

Imagine que toda vez que você pede algo, a IA já sabe:
- Qual linguagem usar
- Qual padrão de código seguir
- Como nomear variáveis
- Que framework de teste usar

Isso é **steering**. Você escreve um markdown e a IA obedece.

### Onde colocar

- No projeto: `.kiro/steering/padroes.md`
- Global (pessoal): `~/.kiro/steering/padroes.md`

### Exemplo prático

```markdown
# Padrões do Projeto
- Use TypeScript para código novo
- camelCase para variáveis, PascalCase para classes
- Comentários em português
- Testes com Vitest
- AWS SDK v3 (modular)
```

Salva isso, e **toda** resposta da IA vai seguir essas regras. Sem precisar repetir.

---

## Custom Agents — perfis especializados

Agents são como "modos" do Kiro. Cada um tem um foco:

```bash
kiro-cli agent create code-reviewer -D "Revisa código buscando bugs"
```

Isso cria um arquivo `.kiro/agents/code-reviewer.json`:

```json
{
  "name": "code-reviewer",
  "description": "Revisa código buscando bugs e melhorias",
  "instructions": [
    "Foque em segurança e performance",
    "Sugira melhorias com exemplos"
  ],
  "tools": {
    "allow": ["read", "bash"]
  }
}
```

Pra usar:

```bash
kiro-cli chat --agent code-reviewer
```

Ou dentro do chat: `/agent swap code-reviewer`

---

## MCP — plugins pro Kiro

MCP (Model Context Protocol) conecta ferramentas externas. Pense como plugins.

Exemplo: conectar a documentação da AWS:

```json
{
  "mcpServers": {
    "aws-docs": {
      "command": "uvx",
      "args": ["awslabs.aws-documentation-mcp-server@latest"],
      "env": { "FASTMCP_LOG_LEVEL": "ERROR" }
    }
  }
}
```

Salva em `.kiro/settings/mcp.json` e pronto — o chat agora consulta docs da AWS.

---

## Dica de ouro pra times

Commite a pasta `.kiro/` no Git:

```
.kiro/
├── steering/padroes.md     ← todo mundo segue as mesmas regras
├── agents/reviewer.json    ← agent compartilhado
└── settings/mcp.json       ← mesmos plugins pro time
```

Um dev novo faz clone e já tem tudo configurado.

---

➡️ Próximo: [05 — Limitações e Referências](05-limitacoes-e-referencias.md)
