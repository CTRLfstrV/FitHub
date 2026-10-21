export type PagamentoAlunoDetalhe = {
  id: number;
  numeroParcela: number;
  valorParcela: number;
  vencimentoParcela: string;
  dataPagamento: string;
  statusPagamento: number;
};

export type ContratoAlunoDetalhe = {
  nomeAluno: string;
  nomePlano: string;
  dataInicioContrato: string;
  dataTerminoContrato: string;
  valorContrato: number;
  pagamentos: PagamentoAlunoDetalhe[];
};
