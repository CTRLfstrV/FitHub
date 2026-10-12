import { CpfValidation } from "./cpfValidation";

export class LoginValidation {
  cpfValidation : CpfValidation;
  constructor(cpfValidation: CpfValidation){
    this.cpfValidation = cpfValidation;
  }

  validacaoLogin(cpf: string, senha: string): void {
    if (cpf.trim() == null && senha.trim == null)
      throw Error("Os campos de login não podem estar vazios");
    if (cpf.trim() == null) throw Error("O campo de cpf não pode estar vazio");
    if (senha.trim() == null)
      throw Error("O campo de senha não pode estar vazio");
    this.cpfValidation.validacaoCpf(cpf);
  }
}
