import { runQuery } from './../../../config/database';
import { PedidoRepository } from './PedidoRepository';

jest.mock('./../../../config/database');

describe('PedidoRepository', () => {
  let pedidoRepository: PedidoRepository;

  beforeEach(() => {
    pedidoRepository = new PedidoRepository();
  });

  test('deve retornar o status do pagamento para um ID válido', async () => {
    const idMock = 1;
    const pagamentoMock = { status: 'Pago' };
    require('./../../../config/database').runQuery.mockResolvedValue([
      pagamentoMock,
    ]);

    const status = await pedidoRepository.statusPagamentoPedido(idMock);

    expect(status).toBe('Pago');
    expect(runQuery).toHaveBeenCalledWith(
      expect.stringContaining(`where id = ${idMock}`)
    );
  });

  test('deve retornar mensagem padrão para um ID inválido', async () => {
    const idMock = 999;
    require('./../../../config/database').runQuery.mockResolvedValue([]);

    const status = await pedidoRepository.statusPagamentoPedido(idMock);

    expect(status).toBe('Solicitação de pagamento não criada!');
    expect(runQuery).toHaveBeenCalledWith(
      expect.stringContaining(`where id = ${idMock}`)
    );
  });

  test('deve lidar com erros de consulta ao banco de dados', async () => {
    const idMock = 1;
    const errorMock = new Error('Erro de consulta ao banco de dados');
    require('./../../../config/database').runQuery.mockRejectedValue(errorMock);

    await expect(
      pedidoRepository.statusPagamentoPedido(idMock)
    ).rejects.toThrow('Erro de consulta ao banco de dados');
  });
});
