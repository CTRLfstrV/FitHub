import type { PagamentoListagemResponseDTO } from "./PagamentoListagemResponseDTO"

interface DetalhesAlunoResponseDTO{
    nomeAluno: string,
    nomePlano: string,
    dataInicioContrato: string | null,
    dataTerminoContrato: string | null,
    valorContrato: number,
    pagamentos: PagamentoListagemResponseDTO[]
}

export type {DetalhesAlunoResponseDTO}
