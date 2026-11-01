import type { AlunoDetalhesPlanoResponseDTO } from "./AlunoDetalhesPlanoResponseDTo"

type ContratoDetalhesPlanoResponseDTO = {
    id: number,
    inicio: string,
    termino: string
    aluno: AlunoDetalhesPlanoResponseDTO
}

export type {ContratoDetalhesPlanoResponseDTO}