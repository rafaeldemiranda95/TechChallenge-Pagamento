import { Usuario } from '../../core/domain/models/Usuario';
import { UsuarioUseCase } from '../../core/domain/useCases/Usuario/UsuarioUseCase';
import { CPF } from '../../core/domain/valueObjects/cpf';
export class UsuarioController {
  constructor(
    private usuarioUseCase: UsuarioUseCase,
    private cpfFactory: (cpf: string) => CPF
  ) {}
  async autenticaAdminstrador(email: string, senha: string, res: any) {
    try {
      let usuario = new Usuario('', email, '', '', senha);
      await this.usuarioUseCase.autenticaAdministrador(usuario, res);
    } catch (error: any) {
      throw new Error('Erro de autenticação do administrador');
    }
  }
  async autenticaCliente(cpf: string, res: any) {
    try {
      let usuario = new Usuario('', '', cpf, '');
      await this.usuarioUseCase.autenticaCliente(usuario, res);
    } catch (error: any) {
      throw new Error('Erro de autenticação do cliente');
    }
  }
}

// import { Usuario } from '../../core/domain/models/Usuario';
// import { UsuarioUseCase } from '../../core/domain/useCases/Usuario/UsuarioUseCase';
// export class UsuarioController {
//   // Manter
//   async autenticaAdminstrador(email: string, senha: string, res: any) {
//     try {
//       let usuario = new Usuario('', email, '', '', senha);
//       await new UsuarioUseCase().autenticaAdministrador(usuario, res);
//     } catch (error: any) {
//       console.log(error);
//     }
//   }
//   async autenticaCliente(cpf: string, res: any) {
//     try {
//       let usuario = new Usuario('', '', cpf, '');
//       await new UsuarioUseCase().autenticaCliente(usuario, res);
//     } catch (error: any) {
//       console.log(error);
//     }
//   }
// }
