# 💻 Projeto de Exemplo — Kiro CLI na Prática

## Sobre

Este é um projeto Node.js simples (API de tarefas) criado para você praticar as funcionalidades do Kiro CLI. O código é propositalmente básico para que o foco seja na interação com a ferramenta.

---

## Stack

- **Node.js 18+** com ES Modules
- **Express** para API REST
- **Armazenamento em memória** (sem banco de dados)
- Estrutura em camadas: routes → services → models

---

## Setup

```bash
# Entrar no diretório
cd projeto-exemplo

# Instalar dependências
npm install

# Iniciar o servidor
npm start

# Servidor rodando em http://localhost:3000
```

---

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/tarefas` | Listar todas as tarefas |
| GET | `/api/tarefas/:id` | Buscar tarefa por ID |
| POST | `/api/tarefas` | Criar nova tarefa |
| PUT | `/api/tarefas/:id` | Atualizar tarefa |
| DELETE | `/api/tarefas/:id` | Deletar tarefa |
| GET | `/api/health` | Health check |

### Exemplo de criação

```bash
curl -X POST http://localhost:3000/api/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Kiro CLI", "descricao": "Completar todos os módulos"}'
```

---

## Exercícios com Kiro CLI

### Exercício 1 — Autocomplete

Abra o terminal no diretório do projeto e observe o autocomplete:

```bash
# Digite "npm " e veja os scripts disponíveis
# Digite "git " e veja os comandos sugeridos
# Digite "curl " e veja as flags sugeridas
```

### Exercício 2 — Translate

```bash
# Traduza estes pedidos para comandos:
kiro-cli translate "testar se a API está rodando na porta 3000"
kiro-cli translate "ver os processos usando a porta 3000"
kiro-cli translate "fazer uma requisição POST para criar uma tarefa"
```

### Exercício 3 — Chat exploratório

```bash
# Inicie o chat no diretório do projeto:
kiro-cli

# Pergunte:
> Analise a estrutura deste projeto e me explique a arquitetura
> Quais melhorias de segurança você sugere para esta API?
> Crie um middleware de logging que registre método, rota e tempo de resposta
```

### Exercício 4 — Contexto

```bash
# No chat, adicione contexto e peça melhorias:
> /context add "src/**/*.js"
> /context show
> Refatore o tarefa-service.js para adicionar validação de dados
```

### Exercício 5 — Steering

Crie o arquivo `.kiro/steering/padroes.md` no projeto:

```markdown
# Padrões deste projeto

- Use JavaScript com ES Modules (import/export)
- Funções assíncronas com async/await
- Tratamento de erro com try/catch em todo handler
- Respostas da API sempre no formato { success: boolean, data: any, error?: string }
- Comentários em português
```

Depois, no chat:
```bash
> Crie um endpoint para marcar tarefa como concluída, seguindo os padrões do projeto
```

### Exercício 6 — Custom Agent

Crie `.kiro/agents/api-dev.json`:

```json
{
  "name": "api-dev",
  "description": "Desenvolvedor especialista nesta API de tarefas",
  "instructions": [
    "Este é um projeto Express com armazenamento em memória",
    "Siga o padrão de camadas: routes → services → models",
    "Toda resposta deve usar o helper formatarResposta()",
    "Valide inputs antes de processar"
  ],
  "tools": {
    "allow": ["read", "write", "bash"]
  }
}
```

Use o agent:
```bash
kiro-cli chat --agent api-dev
> Adicione paginação no endpoint de listagem de tarefas
```

---

## Estrutura do projeto

```
projeto-exemplo/
├── README.md
├── package.json
├── .gitignore
└── src/
    ├── app.js              ← Entry point (Express)
    ├── routes/
    │   └── tarefas.js      ← Rotas da API
    ├── services/
    │   └── tarefa-service.js  ← Lógica de negócio
    ├── models/
    │   └── tarefa.js       ← Modelo de dados
    └── utils/
        └── resposta.js     ← Helper de formatação
```

---

> 💡 **Dica**: Use `kiro-cli chat --resume` para retomar conversas anteriores sobre este projeto.
