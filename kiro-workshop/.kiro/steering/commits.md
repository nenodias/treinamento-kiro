# Commits

## Formato da Mensagem

Seguir o padrão **Conventional Commits**:

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

### Tipos permitidos

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Refatoração sem mudar comportamento |
| `test` | Adição ou correção de testes |
| `docs` | Alteração em documentação |
| `chore` | Tarefas de manutenção (deps, configs, scripts) |
| `style` | Formatação, espaços, ponto-e-vírgula (sem mudança de lógica) |

### Escopo

Usar o módulo ou camada afetada:

- `handlers`, `services`, `utils` — código do projeto demo
- `steering`, `hooks`, `powers` — configuração Kiro
- `modulos` — guias do workshop
- `deps` — dependências (package.json)

## Regras

1. **Descrição curta** em português, imperativo, sem ponto final, máximo 72 caracteres
   - ✅ `feat(handlers): adicionar endpoint de exclusão de tarefa`
   - ❌ `feat(handlers): Adicionado endpoint de exclusão de tarefa.`

2. **Um commit por mudança lógica** — não misturar feature + refactor + fix no mesmo commit

3. **Corpo** (opcional) — explicar o "porquê" quando não for óbvio pelo diff. Separar da descrição com uma linha em branco.

4. **Breaking changes** — adicionar `BREAKING CHANGE:` no rodapé com explicação do impacto

5. **Não commitar**:
   - Arquivos de `node_modules/`
   - Arquivos `.env` ou com credenciais
   - Código comentado ou debug (`console.log` temporário)
   - Mudanças não relacionadas ao escopo do commit

## Boas Práticas

- Fazer commits pequenos e frequentes — facilita review e rollback
- Rodar `npm test` antes de commitar (garantir que testes passam)
- Usar `git add -p` para staging parcial quando o arquivo tem mudanças de escopos diferentes
- Preferir staging de arquivos específicos (`git add src/handlers/criar-tarefa.mjs`) sobre `git add .`

## Exemplos

```
feat(services): implementar validação de prioridade na criação de tarefa

Rejeitar valores fora do enum (baixa, media, alta) com ValidacaoError
para manter consistência dos dados em memória.
```

```
fix(handlers): tratar body undefined no handler de listar tarefas
```

```
test(services): adicionar cenários de erro para subtarefa-service
```

```
chore(deps): atualizar vitest para 3.1.0
```
