---
inclusion: fileMatch
fileMatchPattern: "**/*.test.mjs"
---

# Testes Unitários

## Framework & Execução
- Vitest como framework de testes
- Executar com `npm test` (vitest run, sem watch)
- Arquivos de teste colocados junto ao source: `<nome>.test.mjs`

## Estrutura do Arquivo de Teste

```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest';
```

- Usar `describe` para agrupar por unidade (handler, service, util)
- Usar `it` com descrições em português começando com verbo: `'deve criar tarefa com dados válidos'`
- Um `describe` por arquivo de teste, nomeado como o módulo sob teste

## Mocking de Dependências

### Handlers (mock do service)
```javascript
vi.mock('../services/tarefa-service.mjs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    nomeDaFuncao: vi.fn()
  };
});
```
- Importar o mock **após** `vi.mock()` para que o Vitest substitua corretamente
- Usar `importOriginal()` para preservar exports não-mockados (ex: classes de erro)
- Limpar mocks com `vi.clearAllMocks()` no `beforeEach`

### Services (sem mock, teste direto)
- Testar services diretamente, sem mockar suas dependências internas
- Resetar estado em memória no `beforeEach` usando `resetarTarefas()` ou `resetarSubtarefas()`

## Padrão de Cenários

Cada teste deve cobrir:
1. **Caminho feliz** — dados válidos retornam resultado esperado
2. **Validação** — dados inválidos lançam `ValidacaoError` com mensagem descritiva
3. **Erros de domínio** — regras de negócio violadas (ex: tarefa já concluída)
4. **Erros inesperados** — service lança exceção genérica, handler retorna 500
5. **Casos de borda** — body nulo, campos extras ignorados, strings vazias

## Assertions

- Verificar `statusCode` na resposta do handler
- Fazer `JSON.parse(resultado.body)` e verificar `sucesso`, `mensagem`, `dados`
- Usar `toEqual` para objetos completos, `toContain` para partes de mensagens
- Verificar que o mock foi chamado com os argumentos corretos via `toHaveBeenCalledWith`
- Verificar headers CORS em respostas de sucesso e erro

## Helpers de Teste

Criar funções auxiliares para reduzir repetição:
```javascript
function criarEvento(body) {
  return { body: JSON.stringify(body) };
}
```

## O Que NÃO Fazer
- Não testar implementação interna (acessar variáveis privadas do módulo)
- Não depender de ordem de execução entre testes
- Não usar `setTimeout` ou timers reais — mockar se necessário
- Não importar mocks antes do `vi.mock()`
- Não esquecer de tratar cenário de `body: null` e `body: undefined` nos handlers
