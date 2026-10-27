import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";

export class AlunoService {
  private readonly urlBase: string = "http://localhost:63367/api/aluno/";

  async QuantidadeAlunos(): Promise<number> {
    const url: string = this.urlBase + "quantidade-alunos";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok)
      throw Error("Não foi possível ler a quantidade de alunos");

    const quantidadeAlunos: number = await resposta.json();
    return quantidadeAlunos;
  }

  async QuantidadeAlunosAtivos(): Promise<number> {
    const url: string = this.urlBase + "quantidade-alunos-ativo";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!resposta.ok)
      throw Error("Não foi possível ler a quantidade de alunos ativos");

    const quantidadeAlunosAtivos: number = await resposta.json();
    return quantidadeAlunosAtivos;
  }
}
