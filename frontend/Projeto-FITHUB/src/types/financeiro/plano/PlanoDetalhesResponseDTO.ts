import type { ContratoDetalhesPlanoResponseDTO } from "./ContratoDetalhesPlanoResponseDTO";

type PlanoDetalhesResponseDTO = {
    nome: string,
    valor: number,
    contratos: ContratoDetalhesPlanoResponseDTO[]
}

export type {PlanoDetalhesResponseDTO}