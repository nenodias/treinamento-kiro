# 01 — O que é o Kiro CLI

## 💡 Em uma frase

> "É um assistente de IA que mora no seu terminal — completa comandos, responde perguntas e executa tarefas por você."

---

## O que ele faz?

Três coisas principais:

- 🔤 **Autocomplete** — sugere comandos enquanto você digita (git, docker, aws...)
- 💬 **Chat** — conversa com IA que lê, edita e executa no seu projeto
- 🔄 **Translate** — você descreve o que quer, ele te dá o comando pronto

---

## De onde veio?

Era o **Amazon Q Developer CLI**. Em novembro de 2025, virou **Kiro CLI** — mesma base, mais funcionalidades.

---

## CLI vs IDE — qual a diferença?

| | Kiro CLI | Kiro IDE |
|--|----------|----------|
| Onde roda | No terminal | Editor visual (VS Code-based) |
| Bom pra quem | Vive no terminal, usa SSH | Prefere interface gráfica |
| Funciona remoto | Sim | Não |

👉 **Não são excludentes.** Muita gente usa os dois.

---

## Como instalar

**Windows** (PowerShell no Windows Terminal):

```powershell
irm 'https://cli.kiro.dev/install.ps1' | iex
```

**Mac**:

```bash
curl -fsSL https://cli.kiro.dev/install | bash
```

**Linux**:

```bash
wget https://desktop-release.q.us-east-1.amazonaws.com/latest/kiro-cli.deb
sudo dpkg -i kiro-cli.deb
```

⚠️ Windows precisa ser **11** e rodar no **Windows Terminal** (não no cmd antigo).

---

## Como logar

```bash
kiro-cli login
```

Abre o navegador. Você pode usar:
- **Builder ID** (gratuito)
- **Google / GitHub** (social login)
- **Identity Center** (corporativo)

---

## Como saber se tá tudo certo

```bash
kiro-cli --version     # mostra a versão
kiro-cli whoami        # mostra quem tá logado
kiro-cli doctor        # roda diagnóstico
```

Se o `doctor` mostrar ✔️ — tá pronto pra usar.

---

➡️ Próximo: [02 — Autocomplete e Translate](02-autocomplete-e-translate.md)
