import type { AlunoMatriculaDTO } from "./AlunoMatriculaDTO"
import type { ContratoMatriculaDTO } from "./ContratoMatriculaDTO"
import type { PagamentoMatriculaDTO } from "./PagamentoMatriculaDTO"

interface MatriculaDTO{
    aluno: AlunoMatriculaDTO,
    contrato: ContratoMatriculaDTO,
    pagamento: PagamentoMatriculaDTO
}

export type {MatriculaDTO}