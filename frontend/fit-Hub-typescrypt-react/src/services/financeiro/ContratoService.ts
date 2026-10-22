import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { ContratoProximoVencimentoResponseDTO } from "../../types/financeiro/ContratoProximoVencimentoResponseDTO";

export class ContratoService {
  private readonly urlBase: string = "http://localhost:63367/api/contrato/";//mudar o ip para localhost quando for para produção

  async ContratosProximosVencimento(): Promise<
    ContratoProximoVencimentoResponseDTO[]
  > {
    const url: string = this.urlBase + "vencimento-proximo";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok)
      throw new Error(
        "Não foi possível pegar os contratos com vencimento próximo",
      );

    return resposta.json();
  }

  async ContratosAtivos(): Promise<number> {
    const url: string = this.urlBase + "quantidade-ativos";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Não foi possível ler os contratos ativos");

    return resposta.json();
  }
}
