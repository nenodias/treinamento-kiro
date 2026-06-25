# Veloe — Padrões React Native (Mobile)

## Code Review — React Native

### Checklist do Revisor

- [ ] Componentes seguem responsabilidade única
- [ ] Props tipadas com TypeScript (sem `any`)
- [ ] Navegação usa tipagem forte (typed routes)
- [ ] Sem lógica de negócio em telas — usar hooks/services
- [ ] Performance: listas usam `FlatList` com `keyExtractor`
- [ ] Animações usam `Reanimated` ou `LayoutAnimation` (não Animated API legada)
- [ ] Sem estilos inline em loops (mover para `StyleSheet.create`)
- [ ] Imagens otimizadas (formato, tamanho, cache)
- [ ] Tratamento de estados offline/sem conexão
- [ ] Sem `console.log` ou código comentado
- [ ] Testado em iOS e Android (ou justificativa de platform-specific)

### Red Flags

- `ScrollView` com listas longas (usar `FlatList` ou `FlashList`)
- `useEffect` fazendo fetch sem cancelamento no unmount
- Imports absolutos misturados com relativos sem padrão
- Bibliotecas nativas sem link automático verificado
- Assets pesados sem lazy loading
- Navegação com params não tipados
- `setState` em componente desmontado (memory leak)

---

## Testes Unitários — React Native

### Stack de Testes

- **Runner:** Jest
- **Renderização:** React Native Testing Library (RNTL)
- **Mocks HTTP:** MSW (Mock Service Worker)
- **Mocks nativos:** jest.mock para módulos nativos
- **E2E (separado):** Detox

### Convenções

**Estrutura de arquivos:**
```
src/
├── screens/
│   ├── Home/
│   │   ├── Home.tsx
│   │   ├── Home.test.tsx
│   │   └── hooks/
│   │       ├── useHomeData.ts
│   │       └── useHomeData.test.ts
├── components/
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.test.tsx
```

**Nomenclatura de testes:**
```typescript
describe('HomeScreen', () => {
  it('deve exibir loading enquanto carrega dados', () => { ... });
  it('deve exibir lista de veículos após carregamento', () => { ... });
  it('deve navegar para detalhes ao tocar em um veículo', () => { ... });
  it('deve exibir mensagem quando lista está vazia', () => { ... });
});
```

**Padrão — testar comportamento visível:**
```typescript
// ✅ Bom
it('deve exibir saldo atualizado após pull to refresh', async () => {
  render(<HomeScreen />);

  const flatList = screen.getByTestId('vehicle-list');
  fireEvent(flatList, 'refresh');

  await waitFor(() => {
    expect(screen.getByText('R$ 150,00')).toBeOnTheScreen();
  });
});

// ❌ Ruim — testa implementação
it('deve chamar fetchBalance com force=true', () => { ... });
```

### Mocks de módulos nativos

```typescript
// jest.setup.ts
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);
```

### O que testar

| Tipo | Exemplo | Prioridade |
|------|---------|-----------|
| Fluxo de navegação | Navegar para tela correta | Alta |
| Renderização condicional | Loading, erro, vazio, dados | Alta |
| Interações | Press, swipe, pull-to-refresh | Alta |
| Hooks de dados | Fetch, cache, retry | Alta |
| Platform-specific | Comportamento iOS vs Android | Média |
| Deep linking | Navegação via URL | Média |

### O que NÃO testar unitariamente

- Animações (testar visualmente ou com E2E)
- Módulos nativos reais (mock no unit, testar no E2E)
- Layout/posicionamento (usar visual regression)
- Gesture handlers complexos (Detox)

---

## Padrões de Commit — React Native

### Escopos comuns

| Escopo | Quando usar |
|--------|-------------|
| `screen` | Telas da aplicação |
| `component` | Componentes reutilizáveis |
| `navigation` | Configuração de rotas |
| `hook` | Hooks customizados |
| `native` | Módulos nativos, linking |
| `store` | Estado global |
| `api` | Camada de comunicação |
| `ios` | Específico iOS |
| `android` | Específico Android |
| `config` | Metro, Babel, Podfile |

### Exemplos

```
feat(screen): criar tela de consulta de saldo
fix(navigation): corrigir deep link para detalhes do veículo
refactor(hook): extrair lógica de retry para hook genérico
test(screen): adicionar testes para fluxo de recarga
chore(ios): atualizar pods para Xcode 15
chore(android): ajustar minSdkVersion para 24
perf(component): otimizar re-render da lista de transações
fix(native): resolver crash no módulo de biometria android
```

### Regras específicas React Native

- Mudanças platform-specific devem ter escopo `ios` ou `android`
- Atualizações de pods/gradle em commit separado tipo `chore`
- PRs que alteram navegação devem incluir testes de deep link
- Bump de versão do app (versionCode/buildNumber) em commit `chore(release)`
