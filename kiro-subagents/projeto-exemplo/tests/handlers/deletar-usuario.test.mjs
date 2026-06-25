import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from '../../src/handlers/deletar-usuario.mjs';

// Mock do service
vi.mock('../../src/services/usuario-service.mjs', () => ({
  deletarUsuario: vi.fn()
}));

import { deletarUsuario } from '../../src/services/usuario-service.mjs';

describe('handler deletar-usuario', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve deletar usuário com sucesso quando ID existe', async () => {
    const usuarioMock = { id: 'abc-123', nome: 'João', email: 'joao@email.com', criadoEm: '2024-01-01' };
    deletarUsuario.mockResolvedValue(usuarioMock);

    const event = {
      pathParameters: { id: 'abc-123' }
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.sucesso).toBe(true);
    expect(body.dados).toEqual(usuarioMock);
    expect(body.mensagem).toBe('Usuário deletado com sucesso');
    expect(deletarUsuario).toHaveBeenCalledWith('abc-123');
  });

  it('deve retornar erro 400 quando id não é informado', async () => {
    const event = {
      pathParameters: {}
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(400);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Parâmetro id é obrigatório');
    expect(deletarUsuario).not.toHaveBeenCalled();
  });

  it('deve retornar erro 400 quando pathParameters é undefined', async () => {
    const event = {};

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(400);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Parâmetro id é obrigatório');
  });

  it('deve retornar erro 404 quando usuário não é encontrado', async () => {
    deletarUsuario.mockRejectedValue(new Error('Usuário não encontrado'));

    const event = {
      pathParameters: { id: 'id-inexistente' }
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(404);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Usuário não encontrado');
  });

  it('deve retornar erro 500 para erros inesperados', async () => {
    deletarUsuario.mockRejectedValue(new Error('Database connection failed'));

    const event = {
      pathParameters: { id: 'abc-123' }
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(500);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Erro interno ao deletar usuário');
  });

  it('deve logar o erro no console em caso de exceção', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    deletarUsuario.mockRejectedValue(new Error('Connection timeout'));

    const event = {
      pathParameters: { id: 'abc-123' }
    };

    await handler(event);

    expect(consoleSpy).toHaveBeenCalledWith(
      '[deletar-usuario] Erro:',
      expect.objectContaining({
        mensagem: 'Connection timeout',
        timestamp: expect.any(String)
      })
    );

    consoleSpy.mockRestore();
  });
});
