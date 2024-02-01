import { runQuery } from './../../../config/database';
export class PedidoRepository {
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
      throw error;
    }
  }
}
