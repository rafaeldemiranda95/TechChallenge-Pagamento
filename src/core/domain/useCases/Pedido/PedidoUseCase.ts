import { PedidoRepository } from '../../../../adapter/driven/infra/PedidoRepository';
export class PedidoUseCase {
  async statusPagamentoPedido(id: number): Promise<string> {
    return await new PedidoRepository().statusPagamentoPedido(id);
  }
}
