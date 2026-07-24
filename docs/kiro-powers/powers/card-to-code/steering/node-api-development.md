# Desenvolvimento de API em Node.js

Este guia define como implementar funcionalidades de API ao trabalhar com cards do Trello, seguindo os padrões do time backend.

## Arquitetura de Projeto

```
src/
├── handlers/       → Entry points HTTP (parse, chamada ao service, resposta)
├── services/       → Lógica de negócio pura (validação, estado, regras)
├── utils/          → Helpers genéricos reutilizáveis
├── middlewares/    → Autenticação, validação, logging
├── routes/         → Definição de rotas
├── config/         → Configurações e variáveis de ambiente
└── errors/         → Classes de erro customizadas
```

### Regras de Separação

- Handlers **nunca** contêm lógica de negócio
- Services **nunca** conhecem HTTP (sem statusCode, sem headers)
- Utils **nunca** têm acoplamento a domínio específico

## Nomenclatura

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Arquivos | `kebab-case.mjs` (português para domínio) | `criar-usuario.mjs` |
| Funções e variáveis | `camelCase` em português | `buscarUsuario`, `listaAtiva` |
| Classes de erro | `PascalCase` com sufixo `Error` | `UsuarioNaoEncontradoError` |
| Constantes | `UPPER_SNAKE_CASE` | `TEMPO_EXPIRACAO_TOKEN` |
| Rotas | kebab-case, substantivos no plural | `/api/v1/usuarios` |

## Criando um Novo Endpoint

### 1. Definir a Rota

```javascript
// src/routes/usuarios.mjs
import { criarUsuarioHandler } from '../handlers/criar-usuario.mjs';
import { buscarUsuarioHandler } from '../handlers/buscar-usuario.mjs';

export function registrarRotasUsuarios(app) {
  app.post('/api/v1/usuarios', criarUsuarioHandler);
  app.get('/api/v1/usuarios/:id', buscarUsuarioHandler);
}
```

### 2. Criar o Handler

```javascript
// src/handlers/criar-usuario.mjs
import { criarUsuario } from '../services/criar-usuario.mjs';
import { sucesso, erro } from '../utils/resposta.mjs';

export async function criarUsuarioHandler(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuario = await criarUsuario({ nome, email, senha });

    return sucesso(res, usuario, 'Usuário criado com sucesso', 201);
  } catch (err) {
    if (err.codigo) {
      return erro(res, err.codigo, err.message);
    }
    console.error('[criarUsuarioHandler] Erro:', {
      mensagem: err.message,
      timestamp: new Date().toISOString()
    });
    return erro(res, 500, 'Erro interno do servidor');
  }
}
```

### 3. Criar o Service

```javascript
// src/services/criar-usuario.mjs
import { EmailJaExisteError } from '../errors/email-ja-existe-error.mjs';

export async function criarUsuario({ nome, email, senha }) {
  // Validação de negócio
  const existente = await buscarPorEmail(email);
  if (existente) {
    throw new EmailJaExisteError(email);
  }

  // Lógica de criação
  const senhaHash = await gerarHash(senha);
  const usuario = await salvarUsuario({ nome, email, senha: senhaHash });

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    criadoEm: usuario.criadoEm
  };
}
```

### 4. Classe de Erro Customizada

```javascript
// src/errors/email-ja-existe-error.mjs
export class EmailJaExisteError extends Error {
  constructor(email) {
    super(`Email já cadastrado: ${email}`);
    this.name = 'EmailJaExisteError';
    this.codigo = 409;
  }
}
```

## Respostas HTTP

Sempre usar helpers padronizados:

```javascript
// src/utils/resposta.mjs
export function sucesso(res, dados = null, mensagem = 'Operação realizada com sucesso', status = 200) {
  return res.status(status).json({
    sucesso: true,
    dados,
    mensagem
  });
}

export function erro(res, status = 500, mensagem = 'Erro interno do servidor') {
  return res.status(status).json({
    sucesso: false,
    dados: null,
    mensagem
  });
}
```

### Códigos HTTP Comuns

| Código | Quando usar |
|--------|-------------|
| 200 | Busca ou atualização com sucesso |
| 201 | Recurso criado |
| 204 | Deleção com sucesso (sem body) |
| 400 | Dados inválidos do cliente |
| 401 | Não autenticado |
| 403 | Sem permissão |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex: email duplicado) |
| 500 | Erro inesperado do servidor |

## Tratamento de Erros

### Regras

- Handlers sempre com `try/catch`
- Erros de domínio: classes customizadas com propriedade `codigo`
- Erros inesperados: retornar 500 genérico (sem vazar stack)
- Log estruturado: `console.error('[contexto] Erro:', { mensagem, timestamp })`

### Middleware Global de Erros

```javascript
// src/middlewares/erro-global.mjs
export function erroGlobalMiddleware(err, req, res, next) {
  console.error('[erroGlobal] Erro:', {
    mensagem: err.message,
    rota: req.originalUrl,
    metodo: req.method,
    timestamp: new Date().toISOString()
  });

  if (err.codigo) {
    return res.status(err.codigo).json({
      sucesso: false,
      dados: null,
      mensagem: err.message
    });
  }

  return res.status(500).json({
    sucesso: false,
    dados: null,
    mensagem: 'Erro interno do servidor'
  });
}
```

## Validação de Entrada

Validar dados no handler antes de chamar o service:

```javascript
// Validação simples no handler
const { nome, email } = req.body;

if (!nome || !email) {
  return erro(res, 400, 'Nome e email são obrigatórios');
}
```

Para validações complexas, usar um middleware de validação ou lib como `zod`:

```javascript
import { z } from 'zod';

const esquemaCriarUsuario = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres')
});
```

## Estrutura de Commits para Cards

Ao implementar um card do Trello, siga esta estrutura:

1. **Um commit por unidade lógica** (não um commit gigante):
   - `feat: adicionar rota POST /api/v1/usuarios`
   - `feat: adicionar service de criação de usuário`
   - `feat: adicionar validação de email duplicado`

2. **Ou um commit atômico** se a mudança for pequena:
   - `feat: implementar endpoint de criação de usuário`

3. **Referenciar o card no body do commit:**
   ```
   feat: implementar endpoint de criação de usuário

   - Handler com validação de entrada
   - Service com regras de negócio
   - Classe de erro para email duplicado

   Trello: https://trello.com/c/<card-id>
   ```

## Checklist de Implementação

Ao pegar um card do Trello para implementar:

- [ ] Ler a descrição e critérios de aceitação do card
- [ ] Identificar qual camada precisa ser criada/alterada (handler, service, utils)
- [ ] Criar/atualizar as rotas
- [ ] Implementar o handler (parse + try/catch + resposta)
- [ ] Implementar o service (lógica de negócio pura)
- [ ] Criar classes de erro customizadas se necessário
- [ ] Validar dados de entrada
- [ ] Garantir log estruturado em erros
- [ ] Commitar seguindo conventional commits
- [ ] Criar PR referenciando o card do Trello
