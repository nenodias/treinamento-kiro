# 🧩 Projeto de Exemplo — Kiro Skills

## Sobre

Este projeto demonstra como configurar e usar Agent Skills no Kiro IDE. Contém três skills de exemplo prontas para uso:

## Skills incluídas

| Skill | Descrição | Comando |
|-------|-----------|---------|
| `pr-review` | Revisa PRs para qualidade e segurança | `/pr-review` |
| `api-docs` | Gera documentação OpenAPI 3.0 | `/api-docs` |
| `commit-msg` | Gera mensagens de commit padronizadas | `/commit-msg` |

## Estrutura

```
projeto-exemplo/
├── .kiro/
│   └── skills/
│       ├── pr-review/          # Skill simples (apenas SKILL.md)
│       │   └── SKILL.md
│       ├── api-docs/           # Skill com referências
│       │   ├── SKILL.md
│       │   └── references/
│       │       └── openapi-patterns.md
│       └── commit-msg/         # Skill de uso global
│           └── SKILL.md
├── src/
│   └── index.js
├── package.json
└── README.md
```

## Como testar

1. Abra este projeto no Kiro IDE
2. As skills são carregadas automaticamente
3. Teste de três formas:

### Ativação automática
```
> Revise este código para segurança e qualidade
```

### Slash command
```
> /pr-review
> /api-docs
> /commit-msg
```

### Verificar skills carregadas
```
> /context show
```

## Exercícios sugeridos

1. **Modificar uma skill**: edite o checklist do `pr-review` com regras do seu time
2. **Criar nova skill**: crie uma skill de `test-coverage` em `.kiro/skills/`
3. **Adicionar referências**: crie um `references/` na skill `pr-review`
4. **Tornar global**: copie `commit-msg` para `~/.kiro/skills/` e teste em outro projeto
