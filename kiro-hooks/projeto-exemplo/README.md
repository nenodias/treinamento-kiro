# 📋 Projeto Exemplo — Kiro Hooks Demo

API simples de gerenciamento de tarefas para demonstração de Agent Hooks no Kiro.

## Stack

- Node.js + Express
- UUID para geração de IDs únicos
- Armazenamento em memória (array)
- ESLint para linting

## Estrutura do Projeto

```
projeto-exemplo/
├── src/
│   ├── app.js                        # Entry point — configura Express e rotas
│   ├── controllers/
│   │   └── tarefa-controller.js      # Camada de controle (HTTP request/response)
│   ├── services/
│   │   └── tarefa-service.js         # Camada de serviço (lógica de negócio)
│   └── utils/
│       └── helpers.js                # Utilitários (formatarData, validarEmail, gerarSlug)
├── package.json
└── README.md
```

## Executar

```bash
npm install
npm start
```

O servidor inicia na porta `3000` (ou na variável de ambiente `PORT`).

## Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| start | `npm start` | Inicia o servidor |
| lint | `npm run lint` | Executa ESLint com auto-fix |
| test | `npm test` | Executa os testes |

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tarefas | Listar todas as tarefas |
| GET | /tarefas/:id | Buscar tarefa por ID |
| POST | /tarefas | Criar nova tarefa |
| PUT | /tarefas/:id | Atualizar tarefa |
| DELETE | /tarefas/:id | Deletar tarefa |

### Exemplo de uso

```bash
# Criar tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Kiro Hooks", "descricao": "Aprender a criar hooks"}'

# Listar tarefas
curl http://localhost:3000/tarefas
```

## Arquitetura

O projeto segue uma separação em camadas:

- **Controller** — recebe requisições HTTP, valida input básico e delega ao service
- **Service** — contém a lógica de negócio (CRUD, validações, formatação de datas)
- **Utils/Helpers** — funções utilitárias reutilizáveis

## Para a Demo

Este projeto serve como base para criar hooks ao vivo durante o treinamento. Exemplos de hooks que podem ser criados:

1. **Lint ao salvar** — roda ESLint quando `.js` é salvo
2. **Security review** — verifica segurança após geração de código
3. **Gerar docs** — cria JSDoc para funções sem documentação
4. **Atualizar README** — atualiza documentação quando arquivos são alterados
