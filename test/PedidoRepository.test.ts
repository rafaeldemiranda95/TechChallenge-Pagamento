import { PedidoRepository } from '../src/adapter/driven/infra/PedidoRepository';
import { runQuery } from '../src/config/database';

jest.mock('../src/config/database');

describe('PedidoRepository', () => {
  let pedidoRepository: PedidoRepository;

  beforeEach(() => {
    pedidoRepository = new PedidoRepository();
  });

  it('deve retornar o status do pagamento para um ID válido', async () => {
    const idMock = 1;
    const pagamentoMock = { status: 'Pago' };
    require('../src/config/database').runQuery.mockResolvedValue([
      pagamentoMock,
    ]);

    const status = await pedidoRepository.statusPagamentoPedido(idMock);

    expect(status).toBe('Pago');
    expect(runQuery).toHaveBeenCalledWith(
      expect.stringContaining(`where id = ${idMock}`)
    );
  });

  it('deve retornar mensagem padrão para um ID inválido', async () => {
    const idMock = 999;
    require('../src/config/database').runQuery.mockResolvedValue([]);

    const status = await pedidoRepository.statusPagamentoPedido(idMock);

    expect(status).toBe('Solicitação de pagamento não criada!');
    expect(runQuery).toHaveBeenCalledWith(
      expect.stringContaining(`where id = ${idMock}`)
    );
  });

  it('deve lidar com erros de consulta ao banco de dados', async () => {
    const idMock = 1;
    const errorMock = new Error('Erro de consulta ao banco de dados');
    require('../src/config/database').runQuery.mockRejectedValue(errorMock);

    await expect(
      pedidoRepository.statusPagamentoPedido(idMock)
    ).rejects.toThrow('Erro de consulta ao banco de dados');
  });
});
