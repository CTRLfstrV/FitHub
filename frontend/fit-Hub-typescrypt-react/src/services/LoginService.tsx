import type { PessoaLoginDTO } from "../types/PessoaLoginDTO";
import type { PessoaResponseLoginDTO } from "../types/PessoaResponseLoginDTO";
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

    if (!resposta.ok) {
      let mensagem = `Erro HTTP: ${resposta.status}`;

      try {
        const erro: unknown = await resposta.json();

        if (
          typeof erro === "object" &&
          erro !== null &&
          "message" in erro &&
          typeof erro.message === "string"
        ) {
          mensagem = erro.message;
        } else if (
          typeof erro === "object" &&
          erro !== null &&
          "detail" in erro &&
          typeof erro.detail === "string"
        ) {
          mensagem = erro.detail;
        } else if (
          typeof erro === "object" &&
          erro !== null &&
          "mensagem" in erro &&
          typeof erro.mensagem === "string"
        ) {
          mensagem = erro.mensagem;
        } else if (
          typeof erro === "object" &&
          erro !== null &&
          "title" in erro &&
          typeof erro.title === "string"
        ) {
          mensagem = erro.title;
        }
      } catch {
        // A resposta não continha um JSON válido.
      }

      throw new Error(mensagem);
    }

    const pessoaRetorno: PessoaResponseLoginDTO = await resposta.json();
  }
}
