export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
}

// Dados fake para a demo — simula um banco de dados
export const products: Product[] = [
  {
    id: '1',
    name: 'Notebook Pro',
    description: 'Notebook de alta performance',
    price: 7999.99,
    category: 'eletronicos',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Mouse Gamer',
    description: 'Mouse com sensor óptico',
    price: 299.9,
    category: 'eletronicos',
    createdAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    name: 'Cadeira Ergonômica',
    description: 'Cadeira com apoio lombar',
    price: 1899.0,
    category: 'moveis',
    createdAt: '2024-01-17T10:00:00Z',
  },
  {
    id: '4',
    name: 'Monitor 27"',
    description: 'Monitor 4K IPS',
    price: 2499.0,
    category: 'eletronicos',
    createdAt: '2024-01-18T10:00:00Z',
  },
  {
    id: '5',
    name: 'Teclado Mecânico',
    description: 'Teclado com switches blue',
    price: 449.9,
    category: 'eletronicos',
    createdAt: '2024-01-19T10:00:00Z',
  },
  {
    id: '6',
    name: 'Mesa Gamer',
    description: 'Mesa com LED RGB',
    price: 1299.0,
    category: 'moveis',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '7',
    name: 'Webcam HD',
    description: 'Webcam 1080p com microfone',
    price: 349.9,
    category: 'eletronicos',
    createdAt: '2024-01-21T10:00:00Z',
  },
  {
    id: '8',
    name: 'Headset Wireless',
    description: 'Headset bluetooth com ANC',
    price: 899.0,
    category: 'eletronicos',
    createdAt: '2024-01-22T10:00:00Z',
  },
  {
    id: '9',
    name: 'Suporte Monitor',
    description: 'Suporte articulado para monitor',
    price: 189.9,
    category: 'acessorios',
    createdAt: '2024-01-23T10:00:00Z',
  },
  {
    id: '10',
    name: 'Hub USB-C',
    description: 'Hub 7 em 1 com HDMI',
    price: 259.9,
    category: 'acessorios',
    createdAt: '2024-01-24T10:00:00Z',
  },
  {
    id: '11',
    name: 'SSD 1TB',
    description: 'SSD NVMe de alta velocidade',
    price: 599.9,
    category: 'eletronicos',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '12',
    name: 'Mousepad XL',
    description: 'Mousepad grande com bordas costuradas',
    price: 79.9,
    category: 'acessorios',
    createdAt: '2024-02-02T10:00:00Z',
  },
  {
    id: '13',
    name: 'Luminária LED',
    description: 'Luminária de mesa com dimmer',
    price: 149.9,
    category: 'moveis',
    createdAt: '2024-02-03T10:00:00Z',
  },
  {
    id: '14',
    name: 'Caixa de Som Bluetooth',
    description: "Speaker portátil à prova d'água",
    price: 399.9,
    category: 'eletronicos',
    createdAt: '2024-02-04T10:00:00Z',
  },
  {
    id: '15',
    name: 'Organizador de Cabos',
    description: 'Kit organizador com velcro',
    price: 39.9,
    category: 'acessorios',
    createdAt: '2024-02-05T10:00:00Z',
  },
];
