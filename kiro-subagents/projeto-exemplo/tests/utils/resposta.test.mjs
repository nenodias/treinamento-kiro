import { describe, it, expect } from 'vitest';
import { resposta, sucesso, erro } from '../../src/utils/resposta.mjs';

describe('resposta', () => {
  it('deve retornar objeto com statusCode, headers e body JSON', () => {
    const resultado = resposta(200, { mensagem: 'ok' });

    expect(resultado.statusCode).toBe(200);
    expect(resultado.headers['Content-Type']).toBe('application/json');
    expect(resultado.headers['Access-Control-Allow-Origin']).toBe('*');
    expect(JSON.parse(resultado.body)).toEqual({ mensagem: 'ok' });
  });

  it('deve serializar body corretamente para diferentes status codes', () => {
    const resultado = resposta(404, { erro: 'não encontrado' });

    expect(resultado.statusCode).toBe(404);
    expect(JSON.parse(resultado.body)).toEqual({ erro: 'não encontrado' });
  });

  it('deve lidar com body vazio', () => {
    const resultado = resposta(204, null);

    expect(resultado.statusCode).toBe(204);
    expect(JSON.parse(resultado.body)).toBeNull();
  });
});

describe('sucesso', () => {
  it('deve retornar resposta de sucesso com dados e mensagem padrão', () => {
    const dados = { id: '123', nome: 'Teste' };
    const resultado = sucesso(dados);
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(200);
    expect(body.sucesso).toBe(true);
    expect(body.dados).toEqual(dados);
    expect(body.mensagem).toBe('Operação realizada com sucesso');
  });

  it('deve retornar resposta de sucesso com mensagem customizada', () => {
    const dados = { id: '456' };
    const resultado = sucesso(dados, 'Usuário criado');
    const body = JSON.parse(resultado.body);

    expect(body.mensagem).toBe('Usuário criado');
    expect(body.dados).toEqual(dados);
  });

  it('deve funcionar com dados nulos', () => {
    const resultado = sucesso(null);
    const body = JSON.parse(resultado.body);

    expect(body.sucesso).toBe(true);
    expect(body.dados).toBeNull();
  });
});

describe('erro', () => {
  it('deve retornar resposta de erro com statusCode e mensagem', () => {
    const resultado = erro(400, 'Campo obrigatório');
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(400);
    expect(body.sucesso).toBe(false);
    expect(body.dados).toBeNull();
    expect(body.mensagem).toBe('Campo obrigatório');
  });

  it('deve retornar erro 500 para erros internos', () => {
    const resultado = erro(500, 'Erro interno');
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(500);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Erro interno');
  });

  it('deve retornar erro 409 para conflitos', () => {
    const resultado = erro(409, 'Email já cadastrado');
    const body = JSON.parse(resultado.body);

    expect(resultado.statusCode).toBe(409);
    expect(body.mensagem).toBe('Email já cadastrado');
  });
});
