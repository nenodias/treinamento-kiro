/**
 * Helpers para padronizar respostas da API
 *
 * Formato de sucesso: { data: T }
 * Formato de lista: { data: T[], meta: { total: number } }
 * Formato de erro: { error: { code: string, message: string } }
 */

/**
 * Resposta de sucesso com um único recurso
 */
function sucesso(res, dados, statusCode = 200) {
  return res.status(statusCode).json({
    data: dados
  });
}

/**
 * Resposta de sucesso para criação (201)
 */
function criado(res, dados) {
  return sucesso(res, dados, 201);
}

/**
 * Resposta de sucesso para lista de recursos
 */
function lista(res, dados) {
  return res.status(200).json({
    data: dados,
    meta: {
      total: dados.length
    }
  });
}

/**
 * Resposta sem conteúdo (204) — usado em DELETE
 */
function semConteudo(res) {
  return res.status(204).send();
}

/**
 * Resposta de erro padronizada
 */
function erro(res, statusCode, code, message) {
  return res.status(statusCode).json({
    error: {
      code,
      message
    }
  });
}

module.exports = {
  sucesso,
  criado,
  lista,
  semConteudo,
  erro
};
