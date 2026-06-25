import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from '../../src/handlers/listar-usuarios.mjs';

// Mock do service
vi.mock('../../src/services/usuario-service.mjs', () => ({
  listarUsuarios: vi.fn()
}));

import { listarUsuarios } from '../../src/services/usuario-service.mjs';

describe('handler listar-usuarios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve listar usuários com paginação padrão', async () => {
    const usuariosMock = [
      { id: '1', nome: 'João', email: 'joao@email.com', criadoEm: '2024-01-01' },
      { id: '2', nome: 'Maria', email: 'maria@email.com', criadoEm: '2024-01-02' }
    ];
    listarUsuarios.mockResolvedValue(usuariosMock);

    const event = {
      queryStringParameters: null
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.sucesso).toBe(true);
    expect(body.dados.usuarios).toEqual(usuariosMock);
    expect(body.dados.paginacao).toEqual({
      total: 2,
      pagina: 1,
      limite: 50,
      totalPaginas: 1
    });
    expect(body.mensagem).toBe('Usuários listados com sucesso');
  });

  it('deve respeitar parâmetros de paginação customizados', async () => {
    const usuariosMock = Array.from({ length: 5 }, (_, i) => ({
      id: String(i + 1),
      nome: `User ${i + 1}`,
      email: `user${i + 1}@email.com`,
      criadoEm: '2024-01-01'
    }));
    listarUsuarios.mockResolvedValue(usuariosMock);

    const event = {
      queryStringParameters: { limite: '2', pagina: '2' }
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(body.dados.usuarios).toHaveLength(2);
    expect(body.dados.usuarios[0].nome).toBe('User 3');
    expect(body.dados.usuarios[1].nome).toBe('User 4');
    expect(body.dados.paginacao).toEqual({
      total: 5,
      pagina: 2,
      limite: 2,
      totalPaginas: 3
    });
  });

  it('deve retornar lista vazia quando não há usuários', async () => {
    listarUsuarios.mockResolvedValue([]);

    const event = {
      queryStringParameters: null
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.dados.usuarios).toEqual([]);
    expect(body.dados.paginacao.total).toBe(0);
    expect(body.dados.paginacao.totalPaginas).toBe(0);
  });

  it('deve usar valores padrão quando queryStringParameters é undefined', async () => {
    listarUsuarios.mockResolvedValue([]);

    const event = {};

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.dados.paginacao.pagina).toBe(1);
    expect(body.dados.paginacao.limite).toBe(50);
  });

  it('deve usar fallback quando parâmetros são inválidos', async () => {
    listarUsuarios.mockResolvedValue([]);

    const event = {
      queryStringParameters: { limite: 'abc', pagina: 'xyz' }
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.dados.paginacao.pagina).toBe(1);
    expect(body.dados.paginacao.limite).toBe(50);
  });

  it('deve retornar lista vazia quando página está além dos dados', async () => {
    const usuariosMock = [
      { id: '1', nome: 'João', email: 'joao@email.com', criadoEm: '2024-01-01' }
    ];
    listarUsuarios.mockResolvedValue(usuariosMock);

    const event = {
      queryStringParameters: { pagina: '99', limite: '10' }
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.dados.usuarios).toEqual([]);
    expect(body.dados.paginacao.total).toBe(1);
  });

  it('deve retornar erro 500 para erros inesperados', async () => {
    listarUsuarios.mockRejectedValue(new Error('Database connection failed'));

    const event = {
      queryStringParameters: null
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(500);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Erro interno ao listar usuários');
  });

  it('deve logar o erro no console em caso de exceção', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    listarUsuarios.mockRejectedValue(new Error('Timeout'));

    const event = { queryStringParameters: null };

    await handler(event);

    expect(consoleSpy).toHaveBeenCalledWith(
      '[listar-usuarios] Erro:',
      expect.objectContaining({
        mensagem: 'Timeout',
        timestamp: expect.any(String)
      })
    );

    consoleSpy.mockRestore();
  });
});
