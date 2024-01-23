import express from 'express';
const router = express.Router();
// import { UsuarioController } from '../adapter/driver/UsuarioController';


router.get('/', (req, res) => {
  res.status(200).send('OK');
});


router.post('/autenticaCliente', async (req, res) => {
  let cpf = req.body.cpf;
  if (!cpf) {
    return res.status(400).json({ error: 'CPF inválido' });
  }
  // let usuarioController = new UsuarioController();
  // await usuarioController.autenticaCliente(cpf, res);
});

export default router;
