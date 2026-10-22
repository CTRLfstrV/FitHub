import { SessaoService } from "./SessaoService";

/** Operações de sessão usadas pela área do personal. */
export class PersonalService {
  private readonly sessaoService = new SessaoService();

  verificaSessao(): Promise<boolean> {
    return this.sessaoService.VerificaSessao();
  }

  nomeUsuario(): Promise<string> {
    return this.sessaoService.NomeUsuario();
  }
}
