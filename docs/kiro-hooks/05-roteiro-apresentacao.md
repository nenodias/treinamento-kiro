# 🎤 Roteiro de Apresentação — Agent Hooks

> Guia passo a passo para o instrutor conduzir a sessão de ~25 minutos.

---

## Pré-requisitos do instrutor

Antes de começar:

- [ ] `npm install` executado no projeto
- [ ] Projeto compila sem erros (`npm run build`)
- [ ] `.kiro/hooks/` está vazio (apenas `.gitkeep`) — hooks serão criados do zero na demo
- [ ] Backups estão em `backup-files/hooks/` para restaurar se necessário
- [ ] Painel **Agent Hooks** visível na sidebar do Kiro

> 💡 Se precisar restaurar hooks após a sessão, copie os arquivos de `backup-files/hooks/` para `.kiro/hooks/`.

---

## Abertura (~2 min)

### Conectar com as sessões anteriores

Comece fazendo a ponte com o que já foi feito:

> "Nas sessões anteriores, a gente construiu o endpoint de produtos usando Spec Driven — o Kiro gerou requisitos, design, tarefas e implementou tudo. Depois, com Steering Documents, definimos os padrões do time: como formatar, como testar, como commitar."
>
> "Steering diz ao Kiro *como* ele deve pensar. Mas e se a gente quiser que certas coisas aconteçam *automaticamente*? Tipo: salvou um arquivo, roda o lint. Terminou uma task, roda os testes. É isso que Hooks fazem."

### Apresentar o conceito em uma frase

> "Hook = quando X acontece, faça Y. Simples assim."

---

## Módulo 01 — O que são Hooks (~5 min)

### Pontos para cobrir

1. **O problema**: pergunte ao grupo "Quantas vezes por dia vocês rodam lint manualmente? E testes?"
2. **A solução**: evento → ação automática
3. **Onde ficam**: `.kiro/hooks/` — são arquivos JSON, ficam no repo, o time inteiro se beneficia
4. **Como criar**: duas formas — via chat (linguagem natural) ou via UI (formulário)

### Interação com o grupo

> "Que tarefas vocês repetem todo dia que poderiam ser automatizadas?"

Anote as respostas — vai usar na hora dos exemplos para conectar com o que eles disseram.

### Conceito-chave para fixar

```
EVENTO detectado  →  AÇÃO executada
(arquivo salvo)       (rodar lint)
(agente parou)        (review de segurança)
(task concluída)      (rodar testes)
```

---

## Módulo 02 — Tipos e Ações (~7 min)

### 10 triggers — passe por categoria

Não precisa detalhar cada um. Agrupe:

1. **Eventos de arquivo** (save, create, delete) — os mais intuitivos, comece por aqui
2. **Eventos de prompt/agent** (submit, stop) — "quando vocês enviam um prompt ou o agente termina"
3. **Eventos de tool** (pre/post) — "antes ou depois do agente executar uma ferramenta, tipo escrever arquivo"
4. **Eventos de task** (pre/post) — conecte com Spec: "lembram das tasks que o Kiro executou? dá pra rodar testes depois de cada uma automaticamente"
5. **Manual** — "um botão que vocês clicam quando quiserem"

### 2 ações — essa é a parte mais importante

Dedique tempo aqui. A distinção Run Command vs Ask Kiro é fundamental:

| | Run Command | Ask Kiro |
|--|-------------|----------|
| **Velocidade** | ~1-2 segundos | ~10-20 segundos |
| **Créditos** | Nenhum | Consome |
| **Inteligência** | Zero (executa comando fixo) | Alta (raciocina sobre contexto) |
| **Ideal para** | lint, testes, build, format | review, docs, análise, refactor |

> "Regra simples: se dá pra resolver com um comando no terminal, use Run Command. Se precisa de raciocínio, use Ask Kiro."

### Mostre a estrutura JSON

Abra o módulo 02 e mostre o exemplo de JSON. Destaque:
- `when.type` → qual evento
- `when.patterns` → quais arquivos (quando aplicável)
- `then.type` → qual ação
- `then.command` ou `then.prompt` → o que executar

---

## Módulo 03 — Exemplos (~5 min)

### Passe rápido por 3-4 exemplos

Não precisa cobrir todos os 6. Escolha os mais relevantes pro time:

1. **Lint on Save** (File Save + Run Command) — todo mundo precisa
2. **Security Scanner** (Agent Stop + Ask Kiro) — impressiona e mostra o poder
3. **Testes pós-Task** (Post Task Execution + Run Command) — conecta com Spec Driven

Se o time trabalha com i18n ou componentes React, inclua os exemplos 3 ou 4.

