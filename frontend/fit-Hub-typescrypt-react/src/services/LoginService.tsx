import type { PessoaLoginDTO } from "../types/PessoaLoginDTO";
import { LoginValidation } from "../validations/loginValidation";
export class LoginService {
  private readonly url: string = "http://192.168.2.110:63367/api/Pessoa/login";
  private validacaoLogin: LoginValidation;

  constructor(validacaoLogin: LoginValidation) {
    this.validacaoLogin = validacaoLogin;
  }

  async login(pessoa: PessoaLoginDTO) {
    this.validacaoLogin.validacaoLogin(pessoa.cpf, pessoa.senha);

    const resposta = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: pessoa.cpf,
        senha: pessoa.senha,
      }),
    });
  }
}
