---
inclusion: manual
---

# Guia de Commit

Antes de realizar um commit, siga estas boas práticas:

## 1. Verificar a branch atual

- **Nunca commitar diretamente na branch `develop` ou `main`.**
- Confirme que está em uma feature branch antes de prosseguir:
  ```bash
  git branch --show-current
  ```
- **Se estiver na `develop` ou `main`, ABORTE o processo imediatamente.** Informe o usuário que ele está na branch errada e não prossiga com o commit.

## 2. Sincronizar com o upstream

- Se a branch já existe no remote (upstream), garanta que está atualizada localmente antes de commitar:
  ```bash
  git fetch origin
  git pull origin <nome-da-branch>
  ```
- Isso evita conflitos desnecessários e garante que o histórico esteja alinhado com o time.

## 3. Mensagem de commit clara

- A mensagem deve explicar **o que** foi alterado e **por quê**.
- Use o formato:
  ```
  tipo(escopo): descrição curta

  Corpo opcional explicando o contexto ou motivação da mudança.
  ```
- Tipos comuns: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`.
- Exemplos:
  - `feat(auth): adiciona validação de token expirado`
  - `fix(api): corrige timeout na chamada de pagamento`
  - `docs(readme): atualiza instruções de setup local`

## 4. Checklist antes do commit

1. Não estou na `develop` nem na `main`.
2. Minha branch está atualizada com o upstream (se existir remotamente).
3. A mensagem de commit é descritiva e segue o padrão convencional.
4. Apenas arquivos relevantes estão staged (`git status` para confirmar).
