import type { MatriculaDTO } from "../types/matricula/MatriculaDTO";

export class GlobalValidation {
  //#region Validação global da matrícula
  validacaoGlobal(matricula: MatriculaDTO): void {
    if (!matricula || typeof matricula !== "object") {
      throw new Error("Os dados da matrícula são obrigatórios.");
    }
    if (!matricula.aluno || typeof matricula.aluno !== "object") {
      throw new Error("Os dados do aluno são obrigatórios.");
    }
    if (!matricula.contrato || typeof matricula.contrato !== "object") {
      throw new Error("Os dados do contrato são obrigatórios.");
    }
    if (!matricula.pagamento || typeof matricula.pagamento !== "object") {
      throw new Error("Os dados do pagamento são obrigatórios.");
    }

    const { aluno, contrato, pagamento } = matricula;

    this.validacaoNome(aluno.nome);
    this.validacaoSenha(aluno.senha);
    this.validacaoCpf(aluno.cpf);
    this.validacaoDataNascimento(aluno.dataNascimento);
    this.validacaoCep(aluno.cep);
    this.validacaoNumeroCasa(aluno.numeroCasa);
    this.validacaoTelefone(aluno.telefone);
    this.validacaoTelefoneEmergencia(aluno.telefoneEmergencia);
    this.validacaoSexo(aluno.sexo);
    this.validacaoEmail(aluno.email);

    this.validacaoIdPlano(contrato.idPlano);
    this.validacaoTerminoContrato(contrato.termino);
    this.validacaoQuantidadeParcelas(contrato.quantidadeParcelas);

    this.validacaoFormaPagamento(pagamento.formaPagamento);
    this.validacaoVencimentoPrimeiraParcela(
      pagamento.vencimentoPrimeiraParcela,
    );
  }
  //#endregion

  //#region Validação dos dados do aluno
  validacaoNome(nome: string): void {
    if (typeof nome !== "string" || nome.trim().length < 2) {
      throw new Error("O nome do aluno deve conter pelo menos 2 caracteres.");
    }
    if (nome.trim().length > 100) {
      throw new Error("O nome do aluno deve ter no máximo 100 caracteres.");
    }
  }

  validacaoEmail(email: string): void {
    if (typeof email !== "string" || email.trim() === "") {
      throw new Error("O e-mail do aluno é obrigatório.");
    }
    if (email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error("Informe um e-mail válido com até 100 caracteres.");
    }
  }

  validacaoSenha(senha: string): void {
    if (typeof senha !== "string" || senha.length < 8) {
      throw new Error("A senha deve possuir no mínimo 8 caracteres.");
    }
    if (senha.length > 255) {
      throw new Error("A senha deve ter no máximo 255 caracteres.");
    }

    const possuiNumero = /[0-9]/.test(senha);
    const possuiLetra = /[a-zA-Z]/.test(senha);
    const possuiCaractereEspecial = /[^a-zA-Z0-9\s]/.test(senha);

    if (!possuiLetra || !possuiNumero || !possuiCaractereEspecial) {
      throw new Error(
        "A senha deve conter pelo menos uma letra, um número e um caractere especial.",
      );
    }
  }

  validacaoCpf(cpf: string): void {
    if (typeof cpf !== "string" || !/^\d{11}$/.test(cpf)) {
      throw new Error("O CPF deve conter exatamente 11 números, sem pontuação.");
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
      throw new Error("O CPF informado é inválido.");
    }

    this.validacaoDigitosCpf(cpf);
  }

  validacaoDigitosCpf(cpf: string): void {
    this.validacaoPrimeiroDigitoCpf(cpf);
    this.validacaoSegundoDigitoCpf(cpf);
  }

  validacaoPrimeiroDigitoCpf(cpf: string): void {
    let somaDigitos = 0;

    for (let i = 0; i < 9; i++) {
      somaDigitos += Number.parseInt(cpf[i], 10) * (10 - i);
    }

    const resto = somaDigitos % 11;
    const digitoVerificador = resto < 2 ? 0 : 11 - resto;

    if (digitoVerificador !== Number.parseInt(cpf[9], 10)) {
      throw new Error("O CPF informado é inválido.");
    }
  }

