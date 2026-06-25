/**
 * Função utilitária para padronizar respostas HTTP.
 * Todos os handlers devem usar esta função para retornar dados.
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
 * Resposta de sucesso padronizada.
 */
export function sucesso(dados, mensagem = 'Operação realizada com sucesso') {
  return resposta(200, {
    sucesso: true,
    dados,
    mensagem
  });
}

/**
 * Resposta de erro padronizada.
 * Nunca expõe stack trace — apenas mensagem amigável.
 */
export function erro(statusCode, mensagem) {
  return resposta(statusCode, {
    sucesso: false,
    dados: null,
    mensagem
  });
}
