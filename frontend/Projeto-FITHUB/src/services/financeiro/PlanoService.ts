import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { PlanoCadastroDTO } from "../../types/financeiro/PlanoCadastroDTO";
import type { PlanoResponseDTO } from "../../types/financeiro/PlanoResponseDTO";

export class PlanoService {
  private readonly urlBase: string = "http://localhost:63367/api/plano";

  async ListarPlanos(): Promise<PlanoResponseDTO[]> {
    const resposta = await fetch(this.urlBase, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Não foi possível ler os registros");

    return resposta.json();
  }

  async CadastrarPlano(plano: PlanoCadastroDTO): Promise<void> {
    const resposta = await fetch(this.urlBase, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plano),
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Não foi possível cadastrar o plano");
  }
}
