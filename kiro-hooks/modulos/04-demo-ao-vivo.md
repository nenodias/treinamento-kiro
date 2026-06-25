# 🎬 Módulo 04 — Demonstração Prática ao Vivo

> ⏱️ Tempo estimado: ~8 minutos

---

## Setup da Demo

Abra o projeto `projeto-exemplo/` no Kiro. É uma API Node.js simples de gerenciamento de tarefas.

```
projeto-exemplo/
├── src/
│   ├── controllers/
│   │   └── tarefa-controller.js
│   ├── services/
│   │   └── tarefa-service.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── package.json
└── README.md
```

---

## Demo 1: Criando um Hook via Chat (~3 min)

### Passo a passo:

1. **Abra o chat do Kiro**
2. **Digite**:

```
Crie um hook que rode "npm run lint" toda vez que eu salvar um arquivo .js neste projeto
```

3. **O Kiro vai**:
   - Gerar o JSON do hook
   - Salvar em `.kiro/hooks/`
   - Ativar automaticamente

4. **Teste**:
   - Abra `src/controllers/tarefa-controller.js`
   - Faça uma alteração qualquer
   - Salve o arquivo (`Ctrl + S`)
   - Observe o lint rodar automaticamente

---

## Demo 2: Criando um Hook via UI (~2 min)

### Passo a passo:

1. **Abra o painel Agent Hooks** (sidebar do Kiro)
2. **Clique no `+`**
3. **Selecione**: "Manually create a hook"
4. **Preencha**:
   - **Title**: Security Review
   - **Description**: Revisa código gerado buscando problemas de segurança
   - **Event**: Agent Stop
   - **Action**: Ask Kiro
   - **Instructions**:

```
Revise o código que acabou de ser gerado. Verifique:
1. Há credenciais ou tokens hardcoded?
2. Há SQL injection ou inputs não sanitizados?
3. As dependências importadas são confiáveis?
Se encontrar problemas, corrija imediatamente.
```

5. **Clique em "Create Hook"**

6. **Teste**:
   - Peça ao Kiro: "Crie uma função que conecta no banco de dados"
   - Depois que ele gerar, observe o hook de segurança ser disparado automaticamente

---

## Demo 3: Hook de geração de documentação (Manual Trigger) (~3 min)

### Passo a passo:

1. **No chat, digite**:

```
Crie um hook manual que, quando eu clicar nele, gera documentação JSDoc para o arquivo que estou editando
```

2. **O Kiro vai criar um hook com trigger Manual**

3. **Teste**:
   - Abra `src/services/tarefa-service.js`
   - Vá no painel **Agent Hooks**
   - Clique no botão ▶️ do hook "Gerar Documentação"
   - Observe o Kiro adicionar JSDoc em todas as funções

---

## Dicas para a Demo

### Se algo der errado:
- Verifique se o hook aparece no painel Agent Hooks
- Confira se o file pattern está correto
- Hooks de Run Command precisam que o comando exista (ex: `npm run lint` precisa ter o script no package.json)

### Para impressionar:
- Mostre o JSON gerado em `.kiro/hooks/` — transparência total
- Mostre que hooks **Run Command** não consomem créditos
- Mostre a diferença de velocidade: Run Command (instantâneo) vs Ask Kiro (poucos segundos)

---

## Encerramento (~2 min)

### Recapitulando o treinamento:

✅ **Módulo 01**: Hooks = automação baseada em eventos
✅ **Módulo 02**: 10 triggers + 2 ações (Ask Kiro / Run Command)
✅ **Módulo 03**: Exemplos reais para segurança, lint, testes, i18n
✅ **Módulo 04**: Criamos hooks ao vivo via chat e via UI

### Próximos passos para o time:

1. Identifique 1-2 tarefas repetitivas que você faz todo dia
2. Crie hooks para automatizá-las
3. Compartilhe hooks úteis com o time (`.kiro/hooks/` vive no repo)

### Links úteis:

- 📖 [Documentação oficial](https://kiro.dev/docs/hooks/)
- 🎯 [Tipos de hooks](https://kiro.dev/docs/hooks/types/)
- 💡 [Exemplos](https://kiro.dev/docs/hooks/examples/)
- ⚙️ [Gerenciamento](https://kiro.dev/docs/hooks/management/)

---

## Perguntas?

> 💬 Abra o chat e pergunte ao Kiro: "Que tipos de hooks eu posso criar?"
>
> Ele vai te explicar tudo!

---

> 📌 **Fonte oficial**: [Documentação Kiro - Hooks](https://kiro.dev/docs/hooks/)
