export class CpfValidation{
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

  validacaoDigitosCpf(cpf: string): void {
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

  validacaoSegundoDigitoCpf(cpf: string): void {
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