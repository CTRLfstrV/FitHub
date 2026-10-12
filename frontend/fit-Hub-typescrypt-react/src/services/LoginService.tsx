import type { PessoaLoginDTO } from "../types/PessoaLoginDTO";
import { LoginValidation } from "../validations/loginValidation";
export class LoginService {
  validacaoLogin: LoginValidation;

  constructor(validacaoLogin: LoginValidation){
    this.validacaoLogin = validacaoLogin;
  }

  login(pessoa: PessoaLoginDTO) {
    this.validacaoLogin.validacaoLogin(pessoa.cpf, pessoa.senha);
    //Implementar a requisição da API
  }
}
