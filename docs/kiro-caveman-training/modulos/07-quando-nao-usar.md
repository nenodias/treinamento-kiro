# Módulo 7: Quando NÃO Usar CAVEMAN

---

## Auto-Clarity: CAVEMAN se desativa sozinho

CAVEMAN tem um mecanismo built-in chamado **Auto-Clarity**. Ele volta automaticamente ao modo normal quando:

1. **Avisos de segurança** — quando a ação envolve risco
2. **Confirmações de ações irreversíveis** — delete de dados, drop de tabelas
3. **Sequências multi-step ambíguas** — quando fragmentos podem ser mal-interpretados
4. **Compressão criaria ambiguidade técnica** — quando a ordem importa

### Exemplo: Ação Destrutiva

```
> ⚠️ Warning: This will permanently delete all rows in the `users` table 
> and cannot be undone.
> 
> ```sql
> DROP TABLE users;
> ```
> 
> Verify backup exist before proceeding. Type 'confirm' to execute.

[CAVEMAN retoma após a parte crítica]
```

---

## Cenários onde Desativar Manualmente

### 1. Documentação Pública

Se está gerando README, docs de API, ou guias que outros desenvolvedores vão ler:

```
stop caveman

Prompt: "Escreve a documentação de uso da nossa API de autenticação"
```

*Documentação precisa ser clara, completa, e acessível para qualquer leitor.*

### 2. Onboarding de Novos Devs

Quando alguém novo precisa de explicações contextuais:

```
stop caveman

Prompt: "Explica como nossa arquitetura de microsserviços funciona 
para um dev que está entrando no time"
```

### 3. Apresentações e Material de Treinamento

Irônico? Sim. Este próprio treinamento foi escrito sem CAVEMAN para ser claro para todos.

### 4. Comunicação com Stakeholders Não-Técnicos

Product managers, designers, executivos precisam de contexto e clareza:

```
stop caveman

Prompt: "Escreve um resumo executivo das mudanças de infra do trimestre"
```

### 5. Quando Você Está Confuso

Se uma resposta CAVEMAN não ficou clara:

```
Prompt: "Pode explicar isso melhor? Não entendi."
```

CAVEMAN automaticamente desativa para clarificar.

---

## Resumo Visual

```
USE CAVEMAN ✅                      NÃO USE CAVEMAN ❌
──────────────────                  ──────────────────
• Seu dev diário                    • Docs públicos
• Debugging                         • Onboarding
• Code review interno               • Comunicação com PM
• Sessões longas                    • Material de treinamento
• Scripts/automação CLI             • Quando está confuso
• Investigação de bugs              • Comunicação assíncrona
• Prototipagem rápida               • Relatórios executivos
```

---

## Como Reativar

```
/caveman          → volta ao full
/caveman ultra    → volta ao ultra
```

CAVEMAN persiste pela sessão inteira até ser desativado explicitamente com "stop caveman" ou "normal mode".
