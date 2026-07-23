### 9. Demo ao Vivo — Sugestão de Roteiro

[MCP SDKs](https://modelcontextprotocol.io/docs/sdk)

#### Demo 1: Listar os cards do Trello

```text
Liste os meus boards no Trello
```
Mostrar que ele pede permissão para usar a ferramenta


#### Demo 2: MCP consultando o Projeto local

Explicar o código do MCP.

**Pré-requisito:** API de listar produtos funcionando localmente (acessar no navegador `http://localhost:3000/products`).

**Projeto do MCP** (`docs/kiro-mcp/mcp-local/`):

- Mostrar cliente de acesso à API de produtos (`src/productService.mjs`)
  - É um projeto comum, JS simples
- Mostrar o arquivo com o SDK do MCP (`src/mcp.mjs`)
  - Explicar o conceito do SDK que faz a ligação com o client na IDE

```text
liste todos os produtos usando o products-mcp
```

- Desbilitar a ferramenta `listar_produtos` no `produtos-mcp`
  - executar novamente o prompt de listar produtos e mostrar que o IA não consegue porque a ferramenta está desabilitada 



----- (Opcional)
#### Análise: Desmistificando um MCP Oficial

- Analisar um MCP oficial e mostrar as ferramentas que ele expõe e o que significa desabilitar
- Exemplo na pasta: `docs/kiro-mcp/codigo-mcps-comuns/`
  - O arquivo do MCP do Trello começa com as ferramentas disponíveis na **linha 514**, e é a primeira mostrada na IDE do Kiro em MCPs
