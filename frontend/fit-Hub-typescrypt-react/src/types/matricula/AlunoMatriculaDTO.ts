interface AlunoMatriculaDTO{
    nome: string,
    senha: string,
    cpf: string,
    dataNascimento: string,
    cep: string,
    numeroCasa: string,
    telefone: string,
    telefoneEmergencia: string | null,
    sexo: number,
    email: string
}

export type {AlunoMatriculaDTO}