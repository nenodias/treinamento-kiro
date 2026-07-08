# Padrões do Projeto

## Linguagem e Runtime
- JavaScript puro (sem TypeScript)
- Node.js 18+ com ES Modules (`"type": "module"`)
- Express 4.x

## Nomenclatura
- camelCase para variáveis e funções
- Nomes de arquivos em kebab-case (ex: `tarefa-service.js`)
- Nomes de variáveis, funções e comentários em português
- Rotas da API em português (ex: `/api/tarefas`)

## Estrutura de Pastas
```
src/
├── routes/       ← definição de rotas Express (Router)
├── services/     ← lógica de negócio
├── models/       ← modelos de dados e acesso a dados
└── utils/        ← funções utilitárias
```

## Padrões de Código
- Imports com ES Modules (`import`/`export`)
- Documentação com JSDoc (/** */)
- Tratamento de erros com try/catch nos handlers
- Sem ponto-e-vírgula no final das linhas? Não — usar ponto-e-vírgula sempre

## Respostas da API
- Formato padrão: `{ success: true, data: ... }` ou `{ success: false, error: "mensagem" }`
- Usar funções `formatarResposta()` e `formatarErro()` de `utils/resposta.js`
- Status HTTP corretos: 200, 201, 400, 404, 500

## Status de Tarefas (domínio)
- Valores válidos: `pendente`, `em_andamento`, `concluida`

## Boas Práticas
- Não instalar dependências desnecessárias
- Manter código simples e didático (projeto de treinamento)
- Sem autenticação (API aberta para fins de demonstração)
