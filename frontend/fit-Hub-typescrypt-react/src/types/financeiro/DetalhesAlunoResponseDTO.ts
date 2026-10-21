import type { PagamentoListagemResponseDTO } from "./PagamentoListagemResponseDTO"

interface DetalhesAlunoResponseDTO{
    nomeAluno: string,
    nomePlano: string,
    dataInicioContrato: string,
    dataTerminoContrato: string,
    valorContrato: number,
    pagamentos: PagamentoListagemResponseDTO[]
}

export type {DetalhesAlunoResponseDTO}