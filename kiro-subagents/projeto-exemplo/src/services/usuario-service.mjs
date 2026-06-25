/**
 * @module usuario-service
 * @description Serviço de lógica de negócio para gerenciamento de usuários.
 * Utiliza armazenamento em memória (substituir por DynamoDB/banco em produção).
 */

// Simulação de banco de dados em memória
const usuarios = [];

/**
 * Cria um novo usuário após validações de negócio.
 *
 * @param {object} dados - Dados do novo usuário
 * @param {string} dados.nome - Nome completo do usuário
 * @param {string} dados.email - Email válido e único
 * @returns {Promise<object>} Usuário criado com id, nome, email e criadoEm
 * @throws {Error} Se o email já estiver cadastrado no sistema
 *
 * @example
 * const user = await criarUsuario({ nome: 'João', email: 'joao@email.com' });
 * // { id: 'abc-123', nome: 'João', email: 'joao@email.com', criadoEm: '2025-01-01T00:00:00.000Z' }
 */
export async function criarUsuario(dados) {
  const { nome, email } = dados;

  // Regra de negócio: email único
  const existente = usuarios.find(u => u.email === email);
  if (existente) {
    throw new Error('Email já cadastrado');
  }

  const novoUsuario = {
    id: crypto.randomUUID(),
    nome,
    email,
    criadoEm: new Date().toISOString()
  };

  usuarios.push(novoUsuario);
  return novoUsuario;
}

/**
 * Lista todos os usuários cadastrados.
 *
 * @returns {Promise<Array<object>>} Array de usuários (vazio se nenhum cadastrado)
 *
 * @example
 * const lista = await listarUsuarios();
 * // [{ id: '...', nome: 'João', email: 'joao@email.com', criadoEm: '...' }]
 */
export async function listarUsuarios() {
  return usuarios;
}

/**
 * Busca um usuário pelo ID.
 *
 * @param {string} id - UUID do usuário a ser buscado
 * @returns {Promise<object|null>} Usuário encontrado ou null se não existir
 *
 * @example
 * const user = await buscarUsuarioPorId('abc-123');
 * // { id: 'abc-123', nome: 'João', email: 'joao@email.com', criadoEm: '...' }
 *
 * const naoEncontrado = await buscarUsuarioPorId('id-inexistente');
 * // null
 */
export async function buscarUsuarioPorId(id) {
  return usuarios.find(u => u.id === id) || null;
}

/**
 * Deleta um usuário pelo ID e retorna os dados removidos.
 *
 * @param {string} id - UUID do usuário a ser deletado
 * @returns {Promise<object>} Dados do usuário removido
 * @throws {Error} Se o usuário não for encontrado pelo ID informado
 *
 * @example
 * const removido = await deletarUsuario('abc-123');
 * // { id: 'abc-123', nome: 'João', email: 'joao@email.com', criadoEm: '...' }
 */
export async function deletarUsuario(id) {
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }
  return usuarios.splice(index, 1)[0];
}
