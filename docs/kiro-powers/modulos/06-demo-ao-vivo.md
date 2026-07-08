# 🎬 Módulo 06 — Demo ao Vivo: Criando um Power do Zero

> ⏱️ Tempo estimado: ~8 minutos

---

## Setup da Demo

Abra o Kiro com o projeto `projeto-exemplo/` deste treinamento. É uma API Node.js simples que vamos usar como contexto.

```
projeto-exemplo/
├── src/
│   ├── handlers/
│   │   └── criar-usuario.mjs
│   ├── services/
│   │   └── usuario-service.mjs
│   └── utils/
│       └── resposta.mjs
├── power-do-time/            ← Vamos criar isso ao vivo!
│   └── POWER.md
├── package.json
└── README.md
```

---

## Demo 1: Criando o Power manualmente (~4 min)

### Passo a passo:

1. **Crie a pasta** `power-do-time/` dentro de `projeto-exemplo/`

2. **Crie o arquivo** `power-do-time/POWER.md` com este conteúdo:

```markdown
---
name: "padroes-api-node"
displayName: "Padrões API Node.js"
description: "Convenções de código, estrutura e boas práticas para APIs Node.js do time"
keywords: ["padrões", "convenções", "api", "node", "handler", "service", "endpoint"]
author: "Time Backend"
---

# Padrões para APIs Node.js

## Estrutura de Handlers

Todo handler deve seguir este padrão:

```javascript
export const handler = async (event) => {
  try {
    // 1. Extrair e validar input
    const dados = JSON.parse(event.body || '{}');

    // 2. Chamar service (lógica de negócio)
    const resultado = await meuService.executar(dados);

    // 3. Retornar resposta padronizada
    return resposta(200, { sucesso: true, dados: resultado });
  } catch (erro) {
    console.error('[HANDLER] Erro:', { erro: erro.message, event });
    return resposta(500, { sucesso: false, mensagem: 'Erro interno' });
  }
};
```

## Regras obrigatórias

1. **Nunca** coloque lógica de negócio no handler — use services
2. **Sempre** valide o input antes de processar
3. **Sempre** use try/catch com log estruturado
4. **Nunca** retorne stack traces na resposta HTTP
5. **Sempre** use a função `resposta()` de utils para padronizar saída

## Nomenclatura

- Handlers: `verbo-substantivo.mjs` (ex: `criar-usuario.mjs`)
- Services: `substantivo-service.mjs` (ex: `usuario-service.mjs`)
- Funções: camelCase (ex: `criarUsuario`)

## Função de resposta padrão

```javascript
export function resposta(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };
}
```
```

3. **Instale o Power no Kiro**:
   - `Ctrl + Shift + P` → `Configure Powers`
   - Instale do diretório local → aponte para `power-do-time/`

4. **Teste no chat**:

```
Prompt: "Crie um endpoint para deletar um usuário seguindo os padrões"
```

O Kiro deve gerar código seguindo exatamente o padrão documentado no Power.

---

## Demo 2: Pedindo ao Kiro para criar o Power (~2 min)

Método alternativo — deixe o Kiro criar o Power por você:

### Prompt para o chat:

```
Analise a estrutura e padrões deste projeto (src/handlers, src/services, src/utils).
Crie um Knowledge Base Power em uma pasta chamada "power-do-time" com:
- POWER.md com frontmatter válido
- Documentação dos padrões que você identificou no código
- Keywords relevantes para ativar quando alguém pedir para criar endpoints ou services
```

### O que o Kiro faz:
1. Lê os arquivos do projeto
2. Identifica padrões (estrutura, nomenclatura, tratamento de erros)
3. Gera o `POWER.md` com documentação baseada no código real

> 🎯 **Ponto-chave da demo**: O Power é gerado a partir do código existente, não inventado.

---

## Demo 3: Testando o Power em ação (~2 min)

Com o Power instalado, teste com estes prompts:

### Prompt 1 — Criar novo endpoint:
```
Crie um handler para atualizar o email de um usuário
```

**Espere ver**: código seguindo o padrão handler → service → resposta padronizada.

### Prompt 2 — Validar código existente:
```
Este código segue os padrões do time?

export const handler = async (event) => {
  const user = await db.query("SELECT * FROM users WHERE id = " + event.id);
  return { body: JSON.stringify(user) };
};
```

**Espere ver**: O Kiro apontar problemas (SQL injection, falta de try/catch, resposta fora do padrão, lógica no handler).

### Prompt 3 — Explicar padrões:
```
Quais são as convenções de nomenclatura do time?
```

**Espere ver**: O Kiro responder com base no POWER.md (kebab-case para arquivos, camelCase para funções, etc.).

---

## Dicas para a Demo

### Se algo não ativar:
- Verifique se o Power está instalado (painel Powers)
- Use uma keyword do frontmatter no prompt
- Reinstale: desinstale e instale novamente

### Para impressionar:
- Mostre o antes/depois — mesmo prompt sem e com o Power
- Mostre que o Power pode ser editado em tempo real
- Abra o POWER.md e mostre a simplicidade (é só Markdown!)

---

## Encerramento (~2 min)

### Recapitulando o treinamento:

✅ **Módulo 01**: Powers = conhecimento + ferramentas sob demanda
✅ **Módulo 02**: Instalar pela galeria ou localmente
✅ **Módulo 03**: MCP servers via mcp.json (AWS Docs como exemplo)
✅ **Módulo 04**: Criar Power = POWER.md com frontmatter
✅ **Módulo 05**: Compartilhar via Git (Azure DevOps, GitLab, etc.)
✅ **Módulo 06**: Criamos um Power ao vivo!

### Próximos passos para o time:

1. Identifique os **padrões não escritos** do time
2. Crie um Power documentando esses padrões
3. Coloque no repositório do time no Azure DevOps
4. Peça para todos instalarem
5. Itere — adicione novas regras conforme surgem

### Links úteis:

- 📖 [Documentação oficial — Powers](https://kiro.dev/docs/powers/)
- 📦 [Galeria de Powers](https://kiro.dev/powers/)
- 🛠️ [Repositório de Powers open source](https://github.com/kirodotdev/powers)
- ⚙️ [Configuração MCP](https://kiro.dev/docs/mcp/configuration/)

---

## Perguntas?

> 💬 Peça ao Kiro: "Me ajude a criar um Power para [descreva seu caso]"
>
> Ele vai te guiar no processo!

---

> 📌 **Fonte oficial**: [Documentação Kiro - Powers](https://kiro.dev/docs/powers/)
