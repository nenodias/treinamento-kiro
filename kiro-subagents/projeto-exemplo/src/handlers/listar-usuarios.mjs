import { sucesso, erro } from '../utils/resposta.mjs';
import { listarUsuarios } from '../services/usuario-service.mjs';

/**
 * Handler Lambda: Listar Usuários com paginação.
 *
 * Extrai parâmetros opcionais de query string (limite, pagina), busca todos
 * os usuários no service e aplica paginação simples antes de retornar.
 *
 * @param {object} event - Evento do API Gateway (Lambda Proxy Integration)
 * @param {object|null} event.queryStringParameters - Parâmetros de query string
 * @param {string} [event.queryStringParameters.limite='50'] - Quantidade de itens por página
 * @param {string} [event.queryStringParameters.pagina='1'] - Número da página atual
 * @returns {Promise<object>} Resposta HTTP 200 com { usuarios, paginacao } ou 500 em caso de erro
 * @throws {Error} Capturado internamente — nunca propaga para o Lambda runtime
 *
 * @example
 * const event = { queryStringParameters: { limite: '10', pagina: '2' } };
 * const res = await handler(event);
 * // { statusCode: 200, body: '{"sucesso":true,"dados":{"usuarios":[...],"paginacao":{...}}}' }
 */
export const handler = async (event) => {
  try {
    // 1. Extrair parâmetros opcionais de query string
    const params = event.queryStringParameters || {};
    const limite = parseInt(params.limite) || 50;
    const pagina = parseInt(params.pagina) || 1;

    // 2. Chamar service
    const todosUsuarios = await listarUsuarios();

    // 3. Aplicar paginação simples
    const inicio = (pagina - 1) * limite;
    const usuariosPaginados = todosUsuarios.slice(inicio, inicio + limite);

    // 4. Retornar resposta padronizada com metadados
    return sucesso({
      usuarios: usuariosPaginados,
      paginacao: {
        total: todosUsuarios.length,
        pagina,
        limite,
        totalPaginas: Math.ceil(todosUsuarios.length / limite)
      }
    }, 'Usuários listados com sucesso');

  } catch (error) {
    console.error('[listar-usuarios] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });

    return erro(500, 'Erro interno ao listar usuários');
  }
};
