# 05 — Limitações, Dicas e Referências

## ⚠️ O que NÃO funciona (ou tem ressalva)

| Limitação | O que isso significa |
|-----------|---------------------|
| Precisa de internet | Tudo roda na nuvem AWS |
| Só Windows 11 | Windows 10 não rola |
| Conversa longa perde contexto | Use `/compact` pra resumir |
| Pode errar | Sempre revise antes de executar |
| Não substitui a IDE | Sem debug visual, sem refactoring gráfico |
| Dados vão pra nuvem | Nunca cole senhas ou tokens no chat |
| Free tier tem limite | Uso mensal limitado no plano gratuito |

---

## ✅ Boas práticas — o que falar pro time

1. **Sempre revise** o que a IA gera antes de rodar
2. **Dê contexto** — `/context add` melhora muito as respostas
3. **Seja específico** — "Crie um endpoint de listagem com paginação" > "Crie um endpoint"
4. **Versione `.kiro/`** — steering e agents no Git beneficiam todo mundo
5. **Nunca cole credenciais** no chat
6. **Use `--resume`** — retome conversas ao invés de repetir tudo

---

## 🗺️ Quando usar o quê

| Situação | Funcionalidade |
|----------|----------------|
| Esqueci uma flag | `kiro-cli translate` |
| Projeto novo, quero entender | Chat + `/context add` |
| Preciso gerar código | Chat agêntico |
| Quero automatizar | `--no-interactive` em scripts |
| Padrões do time | Steering |
| Trabalho em SSH | `kiro-cli` com device flow |

---

## 💰 Quanto custa (Maio/2026)

| Plano | Preço | O que tem |
|-------|-------|-----------|
| **Free** (Builder ID) | $0 | Autocomplete, translate, chat com limites |
| **Pro** (Identity Center) | $19/mês | Sem limites, modelos melhores, governança |

---

## 📚 Links pra se aprofundar

| O quê | Onde |
|-------|------|
| Documentação completa | [kiro.dev/docs/cli](https://kiro.dev/docs/cli/) |
| Instalação | [kiro.dev/docs/cli/installation](https://kiro.dev/docs/cli/installation/) |
| Custom Agents | [kiro.dev/docs/cli/custom-agents](https://kiro.dev/docs/cli/custom-agents/) |
| Steering | [kiro.dev/docs/cli/steering](https://kiro.dev/docs/cli/steering/) |
| Todos os comandos | [kiro.dev/docs/cli/reference/slash-commands](https://kiro.dev/docs/cli/reference/slash-commands/) |
| Migração do Q Developer | [kiro.dev/docs/cli/migrating-from-q](https://kiro.dev/docs/cli/migrating-from-q/) |
| Reportar bug / sugerir | [github.com/kirodotdev/Kiro](https://github.com/kirodotdev/Kiro) |
| Comunidade | [kiro.dev/discord](https://kiro.dev/discord/) |

---

🎉 **Fim!** → [Voltar ao README](../README.md)
