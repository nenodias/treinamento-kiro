# Veloe — Padrões .Net (Backend)

## Code Review — .Net

### Checklist do Revisor

- [ ] Classes seguem responsabilidade única (SRP)
- [ ] Injeção de dependência via construtor (registrada no DI container)
- [ ] DTOs/ViewModels separados de entidades de domínio
- [ ] Exceções tratadas com middleware global + exceções customizadas
- [ ] Logs estruturados com ILogger e contexto (correlation ID)
- [ ] Sem lógica de negócio em controllers — usar services
- [ ] Validações com FluentValidation ou DataAnnotations
- [ ] Queries parametrizadas (EF Core ou Dapper)
- [ ] Async/await usado corretamente (sem `.Result` ou `.Wait()`)
- [ ] Sem `Console.WriteLine` ou código comentado
- [ ] Métodos com no máximo 30 linhas
- [ ] Interfaces extraídas para dependências externas (testabilidade)
- [ ] Nullable reference types habilitado e respeitado

### Red Flags

- `.Result` ou `.Wait()` em código async (deadlock risk)
- `catch (Exception ex)` genérico sem re-throw
- Service Locator pattern (`IServiceProvider.GetService<T>()` dentro de classes)
- Entidade EF Core exposta diretamente na API
- `DbContext` injetado como Singleton (deve ser Scoped)
- LINQ complexo demais (>4 operações — extrair para método ou specification)
- Strings mágicas para configuração (usar `IOptions<T>`)
- `Task.Run` em código que já é async
- Falta de `CancellationToken` em operações longas

---

## Testes Unitários — .Net

### Stack de Testes

- **Runner:** xUnit
- **Mocks:** NSubstitute (preferencial) ou Moq
- **Assertions:** FluentAssertions
- **Testes de integração:** WebApplicationFactory + Testcontainers
- **Cobertura:** Coverlet (mínimo 80%)

### Convenções

**Estrutura de arquivos:**
```
src/
├── Veloe.Servico.Api/
│   ├── Controllers/
│   │   └── VeiculoController.cs
│   ├── Services/
│   │   └── VeiculoService.cs
│   └── Repositories/
│       └── VeiculoRepository.cs
tests/
├── Veloe.Servico.UnitTests/
│   ├── Services/
│   │   └── VeiculoServiceTests.cs
│   └── Fixtures/
│       └── VeiculoFixture.cs
├── Veloe.Servico.IntegrationTests/
│   ├── Controllers/
│   │   └── VeiculoControllerTests.cs
│   └── Infrastructure/
│       └── CustomWebApplicationFactory.cs
```

**Nomenclatura de testes:**
```csharp
public class VeiculoServiceTests
{
    [Fact(DisplayName = "Deve retornar veículo quando placa existe")]
    public async Task DeveRetornarVeiculo_QuandoPlacaExiste() { ... }

    [Fact(DisplayName = "Deve lançar exceção quando placa não encontrada")]
    public async Task DeveLancarExcecao_QuandoPlacaNaoEncontrada() { ... }

    [Theory(DisplayName = "Deve validar formatos de placa")]
    [InlineData("ABC1234", true)]
    [InlineData("ABC1D23", true)]
    [InlineData("INVALID", false)]
    public void DeveValidarFormatoDePlaca(string placa, bool esperado) { ... }
}
```

**Padrão Arrange-Act-Assert:**
```csharp
[Fact(DisplayName = "Deve calcular saldo com desconto para cliente premium")]
public async Task DeveCalcularSaldoComDesconto_ParaClientePremium()
{
    // Arrange
    var cliente = VeiculoFixture.ClientePremiumComSaldo(100m);
    _clienteRepository.GetByIdAsync(Arg.Any<long>())
        .Returns(cliente);

    // Act
    var resultado = await _saldoService.CalcularSaldoComDescontoAsync(cliente.Id);

    // Assert
    resultado.Valor.Should().Be(90m);
    resultado.Desconto.Should().Be(10m);
}
```

### Fixtures e Builders

```csharp
public static class VeiculoFixture
{
    public static Veiculo Padrao() => new()
    {
        Placa = "ABC1234",
        Modelo = "Civic",
        Ativo = true
    };

    public static Veiculo Inativo() => Padrao() with { Ativo = false };

    public static Cliente ClientePremiumComSaldo(decimal saldo) => new()
    {
        Tipo = TipoCliente.Premium,
        Saldo = saldo
    };
}
```

### O que testar

| Camada | O que testar | Como testar |
|--------|-------------|-------------|
| Service | Regras de negócio, validações | xUnit + NSubstitute |
| Controller | Status codes, model binding | WebApplicationFactory |
| Repository | Queries customizadas | Integration + Testcontainers |
| Validators | Regras de validação | Unit test direto |
| Middleware | Error handling, auth | Integration test |

### O que NÃO testar

- Propriedades auto-implementadas
- Configuração DI simples (`Program.cs`)
- Código gerado (AutoMapper profiles simples, EF migrations)
- Extension methods triviais de uma linha

---

## Padrões de Commit — .Net

### Escopos comuns

| Escopo | Quando usar |
|--------|-------------|
| `controller` | Endpoints da API |
| `service` | Lógica de negócio |
| `repository` | Acesso a dados (EF Core, Dapper) |
| `dto` | DTOs e ViewModels |
| `config` | appsettings, Program.cs |
| `security` | Autenticação/Autorização |
| `migration` | EF Core migrations |
| `middleware` | Middlewares customizados |
| `infra` | Docker, CI, deploy |
| `deps` | NuGet packages |

### Exemplos

```
feat(controller): criar endpoint de consulta de veículos por placa
fix(service): corrigir cálculo de desconto para clientes inativos
refactor(repository): migrar queries raw SQL para EF Core LINQ
test(service): adicionar testes para regras de cancelamento
chore(deps): atualizar pacotes NuGet para .net 8
perf(repository): adicionar índice composto via migration
docs(controller): adicionar XML comments para Swagger
ci(infra): configurar health checks no pipeline
feat(middleware): criar middleware de correlation ID
```

### Regras específicas .Net

- EF Core migrations em commit separado: `feat(migration): criar tabela de transações`
- Atualizações de `.csproj` em commit `chore(deps)`
- Classes novas de service devem vir com testes no mesmo PR
- Alterações em middleware de autenticação exigem review de 2 pessoas
- Novos endpoints devem incluir XML comments para documentação Swagger
