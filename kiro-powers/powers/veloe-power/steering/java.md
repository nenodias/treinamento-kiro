# Veloe — Padrões Java (Backend)

## Code Review — Java

### Checklist do Revisor

- [ ] Classes seguem responsabilidade única (SRP)
- [ ] Injeção de dependência via construtor (não field injection)
- [ ] DTOs separados de entidades de domínio
- [ ] Exceções tratadas com hierarquia clara (custom exceptions)
- [ ] Logs estruturados com contexto (correlation ID, user ID)
- [ ] Sem lógica de negócio em controllers — usar services
- [ ] Validações com Bean Validation (`@Valid`, `@NotNull`, etc.)
- [ ] Queries SQL parametrizadas (prevenção de SQL injection)
- [ ] Transações com escopo mínimo (`@Transactional` apenas onde necessário)
- [ ] Sem `System.out.println` ou código comentado
- [ ] Métodos com no máximo 30 linhas (extrair se maior)
- [ ] Nomes descritivos (sem abreviações crípticas)

### Red Flags

- `@Autowired` em campo (usar construtor)
- Catch genérico `catch (Exception e)` sem re-throw ou tratamento específico
- Entidade JPA exposta diretamente na API (usar DTO)
- `Optional.get()` sem verificação (usar `orElseThrow`)
- Lógica de negócio no controller ou repository
- Queries N+1 (verificar fetch strategy)
- Streams complexas demais (>3 operações encadeadas — extrair método)
- `@Transactional` em método que não precisa de transação

---

## Testes Unitários — Java

### Stack de Testes

- **Runner:** JUnit 5
- **Mocks:** Mockito
- **Assertions:** AssertJ
- **Testes de integração:** Spring Boot Test + Testcontainers
- **Cobertura:** JaCoCo (mínimo 80%)

### Convenções

**Estrutura de arquivos:**
```
src/
├── main/java/com/veloe/servico/
│   ├── controller/
│   │   └── VeiculoController.java
│   ├── service/
│   │   └── VeiculoService.java
│   ├── repository/
│   │   └── VeiculoRepository.java
│   └── dto/
│       └── VeiculoDTO.java
├── test/java/com/veloe/servico/
│   ├── controller/
│   │   └── VeiculoControllerTest.java
│   ├── service/
│   │   └── VeiculoServiceTest.java
│   └── repository/
│       └── VeiculoRepositoryIntegrationTest.java
```

**Nomenclatura de testes:**
```java
@DisplayName("VeiculoService")
class VeiculoServiceTest {

    @Test
    @DisplayName("deve retornar veículo quando placa existe")
    void deveRetornarVeiculoQuandoPlacaExiste() { ... }

    @Test
    @DisplayName("deve lançar exceção quando placa não encontrada")
    void deveLancarExcecaoQuandoPlacaNaoEncontrada() { ... }

    @Test
    @DisplayName("deve salvar veículo com dados válidos")
    void deveSalvarVeiculoComDadosValidos() { ... }
}
```

**Padrão Arrange-Act-Assert:**
```java
@Test
@DisplayName("deve calcular saldo com desconto para cliente premium")
void deveCalcularSaldoComDescontoParaClientePremium() {
    // Arrange
    var cliente = ClienteFixture.premiumComSaldo(BigDecimal.valueOf(100));
    when(clienteRepository.findById(anyLong())).thenReturn(Optional.of(cliente));

    // Act
    var resultado = saldoService.calcularSaldoComDesconto(cliente.getId());

    // Assert
    assertThat(resultado.getValor()).isEqualByComparingTo("90.00");
    assertThat(resultado.getDesconto()).isEqualByComparingTo("10.00");
}
```

### Fixtures e Builders

```java
// Usar Builder pattern para criar objetos de teste
public class VeiculoFixture {
    public static Veiculo padrao() {
        return Veiculo.builder()
            .placa("ABC1234")
            .modelo("Civic")
            .ativo(true)
            .build();
    }

    public static Veiculo inativo() {
        return padrao().toBuilder()
            .ativo(false)
            .build();
    }
}
```

### O que testar

| Camada | O que testar | Como testar |
|--------|-------------|-------------|
| Service | Regras de negócio, validações | Unit test + Mockito |
| Controller | Validação de input, status HTTP | @WebMvcTest |
| Repository | Queries customizadas | @DataJpaTest + Testcontainers |
| Mapper | Conversão DTO ↔ Entity | Unit test simples |

### O que NÃO testar

- Getters/Setters gerados (Lombok)
- Configuração Spring Boot (`@Configuration` simples)
- Código gerado (MapStruct, QueryDSL)
- Dependências externas reais em unit test (usar Testcontainers para integration)

---

## Padrões de Commit — Java

### Escopos comuns

| Escopo | Quando usar |
|--------|-------------|
| `controller` | Endpoints REST |
| `service` | Lógica de negócio |
| `repository` | Acesso a dados |
| `dto` | Data Transfer Objects |
| `config` | Configurações Spring |
| `security` | Autenticação/Autorização |
| `migration` | Flyway/Liquibase |
| `infra` | Docker, CI, deploy configs |
| `deps` | Atualizações de dependência |

### Exemplos

```
feat(controller): criar endpoint de consulta de veículos por placa
fix(service): corrigir cálculo de desconto para clientes inativos
refactor(repository): otimizar query de histórico de transações
test(service): adicionar testes para regras de cancelamento
chore(deps): atualizar spring boot para 3.2.x
perf(repository): adicionar índice composto na tabela de transações
docs(controller): documentar endpoints com OpenAPI annotations
ci(infra): adicionar stage de quality gate no pipeline
```

### Regras específicas Java

- Migrations de banco devem estar em commit separado tipo `feat(migration)` ou `fix(migration)`
- Atualizações de `pom.xml` / `build.gradle` em commit `chore(deps)`
- Classes novas de service devem vir acompanhadas de testes no mesmo PR
- Alterações em configuração de segurança exigem review de 2 pessoas
