/**
 * Service de Usuários
 * Contém toda a lógica de negócio relacionada a usuários.
 * Handlers NÃO devem conter lógica — apenas chamam o service.
 */

// Simulação de banco de dados em memória
const usuarios = [];

/**
 * Cria um novo usuário após validações de negócio.
 * @param {object} dados - Dados do usuário { nome, email }
 * @returns {object} Usuário criado com ID gerado
 * @throws {Error} Se email já estiver cadastrado
 */
export async function criarUsuario(dados) {
  const { nome, email } = dados;

  // Regra de negócio: email único
  const existente = usuarios.find(u => u.email === email);
  if (existente) {
    throw new Error('Email já cadastrado');
  }

  // Criar usuário com ID gerado
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
 * @returns {Array} Lista de usuários
 */
export async function listarUsuarios() {
  return usuarios;
}

/**
 * Busca um usuário pelo ID.
 * @param {string} id - ID do usuário
 * @returns {object|null} Usuário encontrado ou null
 */
export async function buscarUsuarioPorId(id) {
  return usuarios.find(u => u.id === id) || null;
}
