# Módulo 03 — Demonstração ao Vivo

## Objetivo

Mostrar o fluxo completo do Spec Driven ao vivo: da ideia ao código implementado.

## Feature para a demo

**"Criar um endpoint de busca de produtos com filtros e paginação"**

Essa feature é boa para demo porque:
- É familiar para todos (CRUD)
- Tem complexidade suficiente para justificar o Spec
- Gera múltiplos arquivos

## Roteiro da demonstração

### Passo 1: Iniciar a Spec (~2 min)

1. Abra o Kiro
2. Inicie uma nova sessão **Spec**
3. Digite o prompt:

```
Criar um endpoint GET /products que suporte:
- Filtro por categoria, preço mínimo e máximo
- Paginação com limit e offset
- Ordenação por nome ou preço
- Retorno com metadata de paginação (total, page, hasNext)
```

4. Mostre o Kiro gerando os requisitos

### Passo 2: Revisar Requirements

1. Mostre o `requirements.md` gerado
2. Aponte os critérios de aceitação
3. Peça um ajuste ao vivo: "Adicione um requisito de cache com TTL de 5 minutos"
4. Mostre o Kiro atualizando
5. Aprove os requisitos

### Passo 3: Revisar Design

1. Mostre o `design.md` gerado
2. Destaque:
   - Estrutura da API (query params, response shape)
   - Modelo de dados
   - Decisões técnicas (ex: validação de params)
3. Aprove o design

### Passo 4: Revisar Tasks

1. Mostre o `tasks.md` com a lista de tarefas
2. Comente: "Cada tarefa é atômica — se uma falhar, as outras não são afetadas"
3. Aprove as tarefas

### Passo 5: Implementação

1. Deixe o Kiro executar as tarefas
2. Mostre em tempo real:
   - Arquivos sendo criados/editados
   - Tarefas sendo marcadas como concluídas ✅
   - O código gerado seguindo o design aprovado
3. Pause em uma tarefa e mostre que você pode intervir

## Pontos para destacar durante a demo

- 📋 "Olha como os requisitos ficam documentados — qualquer pessoa do time entende o que foi pedido"
- 🏗️ "O design foi aprovado ANTES de escrever código — sem surpresas"
- ✅ "Cada tarefa é rastreável — sei exatamente o que foi feito e por quê"
- 🔄 "Se eu não gostar de algo, volto na etapa anterior e ajusto"
- 📁 "Tudo fica em `.kiro/specs/` — posso commitar e o time pode revisar"

## Comparação ao vivo: Vibe vs Spec

Se sobrar tempo, mostre a mesma feature no modo Vibe:
- Resultado menos previsível
- Sem documentação
- Difícil de saber se atendeu todos os requisitos

## Perguntas para o grupo

1. **"Em que features do dia-a-dia vocês usariam Spec?"**
2. **"Vocês revisariam as specs em PR antes da implementação?"**
3. **"Qual etapa vocês acham mais valiosa: requisitos, design ou tarefas?"**

## Checklist pós-treinamento

Após o treinamento, cada participante deve:

- [ ] Saber a diferença entre sessão Vibe e Spec
- [ ] Entender o fluxo: Requisitos → Design → Tarefas → Código
- [ ] Saber quando usar Spec vs Vibe
- [ ] Conhecer a pasta `.kiro/specs/` e seus artefatos
- [ ] Estar confortável para criar sua primeira Spec

---

> 🎯 **Objetivo final**: Que o time use Spec Driven para features complexas, garantindo previsibilidade, rastreabilidade e qualidade no código gerado por IA.
