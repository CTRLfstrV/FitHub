export class LoginValidation {
  validacaoLogin(cpf: string, senha: string): void {
    if (cpf.trim() == null && senha.trim == null)
      throw Error("Os campos de login não podem estar vazios");
    if (cpf.trim() == null) throw Error("O campo de cpf não pode estar vazio");
    if (senha.trim() == null)
      throw Error("O campo de senha não pode estar vazio");
    this.validacaoSenha(senha);
    this.validacaoCpf(cpf);
  }

  validacaoSenha(senha: string): void {
    if (senha.length < 8) {
      throw Error("A senha deve possuir no minimo 8 caracteres");
    }

    let possuiNumero: boolean = false;
    let possuiLetra: boolean = false;
    let possuiCharEspecial: boolean = false;

    for (const caracter of senha) {
      if (/[0-9]/.test(caracter)) possuiNumero = true;
      else if (/[a-zA-Z]/.test(caracter)) possuiLetra = true;
      else possuiCharEspecial = true;
    }

    if (!(possuiCharEspecial && possuiLetra && possuiNumero))
      throw Error(
        "A senha deve possuir letras, números e caracteres especiais",
      );
  }

  validacaoCpf(cpf: string): void {
    if (cpf.length != 11) throw Error("O cpf está inválido");

    let saoIguais: boolean = true;
    let primeiroDigito: string = cpf[0];

    for (let i = 1; i < cpf.length; i++) {
      if (primeiroDigito === cpf[i]) saoIguais = true;
      else {
        saoIguais = false;
        break;
      }
    }

    if (saoIguais) throw Error("O cpf digitado é inválido");
    this.validacaoDigitosCpf(cpf);
  }

  validacaoDigitosCpf(cpf: string) {
    this.validacaoPrimeiroDigitoCpf(cpf);
    this.validacaoSegundoDigitoCpf(cpf);
  }

  validacaoPrimeiroDigitoCpf(cpf: string) {
    let somaDigitos: number = 0;

    for (let i = 0; i < 9; i++) {
      const digito: number = Number.parseInt(cpf[i]);
      somaDigitos += digito * (10 - i);
    }

    const restoDivisaoPrimeiroVerficador: number = somaDigitos % 11;
    if (restoDivisaoPrimeiroVerficador < 2) {
      if (Number.parseInt(cpf[9]) !== 0)
        throw Error("O cpf digitado é inválido");
    } else {
      if (11 - restoDivisaoPrimeiroVerficador != Number.parseInt(cpf[9]))
        throw Error("O cpf digitado é inválido");
    }
  }

  validacaoSegundoDigitoCpf(cpf: string){
    let somaDigitos: number = 0;

    for (let i = 0; i < 10; i++) {
      const digito: number = Number.parseInt(cpf[i]);
      somaDigitos += digito * (11 - i);
    }

    const restoDivisaoPrimeiroVerficador: number = somaDigitos % 11;
    if (restoDivisaoPrimeiroVerficador < 2) {
      if (Number.parseInt(cpf[10]) !== 0)
        throw Error("O cpf digitado é inválido");
    } else {
      if (11 - restoDivisaoPrimeiroVerficador != Number.parseInt(cpf[10]))
        throw Error("O cpf digitado é inválido");
    }
  }
}
