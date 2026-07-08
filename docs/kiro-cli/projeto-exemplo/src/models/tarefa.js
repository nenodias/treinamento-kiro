import { randomUUID } from 'node:crypto';

/**
 * Modelo de Tarefa
 * Armazenamento em memória para fins de demonstração
 */

// "Banco de dados" em memória
const tarefas = new Map();

// Seed com dados iniciais
const seedData = [
  {
    titulo: 'Instalar Kiro CLI',
    descricao: 'Seguir o módulo 01 do treinamento',
    status: 'concluida'
  },
  {
    titulo: 'Testar autocomplete',
    descricao: 'Experimentar autocomplete com git, docker e npm',
    status: 'em_andamento'
  },
  {
    titulo: 'Configurar steering',
    descricao: 'Criar arquivo .kiro/steering/padroes.md',
    status: 'pendente'
  }
];

// Popular dados iniciais
seedData.forEach(dados => {
  const id = randomUUID();
  tarefas.set(id, {
    id,
    ...dados,
    criadaEm: new Date().toISOString(),
    atualizadaEm: new Date().toISOString()
  });
});

/**
 * Retorna todas as tarefas
 */
export function listarTodas() {
  return Array.from(tarefas.values());
}

/**
 * Busca uma tarefa por ID
 */
export function buscarPorId(id) {
  return tarefas.get(id) || null;
}

/**
 * Cria uma nova tarefa
 */
export function criar(dados) {
  const id = randomUUID();
  const tarefa = {
    id,
    titulo: dados.titulo,
    descricao: dados.descricao || '',
    status: 'pendente',
    criadaEm: new Date().toISOString(),
    atualizadaEm: new Date().toISOString()
  };
  tarefas.set(id, tarefa);
  return tarefa;
}

/**
 * Atualiza uma tarefa existente
 */
export function atualizar(id, dados) {
  const tarefa = tarefas.get(id);
  if (!tarefa) return null;

  const atualizada = {
    ...tarefa,
    ...dados,
    id, // Garante que o ID não muda
    atualizadaEm: new Date().toISOString()
  };
  tarefas.set(id, atualizada);
  return atualizada;
}

/**
 * Deleta uma tarefa
 */
export function deletar(id) {
  if (!tarefas.has(id)) return false;
  tarefas.delete(id);
  return true;
}
