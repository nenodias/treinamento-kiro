0 - exemplo do cozinheiro
um restaurante
    - o cozinheiro é o agente (só dá s ferramentas que ele precisa e não a chave do caixa)
    - a receita com os ingredientes é o steering
    - o jeito que o cozinheiro faz a receita é a skill (ordem e habilidade de seguir a receita)


No final a diferença entre agents, steering e skills é semântica.
boa prática de roganização:
    isso vai ser a diferença se daqui a 10 anos teremos arquivos bem definidos 
    ou uma pasta com um monte de arquivos bagunçados



1- 
```
transforme o guia-commit.md em uma skill
```
    analisar a saída do kiro
    modo imperativo
    frontmatter

analisar no 01-conceito onde ficam as skills e o frontmatter
```
mova o arquivo para a pasta de skills e faça as alterações necessárias para que ele siga o padrão de skills
```

2 -
/test-drivern-development crie função de cadastro de produto
productService.ts



3 - 
-- normal e com caveman
Análise a performance da query abaixo:
 
SELECT p.id, p.name, p.price,
       (SELECT AVG(rating) FROM reviews r WHERE r.product_id = p.id) as avg_rating,
       (SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id) as review_count
FROM products p
WHERE p.category = 'electronics'
  AND p.price > 100;

  /caveman ultra


  4 - /caveman
  me explique sobre pool de conexões do banco de dados

  Fale como um homem das cavernas, no modo ultra