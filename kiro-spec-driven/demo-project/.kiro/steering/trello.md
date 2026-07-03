# Regras de Movimentação de Cards no Trello

Board: **Kiro Spec Driven** (ID: `6a46731096111dc5fee99116`)

## Colunas do Board

| Coluna | ID |
|--------|-----|
| Refinamento | `6a4676649ed558c623c683a0` |
| TO DO | `6a469000cab7ce7201c4abad` |
| Em execução | `6a469000cab7ce7201c4abad` → `6a46769441eefe24546c3f1b` |
| Code Review | `6a468f65de9614c22958e8a9` |
| Done | `6a46769b39d5128460e26ec2` |

## Regras de Movimentação

### Regra 1 — Criação de Tasks (Refinamento → TO DO)

Ao **finalizar** o fluxo de **criação do documento tasks.md** (após a geração completa da task list de uma spec), o card do Trello relacionado à especificação deve ser movido da coluna **Refinamento** para a coluna **TO DO** (ID: `6a469000cab7ce7201c4abad`).

### Regra 2 — Execução de Tasks (TO DO → Em execução)

Ao iniciar o fluxo de **execução das tasks** (quando o agente começa a implementar as tasks do tasks.md), o card do Trello relacionado à especificação deve ser movido para a coluna **Em execução** (ID: `6a46769441eefe24546c3f1b`).

### Regra 3 — Conclusão de Tasks (Em execução → Code Review)

Ao **finalizar a execução de todas as tasks** do tasks.md (quando todas as tasks estão marcadas como concluídas), o card do Trello relacionado à especificação deve ser movido da coluna **Em execução** para a coluna **Code Review** (ID: `6a468f65de9614c22958e8a9`).

## Como Identificar o Card Relacionado

- O nome do card no Trello pode não ser idêntico ao nome da spec. Utilize uma busca semântica: compare o título do card com o assunto/objetivo da spec para encontrar a correspondência mais provável.
- Buscar o card nas colunas do board cujo título seja relacionado ao tema da spec (não exigir match exato).
- Se não houver card correspondente, não realizar movimentação (não criar card automaticamente).
