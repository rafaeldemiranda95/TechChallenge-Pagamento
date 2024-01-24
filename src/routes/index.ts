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
  } else if (cpf.length < 11) {
    return res.status(400).json({ error: 'CPF inválido' });


  } else if (cpf.length < 500) {
    return res.status(400).json({ error: 'CPF inválido' });

  } else {
    return res.status(200).json({ error: 'CPF inválido' });
  }
  // let usuarioController = new UsuarioController();
  // await usuarioController.autenticaCliente(cpf, res);
});

export default router;
