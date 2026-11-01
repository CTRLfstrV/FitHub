interface ContratoPlanoResponseDTO {
  incio: string;
  termino: string;
  aluno: {
    nome: string;
    email: string;
  };
}

interface DetalhesPlanoResponseDTO {
  nome: string;
  valor: number;
  contratos: ContratoPlanoResponseDTO[];
}

export type { ContratoPlanoResponseDTO, DetalhesPlanoResponseDTO };
