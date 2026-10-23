namespace PorjetoBackend_FITHUB.Models.DTO_s.Matricula
{
    public class MatriculaResponseDTO
    {
        public AlunoMatriculaResponseDTO Aluno { get; set; }
        public ContratoMatriculaResponseDTO Contrato { get; set; }
        public PagamentoMatriculaResponseDTO Pagamento { get; set; }
    }
}