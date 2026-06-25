# Veloe — Padrões React (Web)

## Code Review — React

### Checklist do Revisor

- [ ] Componentes seguem o princípio de responsabilidade única
- [ ] Props estão tipadas com TypeScript (interfaces, não `any`)
- [ ] Hooks customizados extraídos quando lógica é reutilizada
- [ ] Sem lógica de negócio dentro de componentes de UI
- [ ] Efeitos colaterais (`useEffect`) possuem cleanup adequado
- [ ] Não há re-renders desnecessários (verificar deps de hooks)
- [ ] Acessibilidade: `aria-*` attributes, labels, roles
- [ ] Imports organizados (libs externas → internas → estilos)
- [ ] Sem `console.log` ou código comentado
- [ ] Componentes grandes (>150 linhas) devem ser quebrados

### Red Flags

- `useEffect` sem array de dependências ou com deps instáveis
- Estado derivado duplicando dados (usar `useMemo` ou derivar inline)
- Props drilling além de 3 níveis (usar Context ou composição)
- `dangerouslySetInnerHTML` sem sanitização
- Chamadas HTTP diretamente no componente (usar hooks/services)

---

## Testes Unitários — React

### Stack de Testes

- **Runner:** Vitest
- **Renderização:** React Testing Library
- **Mocks HTTP:** MSW (Mock Service Worker)
- **Cobertura:** Istanbul via Vitest

### Convenções

**Estrutura de arquivos:**
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx    ← teste junto ao componente
│   │   └── Button.styles.ts
```

**Nomenclatura de testes:**
```typescript
describe('Button', () => {
  it('deve renderizar o texto passado via children', () => { ... });
  it('deve chamar onClick quando clicado', () => { ... });
  it('deve estar desabilitado quando prop disabled é true', () => { ... });
});
```

**Padrão — testar comportamento, não implementação:**
```typescript
// ✅ Bom — testa o que o usuário vê
it('deve exibir mensagem de erro quando email é inválido', () => {
  render(<LoginForm />);

  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'invalido' }
  });
  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

  expect(screen.getByRole('alert')).toHaveTextContent('Email inválido');
});

// ❌ Ruim — testa implementação interna
it('deve chamar setState com erro', () => { ... });
```

### O que testar

| Tipo | Exemplo | Prioridade |
|------|---------|-----------|
| Renderização condicional | Mostrar/ocultar elementos | Alta |
| Interações do usuário | Click, input, submit | Alta |
| Integração com hooks | Dados carregados, loading, erro | Alta |
| Edge cases | Lista vazia, texto longo, null | Média |
| Acessibilidade | Roles, aria-labels | Média |

### O que NÃO testar

- Estilos CSS (use visual regression separado)
- Implementação interna de libs externas
- Snapshots de componentes inteiros (frágeis demais)

---

## Padrões de Commit — React

### Escopos comuns

| Escopo | Quando usar |
|--------|-------------|
| `ui` | Componentes de apresentação |
| `hook` | Hooks customizados |
| `page` | Páginas/rotas |
| `store` | Estado global (Zustand, Redux) |
| `api` | Camada de comunicação HTTP |
| `config` | Webpack, Vite, ESLint, etc. |
| `a11y` | Melhorias de acessibilidade |

### Exemplos

```
feat(ui): criar componente de card de produto
fix(hook): corrigir memory leak no useWebSocket
refactor(page): extrair lógica de filtros para hook dedicado
test(ui): adicionar testes para componente de formulário
chore(config): atualizar vite para v5
perf(store): memoizar seletores pesados do zustand
```

### Regras específicas React

- PRs de componentes novos devem incluir testes no mesmo commit
- Atualizações de dependências em commit separado tipo `chore`
- Refatorações visuais (design system) usar escopo `ui`
