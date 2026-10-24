import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { SexoPessoaResponseDTO } from "../../types/usuarios/SexoPessoaResponseDTO";

export class PessoaService {
  private readonly urlBase: string = "http://192.168.2.110:63367/api/pessoa";

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
}
