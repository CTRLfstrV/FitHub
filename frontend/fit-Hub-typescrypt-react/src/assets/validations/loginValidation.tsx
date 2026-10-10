function validacaoLogin(cpf: string, senha: string): void {
  if (cpf.trim() == null && senha.trim == null)
    throw Error("Os campos de login não podem estar vazios");
  if (cpf.trim() == null) throw Error("O campo de cpf não pode estar vazio");
  if (senha.trim() == null)
    throw Error("O campo de senha não pode estar vazio");
  validacaoSenha(senha);
}

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
    throw Error("A senha deve possuir letras, números e caracteres especiais");
}

function validacaoCpf(cpf: string): void {
  let saoIguais: boolean = true;
  let primeiroDigito: string = cpf[0];

  for (let i = 1; i < cpf.length; i++) {
    if (primeiroDigito === cpf[i]) saoIguais = true;
    else {
      saoIguais = false;
      break;
    }
  }

  if(saoIguais)
    throw Error("O cpf digitado é inválido");
}
