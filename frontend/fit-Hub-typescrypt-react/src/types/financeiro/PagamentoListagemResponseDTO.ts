interface PagamentoListagemResponseDTO {
    id: number,
    numeroParcela: number,
    valorParcela: number,
    vencimentoParcela: string,
    dataPagamento: string,
    statusPagamento: number
}

export type { PagamentoListagemResponseDTO };
