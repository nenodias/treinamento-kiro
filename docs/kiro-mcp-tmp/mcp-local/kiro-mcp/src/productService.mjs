const BASE_URL = 'http://localhost:3000/products';

export async function listarProducts(page) {
  const url = page ? `${BASE_URL}?page=${page}` : BASE_URL;
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(`HTTP ${resposta.status}`);
  }

  return resposta.json();
}
