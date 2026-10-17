import { SessaoService } from "./usuarios/SessaoService";
import { type NavigateFunction } from "react-router-dom";

export class RedirecionadorService {
  private readonly sessaoService?: SessaoService;

  constructor();
  constructor(verificaSessao: SessaoService);

  
  constructor(verificaSessao?: SessaoService) {
    this.sessaoService = verificaSessao;
  }

  async RedirecionaPorSessao(funcaoNavegacao: NavigateFunction) {
    try {
      const resposta: boolean | undefined = await this.sessaoService?.VerificaSessao();

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
