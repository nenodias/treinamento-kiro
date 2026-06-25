/**
 * Monta uma resposta HTTP padronizada para API Gateway.
 *
 * @param {number} statusCode - Código de status HTTP (200, 400, 404, 500, etc.)
 * @param {object|null} body - Corpo da resposta que será serializado em JSON
 * @returns {object} Objeto de resposta com statusCode, headers CORS e body stringificado
 *
 * @example
 * const res = resposta(200, { mensagem: 'ok' });
 * // { statusCode: 200, headers: { 'Content-Type': 'application/json', ... }, body: '{"mensagem":"ok"}' }
 */
export function resposta(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body)
  };
}

/**
 * Cria uma resposta de sucesso padronizada com dados e mensagem.
 *
 * @param {object|null} dados - Dados retornados na resposta (payload principal)
 * @param {string} [mensagem='Operação realizada com sucesso'] - Mensagem descritiva da operação
 * @returns {object} Resposta HTTP 200 com formato { sucesso: true, dados, mensagem }
 *
 * @example
 * const res = sucesso({ id: '123', nome: 'João' }, 'Usuário criado');
 * // { statusCode: 200, body: '{"sucesso":true,"dados":{"id":"123","nome":"João"},"mensagem":"Usuário criado"}' }
 */
export function sucesso(dados, mensagem = 'Operação realizada com sucesso') {
  return resposta(200, {
    sucesso: true,
    dados,
    mensagem
  });
}

/**
 * Cria uma resposta de erro padronizada. Nunca expõe stack trace — apenas mensagem amigável.
 *
 * @param {number} statusCode - Código de status HTTP de erro (400, 404, 409, 500, etc.)
 * @param {string} mensagem - Mensagem de erro amigável para o consumidor da API
 * @returns {object} Resposta HTTP com formato { sucesso: false, dados: null, mensagem }
 *
 * @example
 * const res = erro(404, 'Usuário não encontrado');
 * // { statusCode: 404, body: '{"sucesso":false,"dados":null,"mensagem":"Usuário não encontrado"}' }
 */
export function erro(statusCode, mensagem) {
  return resposta(statusCode, {
    sucesso: false,
    dados: null,
    mensagem
  });
}
