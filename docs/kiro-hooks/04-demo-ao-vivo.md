# 🎬 Módulo 04 — Demonstração Prática ao Vivo

> ⏱️ Tempo estimado: ~8 minutos

---

## Contexto

Vamos criar hooks no **mesmo projeto** das sessões anteriores — a API de produtos com TypeScript, Express, ESLint e Vitest já configurados. O projeto já tem steering documents definindo padrões, agora adicionamos automações que garantem esses padrões na prática.

### O que já existe no projeto

```
src/
├── app.ts                      # Express app
├── server.ts                   # Entrypoint
├── database/products.ts        # 15 produtos em memória
├── routes/products.ts          # GET /products (pipeline)
├── services/productService.ts  # Validate, filter, sort, paginate
└── types/productTypes.ts       # Interfaces

.kiro/
├── steering/                   # Padrões do time (sessão anterior)
│   ├── tech.md
│   ├── structure.md
│   └── padroes-testes.md
└── hooks/                      # ← VAMOS CRIAR HOOKS AQUI
```

---

## Preparação

Antes de iniciar a demo:
1. Certifique-se que `.kiro/hooks/` está vazio (ou remova hooks existentes)
2. Os backups estão em `backup-files/hooks/` caso precise restaurar
3. Abra o painel **Agent Hooks** na sidebar para visibilidade

---

## Demo 1: Lint on Save — Hook via UI (~3 min)

> **Tipo**: Run Command (rápido, sem créditos)
>
> **Cenário real**: "Nosso steering define padrões de formatação. Vamos garantir que todo arquivo salvo já saia formatado e sem erros de lint."

### Passo a passo

1. **Abra o painel Agent Hooks** (sidebar do Kiro)
2. **Clique no `+`**
3. **Selecione**: "Manually create a hook"
4. **Preencha**:
   - **Title**: Lint on Save
   - **Description**: Roda formatação e lint automaticamente ao salvar arquivos TypeScript
   - **Event**: File Saved
   - **Patterns**: `src/**/*.ts`, `tests/**/*.ts`
   - **Action**: Run Command
   - **Command**: `npm run format & npm run lint:fix`
5. **Clique em "Create Hook"**

### Teste ao vivo

1. Abra `src/services/productService.ts`
2. **Bagunce a formatação**: adicione espaços extras, quebre a indentação de uma função
3. **Salve o arquivo** (`Ctrl + S`)
4. Observe: o hook executa, o arquivo volta ao formato correto automaticamente

### Pontos para destacar

- ⚡ Execução instantânea (< 2 segundos)
- 💰 **Não consome créditos** — é só um comando shell
- 🔄 Executa toda vez que salvar, sem precisar lembrar
- 📁 Mostre o arquivo JSON gerado em `.kiro/hooks/` — transparência total

---

## Demo 2: Atualizar README — Hook via Chat (~3 min)

> **Tipo**: Ask Kiro (inteligente, consome créditos)
>
> **Cenário real**: "O projeto evolui toda sessão. O README precisa refletir o estado atual. Ao invés de atualizar manualmente, o Kiro analisa e atualiza."

### Passo a passo

1. **Abra o chat do Kiro**
2. **Digite**:

```
Crie um hook manual que, quando eu clicar nele, analise a estrutura atual do projeto
(src/, tests/, package.json) e atualize o README.md na raiz para refletir o estado
atual: endpoints disponíveis, estrutura de pastas, comandos e stack. Mantenha em português.
```

3. **O Kiro vai**:
   - Gerar o JSON do hook com trigger `userTriggered`
   - Salvar em `.kiro/hooks/`
   - O hook aparece no painel com um botão ▶️

### Teste ao vivo

1. Vá no painel **Agent Hooks**
2. Clique no botão **▶️** do hook "Atualizar README"
3. Observe o Kiro:
   - Ler a estrutura do projeto
   - Analisar endpoints, packages, testes
   - Reescrever o README com informações atualizadas


## Demo 3: Hook manual de commit chamando steering files e usando comandos do chat (~3 min)

> **Tipo**: Ask Kiro (inteligente, consome créditos)
>
> **Cenário real**: "Criar commits significativos apenas com os arquivos em stage"

