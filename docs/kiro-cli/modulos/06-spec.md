# 6. Spec — Spec-Driven Development no Terminal

## O que é o Spec Agent?

O `/spec` traz o mesmo workflow de Spec-Driven Development do Kiro IDE para o terminal. Ele **pensa em requisitos e design ANTES de escrever código**, depois executa um plano de implementação com **verificação entre cada task**.

---

## Diferença entre `/plan` e `/spec`

| `/plan` | `/spec` |
|---------|---------|
| Gera plano mas **não executa** | Gera plano **E executa** com verificação |
| Sem checkpoints | Checkpoints entre tasks |
| Resultado: documento de plano | Resultado: código implementado e verificado |
| Bom para explorar ideias | Bom para implementar features completas |

---

## Workflow do Spec

```
/spec new <nome>
    → 1. Define requisitos (o que construir)
    → 2. Gera design técnico (como construir)
    → 3. Executa tasks com checkpoints (implementa)
    → 4. Verifica resultado de cada step antes de avançar
```

---

## Comandos

```bash
> /spec new user-auth       # Cria uma nova spec
> /spec list                # Lista specs existentes
> /spec resume              # Retoma spec em progresso
```

---

## Exemplo Prático: Endpoint POST /products

### Iniciando a spec

```bash
> /spec new product-creation
```

### Etapa 1: Requisitos

O Spec Agent pergunta o que você quer construir. Você descreve:

```
Quero criar um endpoint POST /products para cadastro de produtos.
- Campos: name (obrigatório, string), price (obrigatório, number > 0), 
  category (obrigatório, enum: eletronicos, moveis, acessorios)
- Deve retornar 201 com o produto criado (incluindo id e createdAt)
- Deve retornar 400 com lista de erros se validação falhar
- Seguir mesmos padrões do GET /products existente
```

### Etapa 2: Design Técnico

O agente analisa o codebase, identifica os padrões e gera o design:

- Tipos necessários em `productTypes.ts`
- Funções de validação e criação em `productService.ts`
- Rota em `products.ts`
- Testes em `tests/`

### Etapa 3: Execução com Checkpoints

O agente executa task a task:

```
✓ Task 1: Criar tipo CreateProductInput
✓ Task 2: Criar função validateCreateProduct
✓ Task 3: Criar função createProduct
→ Task 4: Adicionar rota POST /products (em progresso...)
```

Entre cada task, ele verifica se o código compila e os testes passam.

---

## Retomando uma Spec

Se você parou no meio (fechou o terminal, perdeu conexão):

```bash
> /spec resume
```

O Kiro retoma de onde parou, verificando o estado atual do código.

---

## Quando usar Spec vs Plan vs Chat direto?

| Situação | Use |
|----------|-----|
| Feature completa com múltiplos arquivos | `/spec` |
| Explorar ideias, comparar abordagens | `/plan` |
| Mudança pequena e pontual | Chat direto |
| Bug fix simples | Chat direto |
| Refactoring grande | `/spec` |

---

## Dicas

- Seja detalhado nos requisitos — o Spec Agent usa isso como fonte de verdade
- Mencione padrões existentes que quer seguir
- Você pode interromper e ajustar o design antes da execução começar
- Os steering files do projeto são respeitados durante toda a execução

---

## Demo ao Vivo

1. Iniciar: `/spec new product-creation`
2. Descrever requisitos do endpoint POST /products
3. Revisar o design gerado
4. Observar a execução task a task
5. Verificar que testes passam ao final
6. Mostrar `/spec list` para ver specs do projeto

---

> Este é o último módulo do treinamento de Kiro CLI. 
> Recapitulando: Login → Modelo → Sessões → Plan → Custom Agents → Spec
