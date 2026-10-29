import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { AlteracaoDadosDTO } from "../../types/usuarios/AlteracaoDadosDTO";
import type { AlteracaoSenhaDTO } from "../../types/usuarios/AlteracaoSenhaDTO";
import type { PessoaDadosResponseDTO } from "../../types/usuarios/PessoaDadosResponseDTO";
import type { PessoaLoginDTO } from "../../types/usuarios/PessoaLoginDTO";
import type { PessoaResponseLoginDTO } from "../../types/usuarios/PessoaResponseLoginDTO";
import type { SexoPessoaResponseDTO } from "../../types/usuarios/SexoPessoaResponseDTO";
import { AlteracaoDadosValidation } from "../../validations/alteracaoDadosValidation";
import type { LoginValidation } from "../../validations/loginValidation";

export class PessoaService {
  private readonly urlBase: string = "http://localhost:63367/api/pessoa/";

  private validacaoLogin?: LoginValidation;

  constructor();
  constructor(validacaoLogin: LoginValidation);

  constructor(validacaoLogin?: LoginValidation) {
    this.validacaoLogin = validacaoLogin;
  }

  //#region Login
  async login(pessoa: PessoaLoginDTO): Promise<PessoaResponseLoginDTO> {
    const url: string = this.urlBase + "login";
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
        mensagem = await resposta.text();
      } catch { }
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
    const url: string = this.urlBase + "sessao";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) return false;

    if (!resposta.ok) throw new Error("Não foi possível ler a sessão");

    return true;
  }

  async NomeUsuario(): Promise<string> {
    const url = this.urlBase + "sessao/nome";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 404) throw Error("Nome não encontrado");

    if (!resposta.ok) throw new Error("Não foi possível ler a sessão");

    return resposta.text();
  }
  //#endregion

  //#region Listagem de sexos
  async ListarSexos(): Promise<SexoPessoaResponseDTO[]> {
    const url: string = this.urlBase + "sexo";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Falha ao ler os registros");

    return resposta.json();
  }
  //#endregion

  //#region Retorno de dados pessoais
  async DadosPessoais(): Promise<PessoaDadosResponseDTO | string> {
    const url: string = this.urlBase + "dados";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 404 || resposta.status === 500)
      return resposta.text();
    if (!resposta.ok) throw Error("Falha ao ler os registros");

    return resposta.json();
  }
  //#endregion

  //#region
  async AlterarSenha(alteracaoSenha: AlteracaoSenhaDTO): Promise<string> {
    const url: string = this.urlBase + "alterar-senha";

    const resposta = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        antiga: alteracaoSenha.antiga,
        nova: alteracaoSenha.nova,
      }),
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 400 || resposta.status === 500)
      return resposta.text();
    if (!resposta.ok) throw Error("Não foi possível alterar a senha");

    return "Senha alterada com sucesso";
  }
  //#endregion

  //#region 
  async AlterarDados(novosDados: AlteracaoDadosDTO): Promise<string> {
    new AlteracaoDadosValidation().validacaoAlteracaoDados(novosDados);

    const url: string = this.urlBase + "alterar-dados";

    const resposta = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        novoNome: novosDados.novoNome,
        novoEmail: novosDados.novoEmail,
        novoTelefone: novosDados.novoTelefone
      })
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 400 || resposta.status === 500) return resposta.text();
    if (!resposta.ok) throw new Error("Não foi possível alterar os dados");

    return "Dados salvos com sucesso";
  }
  //#endregion
}
