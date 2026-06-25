import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './criar-tarefa.mjs';
import { ValidacaoError } from '../services/tarefa-service.mjs';

// Mock do service
vi.mock('../services/tarefa-service.mjs', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    criarTarefa: vi.fn()
  };
});

import { criarTarefa } from '../services/tarefa-service.mjs';

function criarEvento(body) {
  return { body: JSON.stringify(body) };
}

describe('criar-tarefa handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar tarefa com dados válidos', async () => {
    const tarefaMock = {
      id: '123',
      titulo: 'Minha tarefa',
      descricao: '',
      prioridade: 'media',
      status: 'pendente',
      criadoEm: '2024-01-01T00:00:00.000Z'
    };
    criarTarefa.mockResolvedValue(tarefaMock);

    const resultado = await handler(criarEvento({ titulo: 'Minha tarefa' }));

    expect(resultado.statusCode).toBe(200);
    const body = JSON.parse(resultado.body);
    expect(body.sucesso).toBe(true);
    expect(body.dados).toEqual(tarefaMock);
    expect(body.mensagem).toBe('Tarefa criada com sucesso');
    expect(criarTarefa).toHaveBeenCalledWith({
      titulo: 'Minha tarefa',
      descricao: undefined,
      prioridade: undefined
    });
  });

  it('deve criar tarefa com todos os campos opcionais', async () => {
    const tarefaMock = {
      id: '456',
      titulo: 'Tarefa completa',
      descricao: 'Uma descrição',
      prioridade: 'alta',
      status: 'pendente',
      criadoEm: '2024-01-01T00:00:00.000Z'
    };
    criarTarefa.mockResolvedValue(tarefaMock);

    const resultado = await handler(criarEvento({
      titulo: 'Tarefa completa',
      descricao: 'Uma descrição',
      prioridade: 'alta'
    }));

    expect(resultado.statusCode).toBe(200);
    expect(criarTarefa).toHaveBeenCalledWith({
      titulo: 'Tarefa completa',
      descricao: 'Uma descrição',
      prioridade: 'alta'
    });
  });

  it('deve retornar erro 400 quando titulo não é informado', async () => {
    criarTarefa.mockRejectedValue(
      new ValidacaoError('Campo titulo é obrigatório e deve ser uma string não vazia')
    );

    const resultado = await handler(criarEvento({}));

    expect(resultado.statusCode).toBe(400);
    const body = JSON.parse(resultado.body);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toContain('titulo');
  });

  it('deve retornar erro 400 quando prioridade é inválida', async () => {
    criarTarefa.mockRejectedValue(
      new ValidacaoError('Prioridade inválida: "urgente". Valores aceitos: baixa, media, alta')
    );

    const resultado = await handler(criarEvento({
      titulo: 'Tarefa',
      prioridade: 'urgente'
    }));

    expect(resultado.statusCode).toBe(400);
    const body = JSON.parse(resultado.body);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toContain('Prioridade');
  });

  it('deve aceitar prioridade baixa', async () => {
    criarTarefa.mockResolvedValue({ id: '1', titulo: 'T', prioridade: 'baixa' });

    const resultado = await handler(criarEvento({ titulo: 'T', prioridade: 'baixa' }));

    expect(resultado.statusCode).toBe(200);
  });

  it('deve aceitar prioridade media', async () => {
    criarTarefa.mockResolvedValue({ id: '2', titulo: 'T', prioridade: 'media' });

    const resultado = await handler(criarEvento({ titulo: 'T', prioridade: 'media' }));

    expect(resultado.statusCode).toBe(200);
  });

  it('deve aceitar prioridade alta', async () => {
    criarTarefa.mockResolvedValue({ id: '3', titulo: 'T', prioridade: 'alta' });

    const resultado = await handler(criarEvento({ titulo: 'T', prioridade: 'alta' }));

    expect(resultado.statusCode).toBe(200);
  });

  it('deve retornar erro 500 quando o service lança exceção', async () => {
    criarTarefa.mockRejectedValue(new Error('Falha no banco'));

    const resultado = await handler(criarEvento({ titulo: 'Tarefa' }));

    expect(resultado.statusCode).toBe(500);
    const body = JSON.parse(resultado.body);
    expect(body.sucesso).toBe(false);
    expect(body.mensagem).toBe('Erro interno ao criar tarefa');
  });

  it('deve tratar body nulo no evento', async () => {
    criarTarefa.mockRejectedValue(
      new ValidacaoError('Campo titulo é obrigatório e deve ser uma string não vazia')
    );

    const resultado = await handler({ body: null });

    expect(resultado.statusCode).toBe(400);
    const body = JSON.parse(resultado.body);
    expect(body.mensagem).toContain('titulo');
  });

  it('deve tratar body ausente no evento', async () => {
    criarTarefa.mockRejectedValue(
      new ValidacaoError('Campo titulo é obrigatório e deve ser uma string não vazia')
    );

    const resultado = await handler({});

    expect(resultado.statusCode).toBe(400);
    const body = JSON.parse(resultado.body);
    expect(body.mensagem).toContain('titulo');
  });

  it('deve retornar headers CORS na resposta de sucesso', async () => {
    criarTarefa.mockResolvedValue({ id: '1', titulo: 'T' });

    const resultado = await handler(criarEvento({ titulo: 'T' }));

    expect(resultado.headers['Content-Type']).toBe('application/json');
    expect(resultado.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('deve retornar headers CORS na resposta de erro', async () => {
    criarTarefa.mockRejectedValue(
      new ValidacaoError('Campo titulo é obrigatório e deve ser uma string não vazia')
    );

    const resultado = await handler(criarEvento({}));

    expect(resultado.headers['Content-Type']).toBe('application/json');
    expect(resultado.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('deve ignorar campos extras no body', async () => {
    criarTarefa.mockResolvedValue({ id: '1', titulo: 'T' });

    await handler(criarEvento({
      titulo: 'T',
      campoExtra: 'ignorado',
      outro: 123
    }));

    expect(criarTarefa).toHaveBeenCalledWith({
      titulo: 'T',
      descricao: undefined,
      prioridade: undefined
    });
  });

  it('deve rejeitar titulo vazio (string vazia)', async () => {
    criarTarefa.mockRejectedValue(
      new ValidacaoError('Campo titulo é obrigatório e deve ser uma string não vazia')
    );

    const resultado = await handler(criarEvento({ titulo: '' }));

    expect(resultado.statusCode).toBe(400);
    const body = JSON.parse(resultado.body);
    expect(body.mensagem).toContain('titulo');
  });

  it('deve retornar dados nulos no body de erro', async () => {
    criarTarefa.mockRejectedValue(
      new ValidacaoError('Campo titulo é obrigatório e deve ser uma string não vazia')
    );

    const resultado = await handler(criarEvento({}));

    const body = JSON.parse(resultado.body);
    expect(body.dados).toBeNull();
  });
});
