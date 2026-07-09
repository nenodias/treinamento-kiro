# 💡 Módulo 03 — Exemplos Práticos e Casos de Uso

> ⏱️ Tempo estimado: ~5 minutos

---

## Exemplo 1: Scanner de Segurança (Agent Stop)

**Objetivo**: Depois que o agente terminar de gerar código, verificar se não há credenciais ou dados sensíveis.

```json
{
  "name": "Security Scanner",
  "version": "1.0.0",
  "description": "Verifica segurança após o agente gerar código",
  "when": {
    "type": "agentStop"
  },
  "then": {
    "type": "askAgent",
    "prompt": "Revise os arquivos alterados buscando: 1) API keys ou tokens hardcoded 2) Credenciais de banco 3) Chaves privadas 4) URLs internas expostas. Se encontrar, sugira alternativas seguras usando variáveis de ambiente."
  }
}
```

**Quando usar**: projetos que lidam com dados sensíveis, compliance, equipes grandes.

---

## Exemplo 2: Lint Automático ao Salvar (File Save)

**Objetivo**: Manter a consistência do código rodando o linter toda vez que um arquivo é salvo.

```json
{
  "name": "Lint on Save",
  "version": "1.0.0",
  "description": "Roda ESLint ao salvar arquivos TypeScript",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.tsx"]
  },
  "then": {
    "type": "runCommand",
    "command": "npx eslint --fix"
  }
}
```

**Quando usar**: qualquer projeto com linter configurado.

---

## Exemplo 3: Gerar Testes para Arquivos Novos (File Create)

**Objetivo**: Quando um novo arquivo de código é criado, gerar automaticamente o arquivo de teste correspondente.

```json
{
  "name": "Gerar Testes",
  "version": "1.0.0",
  "description": "Gera arquivo de teste ao criar novo componente",
  "when": {
    "type": "fileCreated",
    "patterns": ["src/components/**/*.tsx"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Um novo componente foi criado. Gere um arquivo de teste unitário correspondente usando Jest e React Testing Library. Inclua testes para renderização básica e as props principais."
  }
}
```

**Quando usar**: projetos que exigem cobertura de testes alta.

---

## Exemplo 4: Internacionalização (File Save)

**Objetivo**: Manter arquivos de tradução sincronizados quando o idioma principal é alterado.

```json
{
  "name": "Sync i18n",
  "version": "1.0.0",
  "description": "Sincroniza traduções ao editar locale principal",
  "when": {
    "type": "fileEdited",
    "patterns": ["src/locales/pt-BR/*.json"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "O arquivo de locale pt-BR foi alterado. Identifique as chaves adicionadas ou modificadas e atualize os outros arquivos de idioma (en, es) marcando como NEEDS_TRANSLATION."
  }
}
```

**Quando usar**: apps multi-idioma.

---

## Exemplo 5: Validar Operações de Escrita (Pre Tool Use)

**Objetivo**: Antes de qualquer escrita de arquivo, verificar se segue os padrões do projeto.

```json
{
  "name": "Validar Escrita",
  "version": "1.0.0",
  "description": "Valida padrões antes de escrever arquivos",
  "when": {
    "type": "preToolUse",
    "toolTypes": ["write"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Antes de escrever, verifique: 1) Segue o padrão de nomenclatura do projeto? 2) Imports estão organizados? 3) Não há código duplicado? Se houver problemas, corrija antes de salvar."
  }
}
```

**Quando usar**: projetos com padrões rígidos de código.

---

## Exemplo 6: Rodar Testes após Task (Post Task Execution)

**Objetivo**: Garantir que testes passam depois de cada task de uma spec ser completada.

```json
{
  "name": "Testes pós-Task",
  "version": "1.0.0",
  "description": "Roda testes após completar task de spec",
  "when": {
    "type": "postTaskExecution"
  },
  "then": {
    "type": "runCommand",
    "command": "npm test"
  }
}
```

**Quando usar**: desenvolvimento guiado por specs.

---

## Resumo: Qual hook usar em cada situação?

| Situação | Trigger | Ação |
|----------|---------|------|
| Manter código limpo | File Save | Run Command (lint) |
| Prevenir leaks de segurança | Agent Stop | Ask Kiro |
| Gerar boilerplate | File Create | Ask Kiro |
| Bloquear operações perigosas | Pre Tool Use | Run Command |
| Validar resultado de tasks | Post Task Execution | Run Command |
| Code review on-demand | Manual Trigger | Ask Kiro |
| Adicionar contexto ao prompt | Prompt Submit | Ask Kiro |

---

> 📌 **Próximo**: [Módulo 04 — Demonstração ao vivo](04-demo-ao-vivo.md)
