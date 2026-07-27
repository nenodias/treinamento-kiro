# Workflow Completo: Trello to PR

Este guia detalha o fluxo passo a passo que o agente deve seguir ao executar este power.

---

## Board do Trello

- **Nome:** Kiro Spec Driven
- **ID:** `6a46731096111dc5fee99116`
- **URL:** https://trello.com/b/uPdgmhaQ/kiro-spec-driven

Use este board como padrão para buscar cards e listas.

---

## Regras de Transição de Colunas no Trello

O card deve seguir transições específicas de coluna durante o fluxo. O agente é responsável por mover o card automaticamente conforme o progresso.

| Etapa do Fluxo | Coluna Esperada | Ação do Agente |
|----------------|-----------------|----------------|
| Início (Refinamento) | **Refinamento** | O card DEVE estar nesta coluna para iniciar o refinamento. Se não estiver, informar o usuário e não prosseguir. |
| Início da Implementação | **Em execucao** | Mover o card para esta coluna ao iniciar a Etapa 3 (Implementação). |
| PR Aberta | **Code Review** | Mover o card para esta coluna após a PR ser criada com sucesso. |

### Regras de Validação

1. **Pré-condição para refinamento:** O card só pode ser refinado se estiver na coluna "Refinamento". Caso contrário, o agente deve:
   - Informar ao usuário em qual coluna o card está atualmente
   - Solicitar que o card seja movido para "Refinamento" antes de prosseguir
   - NÃO iniciar o refinamento até que a pré-condição seja satisfeita

2. **Transição para "Em execucao":** Antes de iniciar qualquer código, o agente DEVE mover o card para "Em execucao" usando o MCP do Trello. Isso sinaliza para a equipe que o card está sendo trabalhado.

3. **Transição para "Code Review":** Após a PR ser criada com sucesso no GitHub, mover o card para "Code Review" automaticamente.

### Como mover o card

Para mover o card entre colunas, o agente deve:
1. Buscar as listas do board usando o MCP do Trello
2. Identificar o ID da lista de destino pelo nome
3. Atualizar o card com o novo `idList`

---

## Pré-requisitos

Antes de iniciar, confirme:
- [ ] MCP server do Trello está conectado e funcional
- [ ] MCP server do GitHub está conectado e funcional
- [ ] O usuário forneceu o card do Trello (URL ou ID)
- [ ] O repositório GitHub de destino está acessível
- [ ] O card está na coluna "Refinamento" (pré-condição obrigatória)

---

## Etapa 1: Leitura e Refinamento do Card

### 1.0 Validar coluna do card (PRÉ-CONDIÇÃO)

Antes de qualquer ação, verificar em qual lista/coluna o card está:
1. Obter o card do Trello e verificar o campo `idList`
2. Buscar as listas do board para identificar o nome da coluna
3. **Se o card NÃO estiver na coluna "Refinamento":**
   - Informar: "O card está na coluna '[nome_atual]'. Para iniciar o refinamento, ele precisa estar na coluna 'Refinamento'."
   - PARAR o fluxo e aguardar ação do usuário
4. **Se o card ESTIVER na coluna "Refinamento":** prosseguir normalmente

### 1.1 Obter o conteúdo do card

Usar o MCP do Trello para ler o card:
- Título do card
- Descrição atual
- Checklists (se houver)
- Labels/etiquetas
- Membros atribuídos
- Comentários relevantes

### 1.2 Analisar e refinar a história

Com base no conteúdo do card, criar um refinamento estruturado:

```markdown
## História de Usuário

**Como** [persona/tipo de usuário],
**Eu quero** [ação/funcionalidade],
**Para que** [benefício/valor de negócio].

## Critérios de Aceite

- [ ] [Critério 1 - claro, específico e testável]
- [ ] [Critério 2 - claro, específico e testável]
- [ ] [Critério 3 - claro, específico e testável]

## Considerações Técnicas

- [Dependência ou detalhe técnico relevante]
- [Impacto em outras áreas do sistema]
- [Restrições ou limitações conhecidas]

## Definição de Pronto (DoD)

- [ ] Código implementado seguindo os padrões do projeto
- [ ] Critérios de aceite atendidos
- [ ] PR aberta e pronta para review
```

### 1.3 Atualizar o card no Trello

Usar o MCP do Trello para atualizar a descrição do card com o refinamento completo. Manter o conteúdo original como referência, adicionando o refinamento abaixo.

Formato sugerido para atualização:

```markdown
---
## 📋 Refinamento

[Conteúdo do refinamento estruturado acima]

---
### Descrição Original
[Conteúdo original preservado]
```

---

## Etapa 2: Validação com o Desenvolvedor

### 2.1 Apresentar o refinamento

Mostrar ao usuário o refinamento completo e perguntar:

> "Refinamento concluído e atualizado no card do Trello. Aqui está o resumo:
>
> **História:** [resumo da história]
>
> **Critérios de Aceite:**
> - [critério 1]
> - [critério 2]
> - [critério 3]
>
> O refinamento está OK para seguir para a implementação?"

### 2.2 Iterar se necessário

Se o desenvolvedor solicitar mudanças:
1. Ajustar o refinamento conforme feedback
2. Atualizar o card no Trello novamente
3. Apresentar a versão atualizada
4. Repetir até aprovação

### 2.3 Confirmação

**IMPORTANTE:** Só prosseguir para a Etapa 3 após confirmação explícita do desenvolvedor.

