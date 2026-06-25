---
inclusion: manual
---

# Guia de Deploy

## Ambientes

| Ambiente | URL | Trigger |
|----------|-----|---------|
| Local | http://localhost:3000 | `npm run dev` |
| Dev | https://tarefas-dev.exemplo.com | Push na branch main |
| Staging | https://tarefas-stg.exemplo.com | Tag com prefixo `rc-` |
| Produção | https://tarefas.exemplo.com | Tag com prefixo `v` + aprovação |

## Checklist pré-deploy

- [ ] Todos os testes passando (`npm test`)
- [ ] Lint sem erros (`npm run lint`)
- [ ] CHANGELOG.md atualizado
- [ ] PR aprovado por pelo menos 1 reviewer
- [ ] Sem vulnerabilidades críticas (`npm audit`)

## Deploy para produção

1. Garantir que staging está estável (mínimo 24h sem incidentes)
2. Criar tag: `git tag v1.x.x -m "Release: descrição breve"`
3. Push da tag: `git push origin v1.x.x`
4. Pipeline inicia automaticamente (GitHub Actions)
5. Aprovar deploy no canal #releases do Slack
6. Monitorar dashboards por 30 minutos após deploy

## Rollback

- **Automático**: se health check falhar em 2 minutos, rollback automático
- **Manual**: `git revert` + novo deploy, ou re-deploy da tag anterior
