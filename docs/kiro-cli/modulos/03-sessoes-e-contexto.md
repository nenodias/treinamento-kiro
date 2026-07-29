# 3. Sessões e Contexto

## Retomando Sessões

O Kiro CLI mantém histórico de conversas. Você pode retomar sessões anteriores:

### Resume da sessão mais recente

```bash
kiro-cli chat --resume
```

### Picker interativo para escolher sessão

```bash
kiro-cli chat --resume-picker
```

O picker mostra as sessões anteriores com timestamp e preview do que foi discutido.

---

## Nova Sessão

Para iniciar uma conversa limpa sem sair do CLI:

```bash
> /chat new
```

---

## Save e Load de Conversas

### Salvar conversa atual em arquivo

```bash
> /chat save ./teste.txt
```

Exporta o histórico da conversa para um arquivo de texto — útil para documentação ou compartilhamento.

### Carregar conversa de arquivo

```bash
> /chat load ./teste.txt
```

Restaura o contexto de uma conversa previamente salva.

---

## `/context` e `@file` — Adicionando Contexto

### Referenciando arquivos no chat

Use `@file` para adicionar arquivos ao contexto da conversa:

```bash
> @src/services/productService.ts explique essa função de filtro
```

O Kiro lê o arquivo e usa como contexto para responder.

### Gerenciando contexto explicitamente

```bash
> /context add src/routes/products.ts    # Adiciona arquivo ao contexto
> /context remove src/routes/products.ts # Remove do contexto
> /context show                          # Lista arquivos no contexto atual
```

---

## Compactação de Histórico

Quando a conversa fica muito longa:

```bash
> /compact
```

Compacta o histórico mantendo informações essenciais, liberando espaço de contexto para novas interações.

---

## Resumo dos Comandos

| Comando | Descrição |
|---------|-----------|
| `kiro-cli chat --resume` | Retoma sessão mais recente |
| `kiro-cli chat --resume-picker` | Picker para escolher sessão |
| `/chat new` | Nova sessão limpa |
| `/chat save ./arquivo.txt` | Salva conversa em arquivo |
| `/chat load ./arquivo.txt` | Carrega conversa de arquivo |
| `@file` | Referencia arquivo no prompt |
| `/context add/remove/show` | Gerencia arquivos de contexto |
| `/compact` | Compacta histórico |

---

## Demo ao Vivo

1. Fazer uma pergunta sobre o projeto (ex: "liste os endpoints")
2. Usar `@src/routes/products.ts` para adicionar contexto
3. Salvar a conversa: `/chat save ./demo-sessao.txt`
4. Iniciar nova sessão: `/chat new`
5. Carregar a conversa salva: `/chat load ./demo-sessao.txt`
6. Mostrar o `--resume-picker` saindo e voltando

---

> Próximo: usando o Plan Agent para planejar implementações.
