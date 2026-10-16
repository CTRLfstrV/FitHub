import { VerificacaoSessaoService } from "./Usuarios/VerificacaoSessaoService";
import { type NavigateFunction } from "react-router-dom";

export class RedirecionadorService {
  private readonly sessaoService?: VerificacaoSessaoService;

  constructor();
  constructor(verificaSessao: VerificacaoSessaoService);

  
  constructor(verificaSessao?: VerificacaoSessaoService) {
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
