export class VerificacaoSessaoService {
  private readonly url: string;

  constructor() {
    this.url = "http://192.168.2.110:63367/api/Pessoa/sessao";
  }

  async VerificaSessao(): Promise<boolean> {
    const resposta = await fetch(this.url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) return false;

    if (!resposta.ok) throw new Error("Não foi possível ler a sessão");

    return true;
  }
}
