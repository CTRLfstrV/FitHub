import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { DetalhesAlunoResponseDTO } from "../../types/financeiro/DetalhesAlunoResponseDTO";
import type { FormaPagamentoResponseDTO } from "../../types/financeiro/FormaPagamentoResponseDTO";
import type { PagamentoResponseDTO } from "../../types/financeiro/PagamentoResponseDTO";

export class PagamentoService {
  private readonly urlBase: string =
    "http://localhost:63367/api/pagamento/";

  async ListarPagamentos(): Promise<PagamentoResponseDTO[]> {
    const url: string = this.urlBase;

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Não foi possível ler os registros");

    return resposta.json();
  }

  async DetalhesPagamentoAluno(
    idAluno: number,
  ): Promise<DetalhesAlunoResponseDTO> {
    const url: string = this.urlBase + `detalhes-aluno/${idAluno}`;

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Não foi possivel ler os registros");

    return resposta.json();
  }

  async ListarFormasPagamento(): Promise<FormaPagamentoResponseDTO[]> {
    const url: string = this.urlBase + "formas";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include"
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if(!resposta.ok) throw Error("Não foi possível ler os registros");

    return resposta.json();
  }
}
