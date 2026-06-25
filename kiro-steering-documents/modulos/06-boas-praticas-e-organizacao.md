# Módulo 06 — Boas Práticas e Organização

## Princípios fundamentais

### 1. Menos é mais

O contexto do agente tem limite. Cada Steering Document `always` consome espaço que poderia ser usado para o código que você está editando. Seja conciso.

```
❌ Ruim: Steering com 200 linhas explicando toda a história do projeto
✅ Bom: Steering com 30 linhas focando no que impacta decisões de código
```

### 2. Específico > Genérico

Instruções vagas geram resultados vagos. Seja direto e dê exemplos.

```markdown
❌ "Use boas práticas de código"
✅ "Funções devem ter no máximo 20 linhas. Se passar, extraia para função auxiliar."

❌ "Trate erros adequadamente"
✅ "Use try/catch em chamadas externas. Retorne AppError com código HTTP semântico."
```

### 3. Atualize junto com o código

Steering Documents são documentação viva. Quando o time muda um padrão, o steering deve ser atualizado no mesmo PR.

```
PR: "Migrar de Express para Fastify"
  ├── src/... (código migrado)
  └── .kiro/steering/projeto.md (atualizar framework)
```

---

## Organização recomendada

### Estrutura por responsabilidade

```
.kiro/steering/
├── projeto.md                  ← O que é o projeto (always)
├── padroes-codigo.md           ← Como escrever código (always)
├── seguranca.md                ← Regras de segurança (always)
├── convencoes-api.md           ← Padrões de API (fileMatch: routes)
├── padroes-testes.md           ← Como testar (fileMatch: *.test.*)
├── padroes-componentes.md      ← UI patterns (fileMatch: components)
├── infra.md                    ← Regras de IaC (fileMatch: infra/)
├── deploy.md                   ← Como fazer deploy (manual)
└── troubleshooting.md          ← Problemas comuns (manual)
```

### Nomenclatura

| Padrão | Exemplo | Uso |
|--------|---------|-----|
| `[domínio].md` | `seguranca.md` | Arquivo único por domínio |
| `padroes-[area].md` | `padroes-testes.md` | Padrões específicos |
| `convencoes-[area].md` | `convencoes-api.md` | Convenções de formato |
| `guia-[processo].md` | `guia-deploy.md` | Processos manuais |

---

## Tamanho ideal

### Regra prática

| Modo | Tamanho recomendado | Máximo |
|------|---------------------|--------|
| always | 20-50 linhas | 100 linhas |
| fileMatch | 30-80 linhas | 150 linhas |
| manual | Sem limite rígido | 200 linhas |

### Como medir o impacto

Se você tem 3 arquivos `always` com 80 linhas cada = 240 linhas de contexto consumidas em **toda** interação. Isso é significativo.

**Estratégia**: mantenha o total de `always` abaixo de 150 linhas combinadas. Mova o resto para `fileMatch` ou `manual`.

---

## Checklist de qualidade

### Para cada Steering Document, verifique:

- [ ] **Tem propósito claro?** — Cada arquivo resolve um problema específico
- [ ] **Está no modo certo?** — always só para o essencial
- [ ] **É conciso?** — Sem repetição ou informação desnecessária
- [ ] **Tem exemplos?** — Regras abstratas são difíceis de seguir
- [ ] **Está atualizado?** — Reflete o estado atual do projeto
- [ ] **Não tem conflitos?** — Não contradiz outro steering
- [ ] **Não tem secrets?** — Nenhum token, senha ou chave

---

## Anti-patterns comuns

### 1. O "Steering Monolítico"

```
❌ .kiro/steering/tudo.md (500 linhas com tudo misturado)
```

**Problema**: consome contexto desnecessário, difícil de manter.

**Solução**: dividir por responsabilidade com modos apropriados.

### 2. O "Steering Redundante"

```markdown
❌ Repetir no steering o que já está no tsconfig.json ou .eslintrc
```

**Problema**: duplicação que fica desatualizada.

**Solução**: usar referências `#[[file:tsconfig.json]]` quando necessário.

### 3. O "Steering Aspiracional"

```markdown
❌ "Devemos ter 100% de cobertura de testes"
   (quando o projeto tem 20%)
```

**Problema**: o agente vai gerar código seguindo regras que o time não segue, criando inconsistência.

**Solução**: documentar o padrão **atual** e criar um steering separado para o padrão **alvo** (modo manual).

### 4. O "Steering Contraditório"

```markdown
❌ arquivo-1.md: "Use classes para services"
   arquivo-2.md: "Prefira funções puras, evite classes"
```

**Problema**: o agente fica confuso e gera código inconsistente.

**Solução**: revisar periodicamente para eliminar contradições.

### 5. O "Steering Desatualizado"

```markdown
❌ "Usamos Express 4.x" (quando o projeto migrou para Fastify há 3 meses)
```

**Problema**: o agente gera código com a stack errada.

**Solução**: incluir atualização de steering no Definition of Done do time.

---

## Governança em times

### Quem pode editar?

Recomendação: tratar steerings como código — PR com review.

```yaml
# .github/CODEOWNERS
.kiro/steering/ @tech-leads
```

### Review de steering

Incluir no checklist de PR:

- [ ] Steering atualizado se houve mudança de padrão?
- [ ] Novo steering tem modo de inclusão adequado?
- [ ] Total de `always` ainda está dentro do limite?

### Onboarding de steering

Quando um dev novo entra no time:

1. Apresentar a pasta `.kiro/steering/`
2. Explicar os modos de inclusão
3. Mostrar como usar `#` para steerings manuais
4. Encorajar contribuições via PR

---

## Template para novos Steering Documents

```markdown
---
inclusion: [always | fileMatch | manual]
fileMatchPattern: "[padrão glob]"  # apenas para fileMatch
---

# [Título Descritivo]

## Contexto
[1-2 frases sobre quando/por que este steering é relevante]

## Regras
- [Regra 1 — específica e acionável]
- [Regra 2 — com exemplo se possível]
- [Regra 3]

## Exemplos

### ✅ Correto
```[linguagem]
// exemplo de código seguindo a regra
```

### ❌ Incorreto
```[linguagem]
// exemplo de código violando a regra
```

## Referências
- [Link para documentação relevante]
```

---

## Métricas de sucesso

Como saber se seus Steering Documents estão funcionando:

| Métrica | Como medir | Meta |
|---------|-----------|------|
| Consistência de código | Menos comentários de estilo em PRs | -50% em 1 mês |
| Tempo de onboarding | Dias até primeiro PR produtivo | -30% |
| Retrabalho | PRs rejeitados por padrão | -40% |
| Satisfação do time | Survey mensal | >4/5 |

---

> 📌 **Próximo módulo**: [07 - Demonstração prática](07-demo-pratica.md)
