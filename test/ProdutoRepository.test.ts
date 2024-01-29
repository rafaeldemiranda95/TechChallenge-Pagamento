import { ProdutoRepository } from '../src/adapter/driven/infra/ProdutoRepository';

jest.mock('../src/config/database');

describe('ProdutoRepository', () => {
  let produtoRepository: ProdutoRepository;

  beforeEach(() => {
    produtoRepository = new ProdutoRepository();
  });

  test('deve retornar uma lista de produtos', async () => {
    require('./../src/config/database').runQuery.mockResolvedValue([
      { id: 1, nome: 'Produto 1' },
    ]);
    const produtos = await produtoRepository.exibirLista();
    expect(produtos.length).toBeGreaterThan(0);
  });

  test('deve retornar produtos por categoria', async () => {
    const categoriaMock = 'categoriaTeste';
    require('./../src/config/database').runQuery.mockResolvedValue([
      { id: 1, nome: 'Produto 1', categoria: categoriaMock },
    ]);
    const produtos = await produtoRepository.exibirPorCategoria(categoriaMock);
    expect(produtos[0].categoria).toBe(categoriaMock);
  });

  test('deve retornar um produto por ID', async () => {
    const idMock = 1;
    require('./../src/config/database').runQuery.mockResolvedValue([
      { id: idMock, nome: 'Produto 1' },
    ]);
    const produto = await produtoRepository.exibirPorId(idMock);
    expect(produto.id).toBe(idMock);
  });

  test('deve salvar um novo produto', async () => {
    const produtoMock = {
      nome: 'Novo Produto',
      categoria: 'Teste',
      preco: 10,
      descricao: 'Descrição',
      imagem: 'imagem.jpg',
    };
    require('./../src/config/database').runQuery.mockResolvedValue([
      produtoMock,
    ]);
    const produtoSalvo = await produtoRepository.salvar(produtoMock);
    expect(produtoSalvo).toEqual(produtoMock);
  });

  test('deve alterar um produto existente', async () => {
    const produtoMock = {
      id: 1,
      nome: 'Produto Alterado',
      categoria: 'Teste',
      preco: 20,
      descricao: 'Nova descrição',
      imagem: 'nova_imagem.jpg',
    };
    require('./../src/config/database').runQuery.mockResolvedValue([
      produtoMock,
    ]);
    const produtoAlterado = await produtoRepository.alterar(produtoMock);
    expect(produtoAlterado).toEqual(produtoMock);
  });

  test('deve apagar um produto', async () => {
    const idMock = 1;
    require('./../src/config/database').runQuery.mockResolvedValue([
      { id: idMock, nome: 'Produto Apagado' },
    ]);
    const produtoApagado = await produtoRepository.apagar(idMock);
    expect(produtoApagado.id).toBe(idMock);
  });
});
