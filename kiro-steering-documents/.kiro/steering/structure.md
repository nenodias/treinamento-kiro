# Estrutura do Projeto

```
├── modulos/                    # Módulos de treinamento (Markdown, PT-BR)
│   ├── 01-o-que-sao-steering-documents.md
│   ├── 02-como-criar-e-configurar.md
│   ├── 03-modos-de-inclusao.md
│   ├── 04-referencias-e-composicao.md
│   ├── 05-casos-de-uso-reais.md
│   ├── 06-boas-praticas-e-organizacao.md
│   └── 07-demo-pratica.md
├── projeto-exemplo/            # Projeto Node.js de exemplo
│   ├── .kiro/steering/         # Steering docs do projeto de exemplo
│   ├── src/
│   │   ├── index.js            # Setup do Express e middlewares globais
│   │   ├── routes/             # Handlers de rota (um arquivo por recurso)
│   │   ├── services/           # Lógica de negócio e validação
│   │   ├── models/             # Camada de acesso a dados (armazenamento em memória)
│   │   └── utils/              # Helpers compartilhados (formatação de resposta, etc.)
│   └── package.json
└── README.md                   # Visão geral do treinamento e índice de módulos
```

## Padrão Arquitetural (projeto-exemplo)

A API de exemplo segue uma **arquitetura em camadas**:

1. **Routes** — definem endpoints, extraem parâmetros e delegam para services
2. **Services** — validam entrada, aplicam regras de negócio e chamam models
3. **Models** — gerenciam persistência de dados e estrutura das entidades
4. **Utils** — helpers transversais (formato padronizado de resposta)

Erros sobem via `next(err)` do Express e são capturados pelo middleware global de erro em `index.js`.

## Convenções de Nomenclatura
- Arquivos: `kebab-case` em português (ex: `tarefa-service.js`)
- Funções/variáveis: `camelCase` em português (ex: `criarTarefa`, `buscarPorId`)
- Um router por recurso, um service por recurso, um model por recurso
