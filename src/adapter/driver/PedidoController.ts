import { Response } from 'express';
import { PedidoUseCase } from '../../core/domain/useCases/Pedido/PedidoUseCase';
export class PedidoController {
  // Manter
  async statusPagamentoPedido(id: number, res: Response) {
    let statusPagamento = await new PedidoUseCase().statusPagamentoPedido(id);
    res.status(200).send(statusPagamento);
  }
}
