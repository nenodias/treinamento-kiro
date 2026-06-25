/**
 * Resposta HTTP padronizada.
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

export function sucesso(dados, mensagem = 'Operação realizada com sucesso') {
  return resposta(200, { sucesso: true, dados, mensagem });
}

export function erro(statusCode, mensagem) {
  return resposta(statusCode, { sucesso: false, dados: null, mensagem });
}
