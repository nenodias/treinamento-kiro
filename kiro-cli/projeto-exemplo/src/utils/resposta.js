/**
 * Utilitário para padronizar respostas da API
 * Todas as respostas seguem o formato:
 * { success: boolean, data: any, error?: string }
 */

/**
 * Formata uma resposta de sucesso
 * @param {any} data - Dados a serem retornados
 * @returns {{ success: true, data: any }}
 */
export function formatarResposta(data) {
  return {
    success: true,
    data
  };
}

/**
 * Formata uma resposta de erro
 * @param {string} mensagem - Mensagem de erro
 * @returns {{ success: false, error: string }}
 */
export function formatarErro(mensagem) {
  return {
    success: false,
    error: mensagem
  };
}
