import { SessaoInvalidaException } from "../../exceptions/SessaoInvalidaException";
import type { PlanoCadastroDTO } from "../../types/financeiro/plano/PlanoCadastroDTO";
import type { PlanoDetalhesResponseDTO } from "../../types/financeiro/plano/PlanoDetalhesResponseDTO";
import type { PlanoResponseDTO } from "../../types/financeiro/plano/PlanoResponseDTO";

export class PlanoService {
  private readonly urlBase: string = "http://localhost:63367/api/plano";

  //#region Listagem dos planos
  async ListarPlanos(): Promise<PlanoResponseDTO[]> {
    const resposta = await fetch(this.urlBase, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();

    if (!resposta.ok) throw Error("Não foi possível ler os registros");

    return resposta.json();
  }
  //#endregion

  //#region Quantidade de planos cadastrados
  async QuantidadePlano(): Promise<number | string> {
    const url: string = this.urlBase + "/quantidade";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 400 || resposta.status === 500)
      return resposta.text();
    if (!resposta.ok) throw Error("Não foi possível ler os registros");

    return resposta.json();
  }
  //#endregion

  // #region Detalhes do plano
  async DetalhesPlano(
    idPlano: number,
  ): Promise<PlanoDetalhesResponseDTO | string> {
    const url: string = this.urlBase + `/${idPlano}`;

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 400 || resposta.status === 500)
      return resposta.text();
    if (!resposta.ok) throw Error("Não foi possível ler os registros");

    return resposta.json();
  }
  //#endregion

  //#region Cadastro de planos
  async CadastrarPlano(plano: PlanoCadastroDTO): Promise<string> {
    const resposta = await fetch(this.urlBase, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plano),
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 400 || resposta.status === 500)
      return resposta.text();
    if (!resposta.ok) throw Error("Não foi possível cadastrar o plano");

    return "Plano cadastrado com êxito";
  }
  //#endregion

  //#region Edição de planos
  async EdicaoPlano(
    idPlano: number,
    planoEdicao: PlanoCadastroDTO,
  ): Promise<string> {
    const url = this.urlBase + `/${idPlano}`;

    const resposta = await fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(planoEdicao),
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 400 || resposta.status === 500)
      return resposta.text();
    if (!resposta.ok) throw Error("Não foi possível ler os registros");

    return "Edição concluida com êxito";
  }
  //#endregion

  //#region Exclusão de planos
  async DeletarPlano(idPlano: number): Promise<string> {
    const url: string = this.urlBase + `/${idPlano}`;

    const resposta = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });

    if (resposta.status === 401) throw new SessaoInvalidaException();
    if (resposta.status === 400 || resposta.status === 500)
      return resposta.text();
    if (!resposta.ok) throw Error("Não foi possível ler os registros");

    return "Exclusão concluida com êxito";
  }
  //#endregion
}
