import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { PagamentoResponseDTO } from "../../types/financeiro/PagamentoResponseDTO";

export class PagamentoService {
  private readonly urlBase: string =
    "http://192.168.2.110:63367/api/pagamento/";

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
}
