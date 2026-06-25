# 🧭 Projeto de Exemplo — Steering Documents

## Sobre

API REST simples de gerenciamento de tarefas, configurada com Steering Documents para demonstrar como guiar o comportamento do Kiro IDE.

## Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar o projeto

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

### 3. Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /tarefas | Listar todas as tarefas |
| GET | /tarefas/:id | Buscar tarefa por ID |
| POST | /tarefas | Criar nova tarefa |
| PUT | /tarefas/:id | Atualizar tarefa |
| DELETE | /tarefas/:id | Deletar tarefa |

### 4. Exemplos de request

**Criar tarefa:**
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Steering Documents", "descricao": "Completar todos os módulos"}'
```

**Listar tarefas:**
```bash
curl http://localhost:3000/tarefas
```

## Estrutura do Projeto

```
projeto-exemplo/
├── .kiro/
│   └── steering/
│       ├── projeto.md              ← Contexto geral (always)
│       ├── padroes-codigo.md       ← Regras de código (always)
│       ├── convencoes-api.md       ← Padrões de API (fileMatch: routes)
│       ├── padroes-testes.md       ← Como testar (fileMatch: *.test.js)
│       └── deploy.md              ← Guia de deploy (manual)
├── src/
│   ├── index.js                   ← Entry point
│   ├── routes/
│   │   └── tarefas.js             ← Rotas da API
│   ├── services/
│   │   └── tarefa-service.js      ← Lógica de negócio
│   ├── models/
│   │   └── tarefa-model.js        ← Modelo de dados
│   └── utils/
│       └── resposta.js            ← Helpers de response
├── package.json
└── README.md
```

## Exercícios

### Exercício 1: Observe o comportamento padrão
Abra o projeto no Kiro e peça para criar um novo endpoint. Observe como ele segue os padrões definidos nos Steering Documents.

### Exercício 2: Modifique um steering
Altere o formato de response em `convencoes-api.md` e peça ao Kiro para criar outro endpoint. Veja como o formato muda.

### Exercício 3: Crie um novo steering
Crie um steering para validação de dados e teste pedindo ao Kiro para adicionar validação em um endpoint existente.

### Exercício 4: Use referência de arquivo
Crie um steering que referencia o modelo de dados e peça ao Kiro para criar um novo campo.