  validacaoSegundoDigitoCpf(cpf: string): void {
    let somaDigitos = 0;

    for (let i = 0; i < 10; i++) {
      somaDigitos += Number.parseInt(cpf[i], 10) * (11 - i);
    }

    const resto = somaDigitos % 11;
    const digitoVerificador = resto < 2 ? 0 : 11 - resto;

    if (digitoVerificador !== Number.parseInt(cpf[10], 10)) {
      throw new Error("O CPF informado é inválido.");
    }
  }

  validacaoDataNascimento(dataNascimento: string): void {
    if (!this.ehDataValida(dataNascimento)) {
      throw new Error("A data de nascimento deve ser uma data válida.");
    }

    if (dataNascimento > this.dataAtualISO()) {
      throw new Error("A data de nascimento não pode estar no futuro.");
    }
  }

  validacaoCep(cep: string): void {
    if (typeof cep !== "string" || !/^\d{8}$/.test(cep)) {
      throw new Error("O CEP deve conter exatamente 8 números, sem hífen.");
    }
  }

  validacaoNumeroCasa(numeroCasa: number): void {
    if (!Number.isSafeInteger(numeroCasa) || numeroCasa < 0) {
      throw new Error(
        "O número da residência deve ser um inteiro igual ou maior que zero.",
      );
    }
  }

  validacaoTelefone(telefone: string): void {
    this.validacaoNumeroTelefone(telefone, "O telefone do aluno");
  }

  validacaoTelefoneEmergencia(telefone: string): void {
    if (telefone.trim() === "") return;
    this.validacaoNumeroTelefone(telefone, "O telefone de emergência");
  }

  validacaoSexo(sexo: number): void {
    if (!Number.isInteger(sexo) || sexo < 0) {
      throw new Error("O sexo do aluno deve ser selecionado por um código válido.");
    }
  }
  //#endregion

  //#region Validação dos dados do contrato
  validacaoIdPlano(idPlano: number): void {
    if (!Number.isInteger(idPlano) || idPlano <= 0) {
      throw new Error("O plano da matrícula deve possuir um identificador válido.");
    }
  }

  validacaoTerminoContrato(termino: string): void {
    if (!this.ehDataValida(termino)) {
      throw new Error("A data de término do contrato deve ser uma data válida.");
    }
  }

  validacaoQuantidadeParcelas(quantidadeParcelas: number): void {
    if (
      !Number.isInteger(quantidadeParcelas) ||
      quantidadeParcelas < 1 ||
      quantidadeParcelas > 12
    ) {
      throw new Error("A quantidade de parcelas deve ser um inteiro entre 1 e 12.");
    }
  }
  //#endregion

  //#region Validação dos dados do pagamento
  validacaoFormaPagamento(formaPagamento: number): void {
    if (
      !Number.isInteger(formaPagamento) ||
      formaPagamento < 0 ||
      formaPagamento > 3
    ) {
      throw new Error("A forma de pagamento deve possuir um código válido.");
    }
  }

  validacaoVencimentoPrimeiraParcela(vencimento: string): void {
    if (!this.ehDataValida(vencimento)) {
      throw new Error("A data do primeiro vencimento deve ser uma data válida.");
    }
  }
  //#endregion

  //#region Métodos auxiliares
  private validacaoNumeroTelefone(telefone: string, campo: string): void {
    if (typeof telefone !== "string") {
      throw new Error(`${campo} deve ser informado como texto.`);
    }

    const numeros = telefone.replace(/[()\s.+-]/g, "");
    if (!/^\d{10,11}$/.test(numeros)) {
      throw new Error(`${campo} deve conter 10 ou 11 números.`);
    }
  }

  private ehDataValida(data: string): boolean {
    if (typeof data !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      return false;
    }

    const dataConvertida = new Date(`${data}T00:00:00.000Z`);
    return (
      !Number.isNaN(dataConvertida.getTime()) &&
      dataConvertida.toISOString().slice(0, 10) === data
    );
  }

  private dataAtualISO(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }
  //#endregion
}
