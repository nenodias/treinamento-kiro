import { sucesso, erro } from '../utils/resposta.mjs';
import { deletarUsuario } from '../services/usuario-service.mjs';

/**
 * Handler Lambda: Deletar Usuário.
 *
 * Extrai o ID dos path parameters, deleta via service e retorna os dados
 * do usuário removido ou erro 404 se não encontrado.
 *
 * @param {object} event - Evento do API Gateway (Lambda Proxy Integration)
 * @param {object} event.pathParameters - Parâmetros de rota
 * @param {string} event.pathParameters.id - UUID do usuário a ser deletado
 * @returns {Promise<object>} Resposta HTTP padronizada (200, 400, 404 ou 500)
 * @throws {Error} Capturado internamente — nunca propaga para o Lambda runtime
 *
 * @example
 * const event = { pathParameters: { id: 'abc-123' } };
 * const res = await handler(event);
 * // { statusCode: 200, body: '{"sucesso":true,"dados":{...},"mensagem":"Usuário deletado com sucesso"}' }
 */
export const handler = async (event) => {
  try {
    // 1. Extrair e validar input
    const id = event.pathParameters?.id;

    if (!id) {
      return erro(400, 'Parâmetro id é obrigatório');
    }

    // 2. Chamar service
    const usuarioRemovido = await deletarUsuario(id);

    // 3. Retornar resposta padronizada
    return sucesso(usuarioRemovido, 'Usuário deletado com sucesso');

  } catch (error) {
    console.error('[deletar-usuario] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });

    if (error.message === 'Usuário não encontrado') {
      return erro(404, error.message);
    }

    return erro(500, 'Erro interno ao deletar usuário');
  }
};
