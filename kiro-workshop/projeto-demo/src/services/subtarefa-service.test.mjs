import { describe, it, expect, beforeEach } from 'vitest';
import {
  criarSubtarefa,
  listarSubtarefas,
  buscarSubtarefaPorId,
  concluirSubtarefa,
  removerSubtarefa,
  resetarSubtarefas,
  ValidacaoError,
  SubtarefaNaoEncontradaError,
  SubtarefaJaConcluidaError
} from './subtarefa-service.ts';

describe('subtarefa-service', () => {
  beforeEach(() => {
    resetarSubtarefas();
  });

  // --- criarSubtarefa ---

  describe('criarSubtarefa', () => {
    it('deve criar subtarefa com dados válidos', async () => {
      const resultado = await criarSubtarefa({
        tarefaPaiId: 'tarefa-123',
        titulo: 'Minha subtarefa',
        descricao: 'Uma descrição'
      });

      expect(resultado.id).toBeDefined();
      expect(resultado.tarefaPaiId).toBe('tarefa-123');
      expect(resultado.titulo).toBe('Minha subtarefa');
      expect(resultado.descricao).toBe('Uma descrição');
      expect(resultado.status).toBe('pendente');
      expect(resultado.criadoEm).toBeDefined();
      expect(resultado.concluidoEm).toBeUndefined();
    });

    it('deve criar subtarefa sem descrição', async () => {
      const resultado = await criarSubtarefa({
        tarefaPaiId: 'tarefa-123',
        titulo: 'Subtarefa simples'
      });

      expect(resultado.descricao).toBe('');
    });

    it('deve fazer trim nos campos de texto', async () => {
      const resultado = await criarSubtarefa({
        tarefaPaiId: '  tarefa-123  ',
        titulo: '  Titulo com espaços  ',
        descricao: '  Descricao com espaços  '
      });

      expect(resultado.tarefaPaiId).toBe('tarefa-123');
      expect(resultado.titulo).toBe('Titulo com espaços');
      expect(resultado.descricao).toBe('Descricao com espaços');
    });

    it('deve lançar ValidacaoError quando tarefaPaiId não é informado', async () => {
      await expect(
        criarSubtarefa({ tarefaPaiId: '', titulo: 'Subtarefa' })
      ).rejects.toThrow(ValidacaoError);

      await expect(
        criarSubtarefa({ tarefaPaiId: '', titulo: 'Subtarefa' })
      ).rejects.toThrow('Campo tarefaPaiId é obrigatório');
    });

    it('deve lançar ValidacaoError quando tarefaPaiId é apenas espaços', async () => {
      await expect(
        criarSubtarefa({ tarefaPaiId: '   ', titulo: 'Subtarefa' })
      ).rejects.toThrow(ValidacaoError);
    });

    it('deve lançar ValidacaoError quando titulo não é informado', async () => {
      await expect(
        criarSubtarefa({ tarefaPaiId: 'tarefa-123', titulo: '' })
      ).rejects.toThrow(ValidacaoError);

      await expect(
        criarSubtarefa({ tarefaPaiId: 'tarefa-123', titulo: '' })
      ).rejects.toThrow('Campo titulo é obrigatório');
    });

    it('deve lançar ValidacaoError quando titulo é apenas espaços', async () => {
      await expect(
        criarSubtarefa({ tarefaPaiId: 'tarefa-123', titulo: '   ' })
      ).rejects.toThrow(ValidacaoError);
    });

    it('deve lançar ValidacaoError quando dados são null', async () => {
      await expect(
        criarSubtarefa(null)
      ).rejects.toThrow(ValidacaoError);
    });

    it('deve lançar ValidacaoError quando dados são undefined', async () => {
      await expect(
        criarSubtarefa(undefined)
      ).rejects.toThrow(ValidacaoError);
    });

    it('deve gerar IDs únicos para cada subtarefa', async () => {
      const sub1 = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 1' });
      const sub2 = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 2' });

      expect(sub1.id).not.toBe(sub2.id);
    });
  });

  // --- listarSubtarefas ---

  describe('listarSubtarefas', () => {
    it('deve retornar array vazio quando não há subtarefas', async () => {
      const resultado = await listarSubtarefas('tarefa-inexistente');

      expect(resultado).toEqual([]);
    });

    it('deve listar apenas subtarefas da tarefa pai informada', async () => {
      await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub A' });
      await criarSubtarefa({ tarefaPaiId: 'tarefa-2', titulo: 'Sub B' });
      await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub C' });

      const resultado = await listarSubtarefas('tarefa-1');

      expect(resultado).toHaveLength(2);
      expect(resultado[0].titulo).toBe('Sub A');
      expect(resultado[1].titulo).toBe('Sub C');
    });

    it('deve retornar todas as subtarefas de uma tarefa pai', async () => {
      await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 1' });
      await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 2' });
      await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 3' });

      const resultado = await listarSubtarefas('tarefa-1');

      expect(resultado).toHaveLength(3);
    });
  });

  // --- buscarSubtarefaPorId ---

  describe('buscarSubtarefaPorId', () => {
    it('deve retornar a subtarefa quando encontrada', async () => {
      const criada = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Buscar esta' });

      const resultado = await buscarSubtarefaPorId(criada.id);

      expect(resultado).not.toBeNull();
      expect(resultado.id).toBe(criada.id);
      expect(resultado.titulo).toBe('Buscar esta');
    });

    it('deve retornar null quando subtarefa não existe', async () => {
      const resultado = await buscarSubtarefaPorId('id-inexistente');

      expect(resultado).toBeNull();
    });
  });

  // --- concluirSubtarefa ---

  describe('concluirSubtarefa', () => {
    it('deve marcar subtarefa como concluída', async () => {
      const criada = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Concluir esta' });

      const resultado = await concluirSubtarefa(criada.id);

      expect(resultado.status).toBe('concluida');
      expect(resultado.concluidoEm).toBeDefined();
    });

    it('deve lançar SubtarefaNaoEncontradaError quando ID não existe', async () => {
      await expect(
        concluirSubtarefa('id-inexistente')
      ).rejects.toThrow(SubtarefaNaoEncontradaError);

      await expect(
        concluirSubtarefa('id-inexistente')
      ).rejects.toThrow('Subtarefa não encontrada: id-inexistente');
    });

    it('deve lançar SubtarefaJaConcluidaError quando subtarefa já foi concluída', async () => {
      const criada = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Dupla conclusão' });
      await concluirSubtarefa(criada.id);

      await expect(
        concluirSubtarefa(criada.id)
      ).rejects.toThrow(SubtarefaJaConcluidaError);

      await expect(
        concluirSubtarefa(criada.id)
      ).rejects.toThrow('Subtarefa já está concluída');
    });

    it('deve manter os dados originais após conclusão', async () => {
      const criada = await criarSubtarefa({
        tarefaPaiId: 'tarefa-1',
        titulo: 'Manter dados',
        descricao: 'Descrição original'
      });

      const resultado = await concluirSubtarefa(criada.id);

      expect(resultado.tarefaPaiId).toBe('tarefa-1');
      expect(resultado.titulo).toBe('Manter dados');
      expect(resultado.descricao).toBe('Descrição original');
      expect(resultado.criadoEm).toBe(criada.criadoEm);
    });
  });

  // --- removerSubtarefa ---

  describe('removerSubtarefa', () => {
    it('deve remover subtarefa existente e retornar true', async () => {
      const criada = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Remover esta' });

      const resultado = await removerSubtarefa(criada.id);

      expect(resultado).toBe(true);

      const busca = await buscarSubtarefaPorId(criada.id);
      expect(busca).toBeNull();
    });

    it('deve retornar false quando subtarefa não existe', async () => {
      const resultado = await removerSubtarefa('id-inexistente');

      expect(resultado).toBe(false);
    });

    it('deve remover apenas a subtarefa especificada', async () => {
      const sub1 = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 1' });
      const sub2 = await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 2' });

      await removerSubtarefa(sub1.id);

      const lista = await listarSubtarefas('tarefa-1');
      expect(lista).toHaveLength(1);
      expect(lista[0].id).toBe(sub2.id);
    });
  });

  // --- resetarSubtarefas ---

  describe('resetarSubtarefas', () => {
    it('deve limpar todas as subtarefas', async () => {
      await criarSubtarefa({ tarefaPaiId: 'tarefa-1', titulo: 'Sub 1' });
      await criarSubtarefa({ tarefaPaiId: 'tarefa-2', titulo: 'Sub 2' });

      resetarSubtarefas();

      const lista1 = await listarSubtarefas('tarefa-1');
      const lista2 = await listarSubtarefas('tarefa-2');
      expect(lista1).toHaveLength(0);
      expect(lista2).toHaveLength(0);
    });
  });
});
