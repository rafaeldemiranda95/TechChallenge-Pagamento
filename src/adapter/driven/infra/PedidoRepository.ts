import { prisma } from '../../../config/database';
import { Pedido } from '../../../core/domain/models/Pedido';
import { runQuery } from './../../../config/database';
export class PedidoRepository {
  async criarPagamento(pedido: Pedido): Promise<void> {
    try {
      await prisma.pagamento.create({
        data: {
          pedidoId: pedido.id ? pedido.id : 0,
          valor: pedido.total ? pedido.total : 0,
          status: 'Pendente',
          usuarioId: pedido.usuario.id,
        },
      });
    } catch (error: any) {
      console.log('error', error);
    }
  }
  // Manter
  async statusPagamentoPedido(id: number): Promise<any> {
    try {
      let query = `SELECT * FROM public.pagamento where id = ${id} RETURNING *`;
      let _pagamento = await runQuery(query);
      if (_pagamento.length > 0) {
        let pagamento = _pagamento[0];
        return pagamento.status;
      }
      return 'Solicitação de pagamento não criada!';
    } catch (error: any) {
      console.log('error', error);
    }
  }
}
