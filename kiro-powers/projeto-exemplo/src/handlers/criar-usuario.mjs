import { sucesso, erro } from '../utils/resposta.mjs';
import { criarUsuario } from '../services/usuario-service.mjs';

/**
 * Handler Lambda: Criar Usuário
 *
 * Padrão do time:
 * 1. Extrair e validar input
 * 2. Chamar service (lógica de negócio)
 * 3. Retornar resposta padronizada
 *
 * NUNCA colocar lógica de negócio aqui — use o service.
 */
export const handler = async (event) => {
  try {
    // 1. Extrair e validar input
    const body = JSON.parse(event.body || '{}');

    if (!body.nome || !body.email) {
      return erro(400, 'Campos nome e email são obrigatórios');
    }

    // Validação básica de email
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
