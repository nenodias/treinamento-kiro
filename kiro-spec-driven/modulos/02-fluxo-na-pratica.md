# Módulo 02 — O Fluxo na Prática

## Como iniciar uma Spec

1. No Kiro, abra o chat e inicie uma **sessão Spec** (em vez de Vibe)
2. Descreva a feature que quer construir em linguagem natural
3. O Kiro gera os requisitos automaticamente

## Etapa 1: Requirements

O Kiro gera um `requirements.md` com user stories e critérios de aceitação.

**Exemplo** — Feature: "Adicionar autenticação com JWT"

```markdown
## Requisito 1: Login de usuário
**Como** usuário registrado
**Quero** fazer login com email e senha
**Para** acessar recursos protegidos da aplicação

### Critérios de aceitação:
- [ ] Endpoint POST /auth/login aceita email e senha
- [ ] Retorna JWT válido por 1 hora em caso de sucesso
- [ ] Retorna 401 com mensagem genérica em caso de falha
- [ ] Senha é validada com bcrypt
```

### O que você faz aqui:
- Lê os requisitos gerados
- Pede ajustes ("adicione rate limiting", "remova o requisito X")
- Aprova quando estiver satisfeito ✅

## Etapa 2: Design

Com os requisitos aprovados, o Kiro gera o `design.md`:

```markdown
## Arquitetura

### Endpoints
- POST /auth/login → AuthController.login()
- POST /auth/refresh → AuthController.refresh()

### Modelo de dados
- Tabela: users (id, email, password_hash, created_at)
- Token: JWT com payload { sub, email, iat, exp }

### Dependências
- bcrypt para hash de senha
- jsonwebtoken para geração/validação de JWT

### Fluxo
1. Usuário envia email + senha
2. Busca usuário no banco
3. Compara hash com bcrypt
4. Gera JWT e retorna
```

### O que você faz aqui:
- Valida as decisões técnicas
- Sugere mudanças ("use Argon2 em vez de bcrypt", "adicione refresh token")
- Aprova quando o design fizer sentido ✅

## Etapa 3: Tasks

O Kiro quebra o design em tarefas atômicas no `tasks.md`:

```markdown
## Tarefas

- [ ] 1. Criar modelo User com campos id, email, password_hash, created_at
- [ ] 2. Criar AuthService com método login(email, password)
- [ ] 3. Criar AuthController com endpoint POST /auth/login
- [ ] 4. Adicionar middleware de validação de JWT
- [ ] 5. Criar endpoint POST /auth/refresh
- [ ] 6. Adicionar rate limiting no endpoint de login
```

### O que você faz aqui:
- Reordena se necessário
- Remove ou adiciona tarefas
- Aprova e o Kiro começa a implementar ✅

## Etapa 4: Implementação

O Kiro executa as tarefas **uma a uma**:

- Cria/edita arquivos conforme cada tarefa
- Marca como concluída ✅ ao terminar
- Você pode pausar, revisar e ajustar a qualquer momento
- Se algo não ficou bom, pede para refazer aquela tarefa específica

## Onde ficam os artefatos?

```
.kiro/
└── specs/
    └── autenticacao-jwt/
        ├── requirements.md
        ├── design.md
        └── tasks.md
```

Os artefatos ficam **no repositório** — podem ser commitados e revisados pelo time.

## Dicas práticas

- 🎯 **Seja específico no prompt inicial** — quanto melhor a descrição, melhores os requisitos
- 🔄 **Itere nos requisitos** — é mais barato ajustar aqui do que no código
- 📎 **Referencie arquivos** — use `#[[file:src/models/user.ts]]` nos artefatos para dar contexto
- ⏸️ **Pause entre tarefas** — revise o código gerado antes de avançar

---

➡️ **Próximo**: [Módulo 03 — Demonstração ao vivo](03-demo-ao-vivo.md)
