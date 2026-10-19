interface PagamentoResponseDTO {
  id: number,
  nomeAluno: string,
  emailAluno: string,
  nomePlano: string,
  statusPagamento: number,
  vencimentoParcela: string
}

export type {PagamentoResponseDTO};
