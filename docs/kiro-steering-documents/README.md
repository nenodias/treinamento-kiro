# 🧭 Treinamento: Steering Documents no Kiro

## Sobre este treinamento

Este material foi criado para capacitar desenvolvedores a utilizarem **Steering Documents** no Kiro IDE — um mecanismo poderoso para guiar o comportamento do agente de IA com instruções persistentes, padrões do time e contexto do projeto.

## O que são Steering Documents?

Steering Documents são arquivos Markdown que ficam na pasta `.kiro/steering/` do seu projeto. Eles funcionam como **instruções permanentes** que o Kiro carrega automaticamente (ou sob demanda) em todas as interações, garantindo que o agente siga os padrões, convenções e regras do seu time sem que você precise repetir isso a cada prompt.

Pense neles como um "manual de bordo" que o Kiro consulta antes de agir — similar a um `.editorconfig` para formatação, mas para o **comportamento inteligente** do agente.

## Estrutura do Treinamento

| Módulo | Tema | Nível |
|--------|------|-------|
| [Módulo 01](modulos/01-o-que-sao-steering-documents.md) | O que são e qual problema resolvem | Iniciante |
| [Módulo 02](modulos/02-como-criar-e-configurar.md) | Como criar e configurar | Iniciante |
| [Módulo 03](modulos/03-modos-de-inclusao.md) | Modos de inclusão (always, fileMatch, manual) | Intermediário |
| [Módulo 04](modulos/04-referencias-e-composicao.md) | Referências a arquivos e composição | Intermediário |
| [Módulo 05](modulos/05-casos-de-uso-reais.md) | Casos de uso reais no dia a dia | Avançado |
| [Módulo 06](modulos/06-boas-praticas-e-organizacao.md) | Boas práticas e organização | Avançado |
| [Módulo 07](modulos/07-demo-pratica.md) | Demonstração prática | Hands-on |

## Projeto de Exemplo

A pasta `projeto-exemplo/` contém uma aplicação Node.js com uma estrutura completa de Steering Documents configurados para diferentes cenários — padrões de código, convenções de API, regras de segurança e mais.

## Pré-requisitos

- Kiro IDE instalado
- Familiaridade básica com Markdown
- Um projeto existente (ou usar o projeto de exemplo)

## Como usar este material

1. Leia os módulos na ordem progressiva
2. Experimente criar seus próprios Steering Documents no projeto de exemplo
3. Adapte os exemplos para o seu projeto real

---

> 📌 **Fonte oficial**: [Documentação Kiro - Steering](https://kiro.dev/docs/steering/)
