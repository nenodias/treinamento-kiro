import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { listarProducts } from './productService.mjs';

const server = new McpServer({
  name: 'products-mcp',
  version: '1.0.0',
});

server.tool(
  'listar_products',
  'Lista todos os produtos disponíveis na API. Retorna dados com id, name, description, price, category e createdAt.',
  {
    page: z.number().optional().describe('Número da página para paginação (padrão: 1)'),
  },
  async ({ page }) => {
    try {
      const dados = await listarProducts(page);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(dados, null, 2),
          },
        ],
      };
    } catch (erro) {
      console.error('[listar_products] Erro:', {
        mensagem: erro.message,
        timestamp: new Date().toISOString(),
      });

      return {
        content: [
          {
            type: 'text',
            text: `Erro ao buscar produtos: ${erro.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();
