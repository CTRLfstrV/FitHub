import { GlobalValidation } from "./globalValidation";
export class LoginValidation {
  cpfValidation : GlobalValidation;
  constructor(cpfValidation: GlobalValidation){
    this.cpfValidation = cpfValidation;
  }

  validacaoLogin(cpf: string, senha: string): void {
    if (cpf.trim() === "" && senha.trim() === "")
      throw Error("Os campos de login não podem estar vazios");
    if (cpf.trim() === "") throw Error("O campo de cpf não pode estar vazio");
    if (senha.trim() === "")
      throw Error("O campo de senha não pode estar vazio");
    this.cpfValidation.validacaoCpf(cpf);
  }
}
