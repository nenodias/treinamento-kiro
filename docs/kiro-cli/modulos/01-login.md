# 1. Login e Autenticação

## Primeiro uso

Na primeira execução, o Kiro CLI abre o navegador para autenticação.

```bash
cd my-project
kiro-cli
```

O navegador abre automaticamente para login via:
- **Builder ID** (conta gratuita AWS)
- **Social login** (Google, GitHub, etc.)
- **IAM Identity Center** (empresas com SSO)

---

## Fluxo de Login

```
Terminal → kiro-cli → Abre navegador → Login → Token salvo localmente
```

Após autenticar, o token é persistido e você não precisa logar novamente (a menos que expire).

---

## Verificando a autenticação

Se o login foi bem-sucedido, o CLI inicia diretamente no modo chat interativo:

```bash
$ kiro-cli
✓ Authenticated
> _
```

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Navegador não abre | Copie a URL exibida no terminal manualmente |
| Token expirado | Execute `kiro-cli` novamente — novo login é solicitado |
| Rede corporativa com proxy | Configure `HTTP_PROXY` / `HTTPS_PROXY` no ambiente |

---

## Demo ao Vivo

1. Abrir terminal
2. Executar `kiro-cli`
3. Completar login no navegador
4. Mostrar que o prompt interativo ficou ativo

---

> Após o login, seguimos para configuração de modelo e effort.
