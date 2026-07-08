# 02 — Autocomplete e Translate

## 💡 Em uma frase

> "Nunca mais googlar flags. O Kiro completa comandos enquanto você digita e traduz português pra shell."

---

## Autocomplete — o menu que aparece sozinho

Quando você digita um comando, aparece um dropdown com as opções:

```
$ git checkout ma█
                  ┌──────────────┐
                  │ main         │  ← use setas
                  │ master       │
                  │ main-feature │  ← Tab pra aceitar
                  └──────────────┘
```

Funciona com: **git**, **docker**, **aws**, **npm**, **kubectl**, **terraform**, **pip**, **ssh** e centenas mais.

Não precisa configurar nada — já vem ativo na instalação.

---

## Ghost Text — a sugestão cinza

Além do dropdown, aparece um texto cinza prevendo o que você vai digitar:

```
$ find . -name "*.log" -mtime +30 -delete
                       ^^^^^^^^^^^^^^^^^ isso é ghost text
```

Aperte **→** ou **Tab** pra aceitar. Continue digitando pra ignorar.

---

## Translate — fala o que quer, recebe o comando

Esse é o que mais impressiona na demo:

```bash
kiro-cli translate "listar arquivos modificados nos últimos 7 dias"
# → find . -mtime -7 -type f

kiro-cli translate "parar todos os containers docker"
# → docker stop $(docker ps -q)

kiro-cli translate "ver commits do último mês do autor João"
# → git log --since="1 month ago" --author="João"

kiro-cli translate "listar funções Lambda na us-east-1"
# → aws lambda list-functions --region us-east-1
```

Quer mais de uma opção? Use `-n`:

```bash
kiro-cli translate -n 3 "buscar texto em arquivos"
# Mostra 3 alternativas diferentes
```

---

## Antes vs Depois

| Antes | Depois |
|-------|--------|
| Abrir Google, buscar flag, copiar | `kiro-cli translate "o que quero"` |
| `docker run --help` e ler tudo | Digitar `--mem` → autocomplete |
| Não lembrar nome da branch | Digitar `git checkout fea` → Tab |

---

➡️ Próximo: [03 — Chat Agêntico](03-chat-agentico.md)
