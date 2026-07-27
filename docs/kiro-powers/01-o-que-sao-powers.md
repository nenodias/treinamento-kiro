# ⚡ Módulo 01 — O que são Powers e por que usar

> ⏱️ Tempo estimado: ~5 minutos

---

## O Problema: Sobrecarga de Contexto

Agentes de IA enfrentam dois extremos ao lidar com ferramentas externas:

### 1. Sem contexto de framework → o agente adivinha

O agente consegue chamar APIs do Stripe, mas será que ele sabe usar chaves de idempotência? Ele consegue consultar o banco, mas entende connection pooling para serverless?

**Sem conhecimento especializado**, você precisa manualmente ler documentação e refinar abordagens até o output ficar correto.

### 2. Com contexto demais → o agente fica lento

Conecte 5 servidores MCP e o agente carrega **100+ definições de ferramentas** antes de escrever uma única linha de código.

```
5 servidores MCP → ~50.000+ tokens consumidos
                 → 40% da janela de contexto
                 → antes do seu primeiro prompt
```

Mais ferramentas deveriam significar melhores resultados, mas contexto desestruturado **sobrecarrega** o agente, resultando em respostas mais lentas e output de menor qualidade.

---

## A Solução: Kiro Powers

Powers resolvem ambos os problemas com **ativação dinâmica baseada em keywords**.

### Como funciona:

```
1. Você inicia uma tarefa
2. Kiro lê a descrição da tarefa
3. Kiro avalia os powers instalados contra a tarefa
4. Kiro carrega APENAS os powers relevantes no contexto
```

### Exemplo prático:

```
Você diz: "Vamos configurar o checkout com Stripe"
  → Kiro vê "checkout" e "Stripe" nas keywords
  → Ativa o Power do Stripe (MCP tools + documentação)

Você muda para: "Agora preciso configurar o banco"
  → Kiro desativa Stripe
  → Ativa o Power do Supabase (MCP tools + documentação)
```

---

## O que torna Powers diferente?

| Característica | Abordagem tradicional | Com Powers |
|---------------|----------------------|------------|
| Carregamento de tools | Todas de uma vez | Sob demanda |
| Contexto consumido | ~50k tokens fixos | Apenas o necessário |
| Instalação | JSON manual + CLI | Um clique |
| Ecossistema | Cada um por si | Curado + comunidade |
| Conhecimento | Só ferramentas | Ferramentas + boas práticas |

---

## Analogia

Pense nos Powers como **plugins inteligentes**:

- **Extensões de IDE tradicionais** → sempre carregadas, sempre consumindo memória
- **Kiro Powers** → carregam sob demanda, descarregam quando não são mais necessários

É como ter um especialista disponível que só entra na sala quando o assunto é relevante.

---

## Resumo

- Powers = pacotes inteligentes que combinam ferramentas + conhecimento
- Resolvem o problema de "sem contexto" e "contexto demais"
- Ativação dinâmica baseada em keywords da conversa
- Ecossistema aberto: parceiros curados + comunidade + seus próprios
- Instalação com um clique, sem configuração manual

---

> 📌 **Próximo**: [Módulo 02 — Anatomia de um Power](02-anatomia-de-um-power.md)
