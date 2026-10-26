interface PagamentoResponseDTO {
  idAluno: number,
  idPagamento: number,
  nomeAluno: string,
  emailAluno: string,
  nomePlano: string,
  statusPagamento: number,
  vencimentoParcela: string
}

export type {PagamentoResponseDTO};
