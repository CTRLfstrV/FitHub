import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { PlanoCadastroDTO } from "../../types/financeiro/plano/PlanoCadastroDTO";
import type { PlanoDetalhesResponseDTO } from "../../types/financeiro/plano/PlanoDetalhesResponseDTO";
import type { PlanoResponseDTO } from "../../types/financeiro/plano/PlanoResponseDTO";

export class PlanoService {
  private readonly urlBase = "http://localhost:63367/api/plano";

  private async validarResposta(resposta: Response, mensagemPadrao: string) {
    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.ok) return;

    const mensagemServidor = await resposta.text().catch(() => "");
    throw new Error(mensagemServidor.trim() || mensagemPadrao);
  }

  async ListarPlanos(): Promise<PlanoResponseDTO[]> {
    const resposta = await fetch(this.urlBase, {
      method: "GET",
      credentials: "include",
    });

    await this.validarResposta(resposta, "Não foi possível carregar os planos.");
    return resposta.json();
  }

  async QuantidadePlano(): Promise<number> {
    const resposta = await fetch(`${this.urlBase}/quantidade`, {
      method: "GET",
      credentials: "include",
    });

    await this.validarResposta(resposta, "Não foi possível consultar a quantidade de planos.");

    const quantidade: unknown = await resposta.json();
    const valor =
      typeof quantidade === "number"
        ? quantidade
        : typeof quantidade === "string"
          ? Number(quantidade)
          : Number.NaN;
    if (!Number.isFinite(valor) || valor < 0) {
      throw new Error("A quantidade de planos retornada é inválida.");
    }

    return valor;
  }

  async DetalhesPlano(idPlano: number): Promise<PlanoDetalhesResponseDTO> {
    const resposta = await fetch(`${this.urlBase}/${idPlano}`, {
      method: "GET",
      credentials: "include",
    });

    await this.validarResposta(resposta, "Não foi possível carregar os detalhes do plano.");
    return resposta.json();
  }

  async CadastrarPlano(plano: PlanoCadastroDTO): Promise<string> {
    const resposta = await fetch(this.urlBase, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plano),
    });

    await this.validarResposta(resposta, "Não foi possível cadastrar o plano.");
    return "Plano cadastrado com sucesso.";
  }

  async EdicaoPlano(
    idPlano: number,
    planoEdicao: PlanoCadastroDTO,
  ): Promise<string> {
    const resposta = await fetch(`${this.urlBase}/${idPlano}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planoEdicao),
    });

    await this.validarResposta(resposta, "Não foi possível editar o plano.");
    return "Plano atualizado com sucesso.";
  }

  async DeletarPlano(idPlano: number): Promise<string> {
    const resposta = await fetch(`${this.urlBase}/${idPlano}`, {
      method: "DELETE",
      credentials: "include",
    });

    await this.validarResposta(resposta, "Não foi possível excluir o plano.");
    return "Plano excluído com sucesso.";
  }
}
