export class SessaoService {
  private readonly urlBase: string;

  constructor() {
    this.urlBase = "http://localhost:63367/api/pessoa/sessao";//mudar o ip para localhost quando for para produção
  }

  async VerificaSessao(): Promise<boolean> {
    const resposta = await fetch(this.urlBase, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 401) return false;

    if (!resposta.ok) throw new Error("Não foi possível ler a sessão");

    return true;
  }

  async NomeUsuario(): Promise<string> {
    const url = this.urlBase + "/nome";

    const resposta = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (resposta.status === 404)
      throw Error("Nome não encontrado");

    if (!resposta.ok) throw new Error("Não foi possível ler a sessão");

    return resposta.text();
  }
}
