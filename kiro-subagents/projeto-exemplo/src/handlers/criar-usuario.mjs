import { sucesso, erro } from '../utils/resposta.mjs';
import { criarUsuario } from '../services/usuario-service.mjs';

/**
 * Handler Lambda: Criar Usuário.
 *
 * Recebe evento do API Gateway, valida campos obrigatórios (nome e email),
 * verifica formato do email e delega criação ao service.
 *
 * @param {object} event - Evento do API Gateway (Lambda Proxy Integration)
 * @param {string} event.body - JSON stringificado com { nome, email }
 * @returns {Promise<object>} Resposta HTTP padronizada (200, 400, 409 ou 500)
 * @throws {Error} Capturado internamente — nunca propaga para o Lambda runtime
 *
 * @example
 * // Evento de entrada:
 * const event = { body: JSON.stringify({ nome: 'João', email: 'joao@email.com' }) };
 * const res = await handler(event);
 * // { statusCode: 200, body: '{"sucesso":true,"dados":{...},"mensagem":"Usuário criado com sucesso"}' }
 */
export const handler = async (event) => {
  try {
    // 1. Extrair e validar input
    const body = JSON.parse(event.body || '{}');

    if (!body.nome || !body.email) {
      return erro(400, 'Campos nome e email são obrigatórios');
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
    if (!emailValido) {
      return erro(400, 'Formato de email inválido');
    }

    // 2. Chamar service
    const usuario = await criarUsuario({
      nome: body.nome,
      email: body.email
    });

    // 3. Retornar resposta padronizada
    return sucesso(usuario, 'Usuário criado com sucesso');

  } catch (error) {
    console.error('[criar-usuario] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });

    if (error.message === 'Email já cadastrado') {
      return erro(409, error.message);
    }

    return erro(500, 'Erro interno ao criar usuário');
  }
};
