import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock do módulo para isolar testes (reset do array em memória)
let criarUsuario, listarUsuarios, buscarUsuarioPorId, deletarUsuario;

describe('usuario-service', () => {
  beforeEach(async () => {
    // Re-importa o módulo para resetar o estado em memória
    vi.resetModules();
    const modulo = await import('../../src/services/usuario-service.mjs');
    criarUsuario = modulo.criarUsuario;
    listarUsuarios = modulo.listarUsuarios;
    buscarUsuarioPorId = modulo.buscarUsuarioPorId;
    deletarUsuario = modulo.deletarUsuario;
  });

  describe('criarUsuario', () => {
    it('deve criar usuário quando dados são válidos', async () => {
      const resultado = await criarUsuario({ nome: 'João', email: 'joao@email.com' });

      expect(resultado).toBeDefined();
      expect(resultado.id).toBeDefined();
      expect(resultado.nome).toBe('João');
      expect(resultado.email).toBe('joao@email.com');
      expect(resultado.criadoEm).toBeDefined();
    });

    it('deve lançar erro quando email já existe', async () => {
      await criarUsuario({ nome: 'Maria', email: 'maria@email.com' });

      await expect(criarUsuario({ nome: 'Outra Maria', email: 'maria@email.com' }))
        .rejects.toThrow('Email já cadastrado');
    });

    it('deve gerar IDs únicos para cada usuário', async () => {
      const user1 = await criarUsuario({ nome: 'User1', email: 'user1@email.com' });
      const user2 = await criarUsuario({ nome: 'User2', email: 'user2@email.com' });

      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('listarUsuarios', () => {
    it('deve retornar lista vazia quando não há usuários', async () => {
      const resultado = await listarUsuarios();

      expect(resultado).toEqual([]);
    });

    it('deve retornar todos os usuários cadastrados', async () => {
      await criarUsuario({ nome: 'Ana', email: 'ana@email.com' });
      await criarUsuario({ nome: 'Carlos', email: 'carlos@email.com' });

      const resultado = await listarUsuarios();

      expect(resultado).toHaveLength(2);
      expect(resultado[0].nome).toBe('Ana');
      expect(resultado[1].nome).toBe('Carlos');
    });
  });

  describe('buscarUsuarioPorId', () => {
    it('deve retornar usuário quando ID existe', async () => {
      const criado = await criarUsuario({ nome: 'Pedro', email: 'pedro@email.com' });

      const resultado = await buscarUsuarioPorId(criado.id);

      expect(resultado).toBeDefined();
      expect(resultado.nome).toBe('Pedro');
      expect(resultado.email).toBe('pedro@email.com');
    });

    it('deve retornar null quando ID não encontrado', async () => {
      const resultado = await buscarUsuarioPorId('id-inexistente');

      expect(resultado).toBeNull();
    });

    it('deve retornar null quando não há usuários cadastrados', async () => {
      const resultado = await buscarUsuarioPorId('qualquer-id');

      expect(resultado).toBeNull();
    });
  });

  describe('deletarUsuario', () => {
    it('deve deletar e retornar o usuário quando ID existe', async () => {
      const criado = await criarUsuario({ nome: 'Lucas', email: 'lucas@email.com' });

      const resultado = await deletarUsuario(criado.id);

      expect(resultado.id).toBe(criado.id);
      expect(resultado.nome).toBe('Lucas');

      // Verificar que foi removido
      const lista = await listarUsuarios();
      expect(lista).toHaveLength(0);
    });

    it('deve lançar erro quando ID não encontrado', async () => {
      await expect(deletarUsuario('id-inexistente'))
        .rejects.toThrow('Usuário não encontrado');
    });

    it('deve remover apenas o usuário correto', async () => {
      const user1 = await criarUsuario({ nome: 'User1', email: 'user1@email.com' });
      await criarUsuario({ nome: 'User2', email: 'user2@email.com' });

      await deletarUsuario(user1.id);

      const lista = await listarUsuarios();
      expect(lista).toHaveLength(1);
      expect(lista[0].nome).toBe('User2');
    });
  });
});
