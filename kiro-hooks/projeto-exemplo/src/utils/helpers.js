function formatarData(data) {
  return data.toISOString();
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

module.exports = { formatarData, validarEmail, gerarSlug };
