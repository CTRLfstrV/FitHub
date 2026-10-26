import type { PessoaService } from "./usuarios/PessoaService";
import { type NavigateFunction } from "react-router-dom";

export class RedirecionadorService {
  private readonly sessaoService?: PessoaService;

  constructor();
  constructor(verificaSessao: PessoaService);

  constructor(verificaSessao?: PessoaService) {
    this.sessaoService = verificaSessao;
  }

  async RedirecionaPorSessao(funcaoNavegacao: NavigateFunction) {
    try {
      const resposta: boolean | undefined =
        await this.sessaoService?.VerificaSessao();

      if (!resposta) {
        funcaoNavegacao("/login");
        return;
      }
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        funcaoNavegacao("/");
      }
    }
  }

  RedirecionaPorCaminho(caminho: string, navigate: NavigateFunction) {
    navigate(caminho);
  }
}
