# 4. Plan — Planejamento Estruturado

## O que é o Plan Agent?

O `/plan` é um modo de planejamento que analisa sua ideia, pesquisa o codebase existente e gera um plano de implementação detalhado **sem modificar código**.

```bash
> /plan Quero criar um novo endpoint para cadastro de produtos
```

---

## Como funciona

```
Você descreve a ideia
    → Plan Agent analisa o codebase
    → Pesquisa na web se necessário
    → Gera plano com tasks sequenciadas
    → Você revisa e decide se implementa
```

### Características

- **Não modifica código** — apenas planeja
- **Analisa codebase existente** para entender padrões e convenções
- **Pesquisa web** para informar decisões técnicas
- **Gera tasks detalhadas** com ordem de execução

---

## Exemplo Prático: Endpoint de Cadastro de Produtos

### Prompt

```bash
> /plan Quero criar um novo endpoint POST /products para cadastro de produtos.
  Deve validar os campos name, price e category. 
  Seguir os mesmos padrões do GET /products existente.
```

### Output esperado (exemplo)

O Plan Agent gera algo como:

```
📋 Plan: POST /products endpoint

Task 1: Criar tipo CreateProductInput em src/types/productTypes.ts
  - Campos: name (string, obrigatório), price (number, > 0), category (enum)

Task 2: Criar função de validação em src/services/productService.ts
  - Validar campos obrigatórios
  - Validar price > 0
  - Validar category em ['eletronicos', 'moveis', 'acessorios']
  - Retornar erros coletados (mesmo padrão do GET)

Task 3: Criar função createProduct no service
  - Gerar ID incremental
  - Adicionar createdAt
  - Inserir no array in-memory

Task 4: Adicionar rota POST em src/routes/products.ts
  - Parse body
  - Chamar validação
  - Se erros: retornar 400 com lista de erros
  - Se ok: chamar createProduct e retornar 201

Task 5: Criar testes
  - Unit test para validação
  - Unit test para createProduct
  - Integration test para POST /products (sucesso e erro)
```

---

## Após o planejamento

Depois de revisar o plano, você pode:

1. **Pedir para implementar**: "Implemente o plano acima"
2. **Ajustar**: "Mude a task 2 para aceitar também a categoria 'roupas'"
3. **Implementar manualmente** usando o plano como guia
4. **Descartar e replanejar**: "Refaça considerando validação com Zod"

---

## Dicas

- Seja específico no prompt — quanto mais contexto, melhor o plano
- Mencione padrões existentes que quer seguir ("mesmo padrão do GET")
- Use `/plan` antes de features complexas para alinhar abordagem
- O Plan Agent respeita os steering files do projeto

---

## Atalho: `Shift+Tab`

Em vez de digitar `/plan`, pressione `Shift+Tab` para entrar no Plan mode diretamente.

---

## Demo ao Vivo

1. Abrir o Kiro CLI no projeto de treinamento
2. Digitar: `/plan Criar endpoint POST /products para cadastro de produtos com validação`
3. Observar o Plan Agent analisando o codebase
4. Revisar o plano gerado
5. Pedir ajustes se necessário
6. Opcionalmente: "Implemente a task 1"

---

> Próximo: criando Custom Agents para workflows especializados.