Frases que indicam aprovação:
- "Sim", "OK", "Pode seguir", "Aprovado", "Tá bom", "Segue", "Manda ver"

Frases que indicam necessidade de ajuste:
- "Não", "Ajusta", "Falta", "Muda", "Adiciona", "Remove"

---

## Etapa 3: Implementação

### 3.0 Mover card para "Em execucao"

**OBRIGATÓRIO antes de iniciar qualquer código:**
1. Buscar as listas do board do Trello
2. Identificar o ID da lista "Em execucao"
3. Mover o card para esta lista usando o MCP do Trello (atualizar `idList`)
4. Confirmar que a movimentação foi bem-sucedida

> Isso sinaliza para a equipe que o card está sendo implementado.

### 3.1 Planejar a implementação

Com base no refinamento aprovado:
1. Identificar os arquivos que precisam ser criados/modificados
2. Definir a abordagem técnica
3. Considerar os critérios de aceite como guia

### 3.2 Implementar a solução

1. Escrever o código seguindo os padrões do projeto
2. Garantir que cada critério de aceite é atendido
3. Manter o código limpo e bem documentado

### 3.3 Verificar a implementação

Antes de prosseguir para o versionamento:
- Verificar se o código compila sem erros
- Confirmar que os critérios de aceite foram atendidos
- Garantir que não há regressões óbvias

---

## Etapa 4: Versionamento e PR

### 4.1 Regras de branches protegidas

**NUNCA fazer commit diretamente em:**
- `main`
- `master`
- `develop`

Sempre verificar a branch atual antes de qualquer operação git.

### 4.2 Criar feature branch

Criar a branch a partir da `main`:

**Formato de nomenclatura:**
```
feature/<descricao-kebab-case>
```

**Regras:**
- Usar kebab-case (minúsculas separadas por hífen)
- Ser descritivo mas conciso
- Derivar do título/conteúdo do card
- Máximo ~50 caracteres na descrição

**Exemplos:**
- `feature/adicionar-filtro-busca-usuarios`
- `feature/corrigir-calculo-frete`
- `feature/implementar-notificacao-email`
- `feature/atualizar-dashboard-vendas`

**Comando:**
```bash
git checkout main
git pull origin main
git checkout -b feature/<descricao>
```

### 4.3 Fazer commit

**Formato: Conventional Commits**
```
<tipo>(<escopo>): <descrição>
```

**Tipos permitidos:**
| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Refatoração sem mudança de comportamento |
| `docs` | Apenas documentação |
| `style` | Formatação, sem mudança de lógica |
| `test` | Adição ou correção de testes |
| `chore` | Tarefas de manutenção |

**Regras da mensagem de commit:**
- Descrição em português, imperativo ("adicionar", não "adicionado")
- Máximo 72 caracteres na primeira linha
- Escopo é opcional mas recomendado
- Letra minúscula no início da descrição

**Exemplos:**
- `feat(users): adicionar filtro de busca por nome`
- `fix(auth): corrigir validação de token expirado`
- `feat(dashboard): implementar gráfico de vendas mensais`
- `refactor(api): extrair lógica de validação para service`

**Comandos:**
```bash
git add .
git commit -m "feat(escopo): descrição da mudança"
```

### 4.4 Push e criação da PR

**Push da branch:**
```bash
git push -u origin feature/<descricao>
```

**Criar Pull Request para a main:**

Usar o MCP do GitHub para criar a PR com:

- **Título:** Conciso, < 70 caracteres, descrevendo a mudança principal
  - Exemplo: "feat(users): adicionar filtro de busca por nome"

- **Descrição:** Estruturada com:

```markdown
## Resumo

[Breve descrição do que foi feito e por quê]

## Mudanças

- [Mudança 1]
- [Mudança 2]
- [Mudança 3]

## Card do Trello

[Link para o card do Trello]

## Critérios de Aceite

- [x] [Critério 1]
- [x] [Critério 2]
- [x] [Critério 3]
```

- **Base branch:** `main`
- **Head branch:** `feature/<descricao>`

### 4.5 Mover card para "Code Review"

Após a PR ser criada com sucesso:
1. Buscar as listas do board do Trello
2. Identificar o ID da lista "Code Review"
3. Mover o card para esta lista usando o MCP do Trello (atualizar `idList`)
4. Confirmar a movimentação

---

## Resumo Final

Após completar todas as etapas, informar ao desenvolvedor:

> "Fluxo completo finalizado:
>
> ✅ Card validado na coluna "Refinamento"
> ✅ Card refinado e atualizado no Trello
> ✅ Refinamento aprovado
> ✅ Card movido para "Em execucao"
> ✅ Implementação concluída
> ✅ Feature branch criada: `feature/<nome>`
> ✅ Commit realizado: `<mensagem do commit>`
> ✅ PR aberta: [link da PR]
> ✅ Card movido para "Code Review"
>
> A PR está pronta para review."

---

## Tratamento de Erros

### Se o card do Trello não for encontrado
- Pedir ao usuário para verificar o ID/URL do card
- Listar os boards disponíveis para ajudar a localizar

### Se o repositório GitHub não for acessível
- Verificar permissões do token
- Confirmar o nome do repositório com o usuário

### Se a branch main não existir
- Verificar qual é a branch principal (pode ser `master`)
- Usar a branch principal correta como base

### Se houver conflitos
- Informar o desenvolvedor sobre os conflitos
- Sugerir resolução ou rebase antes de abrir a PR
