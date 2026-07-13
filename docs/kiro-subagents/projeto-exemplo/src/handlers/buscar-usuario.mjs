import { sucesso, erro } from '../utils/resposta.mjs';
import { buscarUsuarioPorId } from '../services/usuario-service.mjs';

/**
 * Handler Lambda: Buscar Usuário por ID.
 *
 * Extrai o ID dos path parameters, busca no service e retorna o usuário
 * ou erro 404 se não encontrado.
 *
 * @param {object} event - Evento do API Gateway (Lambda Proxy Integration)
 * @param {object} event.pathParameters - Parâmetros de rota
 * @param {string} event.pathParameters.id - UUID do usuário a ser buscado
 * @returns {Promise<object>} Resposta HTTP padronizada (200, 400, 404 ou 500)
 * @throws {Error} Capturado internamente — nunca propaga para o Lambda runtime
 *
 * @example
 * const event = { pathParameters: { id: 'abc-123' } };
 * const res = await handler(event);
 * // { statusCode: 200, body: '{"sucesso":true,"dados":{...},"mensagem":"Usuário encontrado"}' }
 */
export const handler = async (event) => {
  try {
    // 1. Extrair e validar input
    const id = event.pathParameters?.id;

    if (!id) {
      return erro(400, 'Parâmetro id é obrigatório');
    }

    // 2. Chamar service
    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      return erro(404, 'Usuário não encontrado');
    }

    // 3. Retornar resposta padronizada
    return sucesso(usuario, 'Usuário encontrado');

  } catch (error) {
    console.error('[buscar-usuario] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });

    return erro(500, 'Erro interno ao buscar usuário');
  }
};
