import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from '../../src/handlers/criar-usuario.mjs';

// Mock do service
vi.mock('../../src/services/usuario-service.mjs', () => ({
  criarUsuario: vi.fn()
}));

import { criarUsuario } from '../../src/services/usuario-service.mjs';

describe('handler criar-usuario', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar usuário com sucesso quando dados são válidos', async () => {
    const usuarioMock = { id: '123', nome: 'João', email: 'joao@email.com', criadoEm: '2024-01-01' };
    criarUsuario.mockResolvedValue(usuarioMock);

    const event = {
      body: JSON.stringify({ nome: 'João', email: 'joao@email.com' })
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.sucesso).toBe(true);
    expect(body.dados).toEqual(usuarioMock);
    expect(body.mensagem).toBe('Usuário criado com sucesso');
    expect(criarUsuario).toHaveBeenCalledWith({ nome: 'João', email: 'joao@email.com' });
  });

  it('deve retornar erro 400 quando nome não é informado', async () => {
    const event = {
      body: JSON.stringify({ email: 'joao@email.com' })
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(400);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Campos nome e email são obrigatórios');
    expect(criarUsuario).not.toHaveBeenCalled();
  });

  it('deve retornar erro 400 quando email não é informado', async () => {
    const event = {
      body: JSON.stringify({ nome: 'João' })
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(400);
    expect(body.mensagem).toBe('Campos nome e email são obrigatórios');
    expect(criarUsuario).not.toHaveBeenCalled();
  });

  it('deve retornar erro 400 quando email tem formato inválido', async () => {
    const event = {
      body: JSON.stringify({ nome: 'João', email: 'email-invalido' })
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(400);
    expect(body.mensagem).toBe('Formato de email inválido');
    expect(criarUsuario).not.toHaveBeenCalled();
  });

  it('deve retornar erro 409 quando email já está cadastrado', async () => {
    criarUsuario.mockRejectedValue(new Error('Email já cadastrado'));

    const event = {
      body: JSON.stringify({ nome: 'Maria', email: 'maria@email.com' })
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(409);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Email já cadastrado');
  });

  it('deve retornar erro 500 para erros inesperados', async () => {
    criarUsuario.mockRejectedValue(new Error('Database connection failed'));

    const event = {
      body: JSON.stringify({ nome: 'Carlos', email: 'carlos@email.com' })
    };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(500);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Erro interno ao criar usuário');
  });

  it('deve lidar com body vazio no event', async () => {
    const event = { body: null };

    const resultado = await handler(event);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(400);
    expect(body.mensagem).toBe('Campos nome e email são obrigatórios');
  });

  it('deve validar emails com formatos diversos', async () => {
    const usuarioMock = { id: '456', nome: 'Ana', email: 'ana.silva@empresa.com.br', criadoEm: '2024-01-01' };
    criarUsuario.mockResolvedValue(usuarioMock);

    const event = {
      body: JSON.stringify({ nome: 'Ana', email: 'ana.silva@empresa.com.br' })
    };

    const resultado = await handler(event);

    expect(resultado.statusCode).toBe(200);
    expect(criarUsuario).toHaveBeenCalled();
  });
});