### Passo a passo

1. **Abra o painel Agent Hooks** (sidebar do Kiro)
2. **Clique no `+`**
3. **Selecione**: "Manually create a hook"
4. **Preencha**:
   - **Title**: Commit staged changes
   - **Description**: Cria um commit com as alterações em stage com uma mensagem significativa
   - **Event**: Manual
   - **Action**: Ask kiro (inteligente, consome créditos)
   - **Prompt**: 
   ```
   Leia as mudanças atualmente em staged (#Git Diff).
   #guia-commit.md  inicie o commit.
   ```
5. **Clique em "Create Hook"**

### Teste ao vivo

1. Abra dois arquivos de rotas e adicione linhas ao final deles.
2. adicione apenas um em stage.
1. Abra o Hook **Commit staged changes**
2. Clique no botão **Start Hook**
3. Observe o Kiro:
   - Ler apenas os arquivos em stage
   - Iniciar as validações do steering de commit
   - Criar um commit apenas com o arquivo que estava em stage


### Pontos para destacar
- Todos os comandos usados no chat podem ser usados nos hooks
- 🧠 O agente **raciocina** sobre o projeto — não é um template fixo
- 💰 **Consome créditos** — gera uma interação com o LLM
- 🖱️ Trigger manual — só executa quando você quiser
- 📝 Resultado muito mais rico que um script simples conseguiria

---

## Comparação: Run Command vs Ask Kiro (~2 min)

Após as duas demos, compare lado a lado:

| Aspecto | Demo 1 (Lint) | Demo 2 (README) |
|---------|---------------|-----------------|
| **Ação** | Run Command | Ask Kiro |
| **Velocidade** | ~1-2 segundos | ~10-20 segundos |
| **Créditos** | Nenhum | Consome |
| **Inteligência** | Nenhuma (determinístico) | Alta (analisa contexto) |
| **Trigger** | Automático (ao salvar) | Manual (botão) |
| **Ideal para** | Tarefas com comando fixo | Tarefas que exigem raciocínio |

### Pergunta para o grupo

> "Pensando no dia a dia de vocês: que tarefas seriam Run Command e quais seriam Ask Kiro?"

**Exemplos de respostas esperadas:**
- Run Command: lint, testes, build, type-check
- Ask Kiro: review de segurança, gerar documentação, atualizar changelog

---

## Dicas para a Demo

### Se algo der errado
- Hook não aparece no painel → verifique se o JSON é válido em `.kiro/hooks/`
- Lint falha → confirme que `npm install` foi executado
- Ask Kiro não responde → verifique conexão com o serviço

### Para impressionar
- Mostre o JSON do hook — é simples e legível
- Mostre que hooks estão no repo — `git status` mostra os novos arquivos em `.kiro/hooks/`
- Conecte com steering: "O steering de `padroes-testes.md` diz *como* escrever testes. Um hook de `postTaskExecution` poderia *rodar* esses testes automaticamente após cada task do Spec."

---

## Encerramento (~2 min)

### Recapitulando

✅ **Módulo 01**: Hooks = automação por eventos (conceito do zero)
✅ **Módulo 02**: 10 triggers + 2 ações (Run Command / Ask Kiro)
✅ **Módulo 03**: Exemplos reais (segurança, lint, testes, i18n)
✅ **Módulo 04**: Criamos 2 hooks no projeto real — um rápido, um inteligente

### Como Hooks se conectam com o que já vimos

```
Spec Driven  → Define O QUE construir (requisitos, design, tarefas)
Steering     → Define COMO o agente deve pensar (padrões, convenções)
Hooks        → Define QUANDO ações automáticas acontecem (eventos → reações)
```

### Próximos passos para o time

1. Identifique 1-2 tarefas repetitivas que você faz todo dia
2. Decida: é Run Command ou Ask Kiro?
3. Crie o hook e compartilhe com o time via Git

### Próxima sessão

> Na próxima sessão veremos **Powers** — como expandir o Kiro com ferramentas externas via MCP (Trello, AWS, Miro e mais).

---

> 📌 **Fonte oficial**: [Documentação Kiro - Hooks](https://kiro.dev/docs/hooks/)
