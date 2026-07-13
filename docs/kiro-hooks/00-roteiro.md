# 🪝 Roteiro do Instrutor — Agent Hooks

> Guia resumido para o instrutor conduzir a sessão. Para o conteúdo completo de cada módulo, veja os arquivos 01–04.

---

## Contexto para o instrutor

Esta é a **3ª sessão** do treinamento de Kiro. O projeto já passou por:
- **Sessão 1 (Spec Driven)**: criou o endpoint `GET /products` com services, types e testes
- **Sessão 2 (Steering)**: adicionou padrões do time em `.kiro/steering/` (tech, structure, product, padrões de testes, git flow)

Agora mostramos como **automatizar ações recorrentes** com Hooks — o próximo nível de produtividade. Os participantes já conhecem a estrutura do projeto, mas **não sabem o que são Hooks**.

---

## Abertura (~2 min)

**Conectar com o que já foi feito:**

> "Nas sessões anteriores, criamos o endpoint de produtos com Spec Driven e depois definimos padrões do time com Steering Documents. Os steerings dizem ao Kiro *como* pensar. Mas e se a gente quiser que certas ações aconteçam *automaticamente*? Tipo: salvou um arquivo → roda o lint. Terminou uma task → roda os testes. É isso que Hooks fazem."

---

## Módulo 01 — O que são Hooks (~5 min)

**Objetivo**: Explicar o conceito do zero.

- O problema: tarefas repetitivas no dia a dia
- A solução: evento → ação automática
- Onde ficam: `.kiro/hooks/` (versionável, compartilhável)
- Como criar: via chat ou via UI

**Pergunta para o grupo**: "Que tarefas vocês repetem todo dia que poderiam ser automatizadas?"

---

## Módulo 02 — Tipos e Ações (~7 min)

**Objetivo**: Apresentar todos os triggers e ações disponíveis.

- 10 tipos de trigger (arquivo, prompt, tool, task, manual)
- 2 tipos de ação: Run Command vs Ask Kiro
- Quando usar cada um (custo, velocidade, complexidade)
- Estrutura JSON do hook

**Ponto-chave**: Run Command = rápido + sem créditos. Ask Kiro = inteligente + consome créditos.

---

## Módulo 03 — Exemplos (~5 min)

**Objetivo**: Mostrar casos reais que o time pode usar amanhã.

- Passar rapidamente pelos 6 exemplos
- Focar nos que fazem mais sentido pro time (provavelmente lint, testes, segurança)

---

## Módulo 04 — Demo ao Vivo (~8 min)

**Objetivo**: Criar hooks no projeto real e testar.

### Demo 1: Lint on Save (Run Command via UI)
- Criar hook pela UI que roda `npm run format & npm run lint:fix` ao salvar `.ts`
- Testar: bagunçar indentação no `productService.ts`, salvar, ver corrigir
- **Destacar**: rápido, sem créditos, determinístico

### Demo 2: Atualizar README (Ask Kiro via chat)
- Pedir ao Kiro via chat: "Crie um hook manual que atualize o README.md"
- Testar: clicar no botão ▶️ do hook, ver o agente atualizar
- **Destacar**: inteligente, analisa o projeto, consome créditos

### Comparação
- Mostrar a diferença de tempo e custo entre Demo 1 e Demo 2
- Perguntar: "Quando usar cada tipo?"

---

## Encerramento (~3 min)

### Recap
- Hooks = automação baseada em eventos
- 10 triggers + 2 ações
- Run Command para tarefas determinísticas, Ask Kiro para tarefas que exigem raciocínio
- Compartilháveis via Git (`.kiro/hooks/`)

### Conexão com próximas sessões
> "Na próxima sessão vamos ver **Powers** — como conectar o Kiro a serviços externos via MCP. Hooks automatizam o que acontece *dentro* da IDE, Powers expandem *para fora*."

### Próximos passos para o time
1. Identifique 1-2 tarefas repetitivas do seu dia
2. Crie hooks para automatizá-las
3. Compartilhe com o time via PR

---

## Checklist pré-sessão

- [ ] `npm install` executado
- [ ] Projeto compila sem erros (`npm run build`)
- [ ] Hooks removidos de `.kiro/hooks/` (para criar do zero na demo)
- [ ] Painel Agent Hooks visível na sidebar
- [ ] Backup dos hooks disponível em `backup-files/hooks/` (para restaurar se necessário)
