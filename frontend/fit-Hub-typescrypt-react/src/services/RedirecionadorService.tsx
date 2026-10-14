import { VerificacaoSessaoService } from "./VerificacaoSessaoService";
import { type NavigateFunction } from "react-router-dom";

export class RedirecionadorService {
  private readonly sessaoService: VerificacaoSessaoService;

  constructor(verificaSessao: VerificacaoSessaoService) {
    this.sessaoService = verificaSessao;
  }

  async RedirecionaPorSessao(
    caminhoParaIr: string,
    funcaoNavegacao: NavigateFunction,
  ) {
    try {
      const resposta: boolean = await this.sessaoService.VerificaSessao();

      if (!resposta) {
        funcaoNavegacao("/login");
        return;
      }
      if (resposta) {
        funcaoNavegacao(caminhoParaIr);
      }
    } catch (erro: unknown) {
      if (erro instanceof Error) {
        funcaoNavegacao("/");
      }
    }
  }
}
