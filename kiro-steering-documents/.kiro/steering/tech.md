---
inclusion: fileMatch
fileMatchPattern: "*src/**"
---

# Stack Tecnológica

## Runtime e Linguagem
- Node.js (módulos CommonJS com `require`)
- JavaScript (sem TypeScript)

## Frameworks e Bibliotecas
- **Express 4.18** — servidor HTTP e roteamento
- **uuid 9.0** — geração de UUID v4 para IDs de entidades

## Dependências de Desenvolvimento
- **Jest 29** — executor de testes
- **Supertest 6** — biblioteca de asserções HTTP para testes de integração
- **ESLint 8** — linting

## Comandos Comuns

| Comando | Finalidade |
|---------|------------|
| `npm install` | Instalar dependências |
| `npm run dev` | Iniciar servidor de dev com `--watch` |
| `npm start` | Iniciar servidor em produção |
| `npm test` | Executar testes (Jest) |
| `npm run lint` | Verificar código-fonte (ESLint) |

## Convenções Principais
- Ponto de entrada: `src/index.js`
- Porta padrão: 3000 (configurável via variável de ambiente `PORT`)
- Armazenamento de dados em memória (sem banco de dados)
- Objetos de erro utilizam as propriedades `statusCode`, `code` e `message`
