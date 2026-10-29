import type { AlteracaoDadosDTO } from "../types/usuarios/AlteracaoDadosDTO";

export class AlteracaoDadosValidation {
  validacaoAlteracaoDados(novosDados: AlteracaoDadosDTO): void {
    if (!novosDados || typeof novosDados !== "object") {
      throw new Error("Informe os dados que deseja alterar.");
    }

    this.validacaoNome(novosDados.novoNome);
    this.validacaoEmail(novosDados.novoEmail);
    this.validacaoTelefone(novosDados.novoTelefone);
  }

  private validacaoNome(nome: string): void {
    if (typeof nome !== "string" || nome.trim().length < 2) {
      throw new Error("O nome completo deve conter pelo menos 2 caracteres.");
    }
    if (nome.trim().length > 100) {
      throw new Error("O nome completo deve ter no máximo 100 caracteres.");
    }
  }

  private validacaoEmail(email: string): void {
    if (typeof email !== "string" || email.trim() === "") {
      throw new Error("O e-mail é obrigatório.");
    }
    if (
      email.trim().length > 100 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      throw new Error("Informe um e-mail válido com até 100 caracteres.");
    }
  }

  private validacaoTelefone(telefone: string): void {
    if (typeof telefone !== "string") {
      throw new Error("O telefone deve ser informado como texto.");
    }
    if (telefone.length > 20 || !/^[\d()\s.+-]+$/.test(telefone)) {
      throw new Error("Informe um telefone válido com DDD.");
    }

    const numeros = telefone.replace(/[()\s.+-]/g, "");
    if (!/^\d{10,11}$/.test(numeros)) {
      throw new Error("O telefone deve conter DDD e 10 ou 11 números.");
    }
  }
}
