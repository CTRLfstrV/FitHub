 function validacaoSenha(senha: string): void {
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

  export default validacaoSenha;