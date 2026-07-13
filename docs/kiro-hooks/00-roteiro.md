# Hooks

## 📁 Eventos de Arquivo
Demo 1: Criando um Hook via UI

### Passo a passo:

1. **Abra o painel Agent Hooks** (sidebar do Kiro)
2. **Clique no `+`**
3. **Selecione**: "Manually create a hook"
4. **Preencha**:
   - **Title**: Lint on Save
   - **Description**: Roda ESLint automaticamente ao salvar arquivos TypeScript do projeto (src e tests)
   - **Event**: File Saved
   - **Patterns**: "src/**/*.ts tests/**/*.ts
   - **Action**: Run Command
   - **Command**: npm run format & npm run lint:fix
5. **Clique em "Create Hook"**
6. **Teste**:
   - Adicione identação no arquivo productService.ts
   - Ao salvar o arquivo o hook será executado e o arquivo voltará ao normal

2. 

## 💬 Eventos de Prompt/Agent

## 🔧 Eventos de Ferramenta

## 📋 Eventos de Task (Specs)


## 🖱️ Evento Manual
Demo 3: Hook de atualização do README do projeto (Manual Trigger)

### Passo a passo:

1. **No chat, digite**:
    ```
    Crie um hook manual que atualize o README.md na raiz do projeto
    ```
2. **O Kiro vai criar um hook com trigger Manual**
3. **Teste**:
   - Abra `src/services/tarefa-service.js`
   - Vá no painel **Agent Hooks**
   - Clique no botão ▶️ do hook "Atualizar README"
   - Observe o Kiro atualizar o arquivo

4. Comparar **tempo** e **créditos** entre esse e o hook de lint (Demo 1)
    