import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { ContratoPendenteResponseDTO } from "../../types/financeiro/ContratoPendenteResponseDTO";
import type { ContratoProximoVencimentoResponseDTO } from "../../types/financeiro/ContratoProximoVencimentoResponseDTO";

export class ContratoService {
  private readonly urlBase: string = "http://localhost:63367/api/contrato/";

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
        "Não foi possível listar os contratos com vencimento próximo",
      );

    return resposta.json();
  }

  async ListarContratosPendentes(): Promise<
    ContratoPendenteResponseDTO[] | string
  > {
    const url: string = this.urlBase + "pendentes";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 500) return resposta.text();

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

  async ContratosPendentes(): Promise<number | string> {
    const url: string = this.urlBase + "quantidade-pendentes";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 500) return resposta.text();

    if (!resposta.ok)
      throw Error("Não foi possível ler os contratos pendentes");

    return resposta.json();
  }

  async AtualizarStatusContrato(
    idContrato: number,
    novoStatus: number,
  ): Promise<string> {
    const url: string = this.urlBase + `atualizar?idContrato=${idContrato}`;

    const resposta = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoStatus),
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 500) {
      const mensagem = await resposta.text();
      throw Error(mensagem);
    }

    if (!resposta.ok) throw Error("Não foi possível atualizar o contrato");

    return "Contrato atualizado";
  }
}
