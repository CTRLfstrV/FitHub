interface PagamentoListagemResponseDTO {
    id: number,
    numeroParcela: number,
    valorParcela: number,
    vencimentoParcela: string | null,
    dataPagamento: string | null,
    statusPagamento: number
}

export type { PagamentoListagemResponseDTO };
