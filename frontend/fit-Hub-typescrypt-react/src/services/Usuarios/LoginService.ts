import type { PessoaLoginDTO } from "../../types/usuarios/PessoaLoginDTO";
import type { PessoaResponseLoginDTO } from "../../types/usuarios/PessoaResponseLoginDTO";
import { LoginValidation } from "../../validations/loginValidation";
export class LoginService {
  private readonly url: string = "http://192.168.2.110:63367/api/pessoa/login";
  private validacaoLogin: LoginValidation;

  constructor(validacaoLogin: LoginValidation) {
    this.validacaoLogin = validacaoLogin;
  }

  async login(pessoa: PessoaLoginDTO): Promise<PessoaResponseLoginDTO> {
    this.validacaoLogin.validacaoLogin(pessoa.cpf, pessoa.senha);

    const resposta = await fetch(this.url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: pessoa.cpf,
        senha: pessoa.senha,
      }),
    });

    if (!resposta.ok) {
      let mensagem =
        resposta.status === 404 ? "A requisição falhou" : "Falha inesperada";

      try {
        const erro = await resposta.json();

        if (typeof erro.message === "string") {
          mensagem = erro.message;
        }
      } catch {
        // Mantém a mensagem padrão se o corpo não for JSON válido.
      }

      throw new Error(mensagem);
    }

    const pessoaRetorno: number = await resposta.json();
    console.log(pessoaRetorno);
    return {
      tipoPessoa: pessoaRetorno,
    };
  }
}
