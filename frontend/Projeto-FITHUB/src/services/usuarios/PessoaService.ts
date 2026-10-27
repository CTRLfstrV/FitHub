import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { PessoaLoginDTO } from "../../types/usuarios/PessoaLoginDTO";
import type { PessoaResponseLoginDTO } from "../../types/usuarios/PessoaResponseLoginDTO";
import type { SexoPessoaResponseDTO } from "../../types/usuarios/SexoPessoaResponseDTO";
import type { LoginValidation } from "../../validations/loginValidation";

export class PessoaService {
  private readonly urlBase: string = "http://localhost:63367/api/pessoa";

  private validacaoLogin?: LoginValidation;

  constructor();
  constructor(validacaoLogin: LoginValidation)

  constructor(validacaoLogin?: LoginValidation) {
    this.validacaoLogin = validacaoLogin;
  }


  //#region Login
  async login(pessoa: PessoaLoginDTO): Promise<PessoaResponseLoginDTO> {
    const url: string = this.urlBase + "/login";
    this.validacaoLogin?.validacaoLogin(pessoa.cpf, pessoa.senha);

    const resposta = await fetch(url, {
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
    return {
      tipoPessoa: pessoaRetorno,
    };
  }
  //#endregion

  //#region Verificação de sessão
  async VerificaSessao(): Promise<boolean> {
    
    const url: string = this.urlBase + "/sessao"

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) return false;

    if (!resposta.ok) throw new Error("Não foi possível ler a sessão");

    return true;
  }

  async NomeUsuario(): Promise<string> {
    const url = this.urlBase + "/sessao/nome";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 404)
      throw Error("Nome não encontrado");

    if (!resposta.ok) throw new Error("Não foi possível ler a sessão");

    return resposta.text();
  }
  //#endregion

  //#region Listagem de sexos
  async ListarSexos(): Promise<SexoPessoaResponseDTO[]> {
    const url: string = this.urlBase + "/sexo";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Falha ao ler os registros");

    return resposta.json();
  }
  //#endregion
}
