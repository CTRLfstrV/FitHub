using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Matricula
{
    public interface IMatriculaService
    {
        void CadastrarPessoa(MatriculaResponseDTO matricula);
        void CadastrarAluno(MatriculaResponseDTO matricula);
        void CadastrarContrato(MatriculaResponseDTO matricula);
        void CadastrarPagamento(MatriculaResponseDTO matricula);
    }
}