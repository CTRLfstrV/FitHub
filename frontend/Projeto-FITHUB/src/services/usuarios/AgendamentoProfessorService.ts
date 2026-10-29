import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { AgendamentoProfessorResponseDTO } from "../../types/usuarios/AgendamentoProfessorResponseDTO";

export class AgendamentoProfessorService {
  private readonly url =
    "http://localhost:63367/api/agendamento/professor/treinos-marcados";

  async TreinosMarcados(): Promise<AgendamentoProfessorResponseDTO[]> {
    const resposta = await fetch(this.url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 403)
      throw new Error("Esta área está disponível somente para professores.");
    if (!resposta.ok)
      throw new Error(
        `Não foi possível carregar os treinos marcados (HTTP ${resposta.status}).`,
      );

    return resposta.json();
  }
}