### Para cada exemplo, destaque

- O trigger escolhido e por quê
- A ação escolhida e por quê
- Um cenário real onde usariam isso

---

## Módulo 04 — Demo ao Vivo (~8 min)

### Demo 1: Lint on Save — via UI (~3 min)

**Narrativa**: "Nosso steering de padrões define como o código deve ser formatado. Vamos criar um hook que garante isso automaticamente."

1. Abra o painel **Agent Hooks** na sidebar
2. Clique no **+**
3. Selecione "Manually create a hook"
4. Preencha:
   - **Title**: Lint on Save
   - **Description**: Roda formatação e lint automaticamente ao salvar arquivos TypeScript
   - **Event**: File Saved
   - **Patterns**: `src/**/*.ts`, `tests/**/*.ts`
   - **Action**: Run Command
   - **Command**: `npm run format & npm run lint:fix`
5. Clique em **Create Hook**

**Teste ao vivo:**
1. Abra `src/services/productService.ts`
2. Bagunce a indentação — adicione espaços extras, quebre alinhamento
3. Salve (`Ctrl + S`)
4. O arquivo volta ao formato correto sozinho

**Fale enquanto acontece:**
> "Olha: instantâneo. Menos de 2 segundos. Sem créditos. E agora todo dev do time que clonar esse repo já vai ter esse hook ativo."

---

### Demo 2: Atualizar README — via chat (~3 min)

**Narrativa**: "O projeto evolui toda sessão. O README precisa acompanhar. Ao invés de atualizar na mão, vamos pedir pro Kiro fazer isso com um clique."

1. Abra o chat do Kiro
2. Digite:

```
Crie um hook manual que, quando eu clicar nele, analise a estrutura atual do projeto
(src/, tests/, package.json) e atualize o README.md na raiz para refletir o estado atual:
endpoints disponíveis, estrutura de pastas, comandos e stack. Mantenha em português.
```

3. O Kiro cria o hook e ele aparece no painel com botão ▶️

**Teste ao vivo:**
1. Vá no painel Agent Hooks
2. Clique no **▶️** do hook "Atualizar README"
3. Observe o agente ler o projeto e reescrever o README

**Fale enquanto acontece:**
> "Esse é Ask Kiro — ele está raciocinando, lendo arquivos, entendendo a estrutura. Leva mais tempo, consome créditos, mas olha o resultado: um README atualizado e completo sem eu escrever uma linha."

---

### Comparação (~2 min)

Após as duas demos, pare e compare:

| | Demo 1 (Lint) | Demo 2 (README) |
|--|---------------|-----------------|
| Tipo de ação | Run Command | Ask Kiro |
| Tempo | ~2s | ~15s |
| Créditos | Zero | Consome |
| Trigger | Automático (ao salvar) | Manual (botão) |
| Inteligência | Nenhuma | Alta |

**Pergunte:**
> "Pensando no dia a dia de vocês: que tarefas seriam Run Command e quais seriam Ask Kiro?"

---

## Encerramento (~3 min)

### Recap

> "Resumindo: Hooks são evento → ação. 10 tipos de trigger, 2 tipos de ação. Run Command pra coisas determinísticas, Ask Kiro pra coisas que precisam de raciocínio. E ficam no repo — todo o time ganha."

### Conecte as três sessões

> "Olha como as peças se encaixam:"

```
Spec Driven  → Define O QUE construir
Steering     → Define COMO o agente deve pensar
Hooks        → Define QUANDO ações automáticas acontecem
```

> "As três juntas criam um fluxo de trabalho onde o Kiro sabe o que fazer, como fazer, e quando fazer automaticamente."

### Próximos passos

1. Identifique 1-2 tarefas repetitivas do seu dia
2. Decida se é Run Command ou Ask Kiro
3. Crie o hook e compartilhe com o time via PR

### Gancho para a próxima sessão

> "Na próxima sessão vamos ver **Powers** — como expandir o Kiro para fora da IDE. Hooks automatizam o que acontece aqui dentro. Powers conectam com Trello, AWS, Miro e outros serviços externos."

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Hook não aparece no painel | Verifique se o JSON é válido em `.kiro/hooks/` |
| Lint falha ao executar | Confirme que `npm install` foi executado |
| Ask Kiro não responde | Verifique conexão/créditos |
| Precisa restaurar hooks | Copie de `backup-files/hooks/` para `.kiro/hooks/` |

---

## Após a sessão

Para deixar o repo pronto para a próxima sessão (Powers), mantenha os hooks criados durante a demo em `.kiro/hooks/`. Eles fazem parte da evolução do projeto.
