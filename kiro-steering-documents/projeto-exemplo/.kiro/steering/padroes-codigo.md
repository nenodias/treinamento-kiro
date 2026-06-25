---
inclusion: always
---

# Padrões de Código

## Estilo
- Variáveis e funções: camelCase em português (criarTarefa, buscarPorId)
- Constantes: UPPER_SNAKE_CASE (STATUS_VALIDOS)
- Arquivos: kebab-case (tarefa-service.js)

## Tratamento de Erros
- Criar Error com propriedades: message, code, statusCode
- Nunca expor stack trace na response
- Logar erro completo no console (apenas em dev)
- Propagar erros via next() no Express

## Funções
- Máximo 25 linhas por função
- Uma responsabilidade por função
- Documentar com JSDoc (descrição + @param + @returns)

## Imports
- Ordem: módulos nativos → dependências → módulos internos
- Usar destructuring quando importar funções específicas
