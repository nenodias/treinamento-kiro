# ⚡ Módulo 03 — Instalação e Uso de Powers

> ⏱️ Tempo estimado: ~5 minutos

---

## Formas de instalar Powers

Existem **3 formas** de adicionar powers ao seu Kiro:

---

## 1. Powers curados (parceiros)

Powers oficiais de parceiros como Stripe, Supabase, Datadog etc.

### Via site kiro.dev

1. Acesse [kiro.dev/powers](https://kiro.dev/powers)
2. Escolha um power e clique em **Add to Kiro**
3. O Kiro IDE abre e completa a instalação com um clique

### Via IDE

1. Abra o **painel de Powers** → clique no ícone 👻⚡ (Ghosty com raio)
2. Escolha um power para ver detalhes
3. Clique em **+ Install**

---

## 2. Powers customizados (GitHub)

Powers da comunidade publicados em repositórios públicos.

1. Painel de Powers → **Add Custom Power**
2. Selecione **Import power from GitHub**
3. Cole a URL do repositório
4. Clique em **Install**

> ⚠️ O repositório deve ter um `POWER.md` válido na raiz.

---

## 3. Powers locais (desenvolvimento)

Para powers que você está criando ou de repositórios privados.

1. Clone o repositório localmente
2. Painel de Powers → **Add Custom Power**
3. Selecione **Import power from a folder**
4. Selecione o diretório contendo o `POWER.md`
5. Clique em **Install**

---

## Como a ativação funciona

Após instalar, o power é ativado **automaticamente** quando você usa palavras-chave relevantes:

```
┌─────────────────────────────────────────────────────┐
│  Você: "Preciso configurar o pagamento com Stripe"  │
├─────────────────────────────────────────────────────┤
│  Kiro detecta: "pagamento" + "Stripe"               │
│  → Match com keywords do Power Stripe               │
│  → Carrega POWER.md + MCP tools do Stripe           │
│  → Agente agora tem contexto especializado          │
└─────────────────────────────────────────────────────┘
```

### Ciclo de vida da ativação

```
INATIVO  →  Você menciona keyword  →  ATIVO (tools + docs carregados)
                                         │
ATIVO    →  Muda de assunto        →  INATIVO (contexto liberado)
```

---

## Powers com MCP

Quando um power inclui integrações MCP:

- O Kiro registra automaticamente o servidor no `~/.kiro/settings/mcp.json`
- As ferramentas ficam disponíveis na seção **Powers** da configuração MCP
- Não precisa editar JSON manualmente

---

## Primeiro uso: Onboarding

Na primeira vez que um power é usado, o Kiro segue as **instruções de onboarding**:

1. Valida dependências (Docker, CLI, etc.)
2. Verifica pré-requisitos
3. Cria hooks ou arquivos necessários
4. Explica como usar

```
Primeiro uso do Power Supabase:
  → Kiro verifica se Docker está rodando
  → Kiro verifica se Supabase CLI está instalado
  → Kiro cria hook de review de performance
  → Pronto para usar!
```

---

## Atualizando Powers

Para manter um power na versão mais recente:

1. Painel de Powers → selecione o power → **Check for updates**
2. Se houver atualizações, clique em **Install updates**

O power é atualizado a partir do repositório remoto com a versão mais recente.

---

## Aviso de segurança

> ⚠️ Powers são ferramentas de terceiros que podem estar sujeitas a termos separados.
> Instale apenas powers de fontes confiáveis e revise documentação e licenciamento.
> O Kiro não é responsável por powers de terceiros.

---

## Resumo

| Método | Fonte | Requisito |
|--------|-------|-----------|
| Curado | kiro.dev/powers | Um clique |
| GitHub | URL pública | POWER.md na raiz |
| Local | Pasta no disco | POWER.md no diretório |

**Fluxo de uso:**
1. Instale → 2. Mencione keywords → 3. Power ativa automaticamente → 4. Use as ferramentas

---

> 📌 **Próximo**: [Módulo 04 — Criando seu próprio Power](04-criando-power.md)
