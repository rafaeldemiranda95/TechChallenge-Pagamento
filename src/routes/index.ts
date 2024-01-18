import express from 'express';
import { PedidoController } from '../adapter/driver/PedidoController';
import { UsuarioController } from '../adapter/driver/UsuarioController';
import { autenticacaoMiddleware } from '../adapter/middleware/autenticacao.middleware';
import { UsuarioUseCase } from '../core/domain/useCases/Usuario/UsuarioUseCase';
const router = express.Router();
const usuarioUseCase = new UsuarioUseCase();
router.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Manter
router.post('/autenticaUsuarioAdministrador', async (req, res) => {
  let email = req.body.email;
  let senha = req.body.senha;

  let usuarioController = new UsuarioController();
  await usuarioController.autenticaAdminstrador(email, senha, res);
});

router.post('/autenticaCliente', async (req, res) => {
  let cpf = req.body.cpf;
  let usuarioController = new UsuarioController();
  await usuarioController.autenticaCliente(cpf, res);
});

router.get(
  '/statusPagamentoPedido',
  autenticacaoMiddleware(usuarioUseCase),
  async (req, res) => {
    let id = req.body.id;
    let pedidoController = new PedidoController();
    await pedidoController.statusPagamentoPedido(id, res);
  }
);

export default router;
