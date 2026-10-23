using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;
using PorjetoBackend_FITHUB.Services.Interfaces.Matricula;

namespace PorjetoBackend_FITHUB.Services.Implementations.Matricula
{
    public class MatriculaService : IMatriculaService
    {
        private readonly FitHubDbContext _fitHub;

        public MatriculaService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public void CadastrarPessoa(MatriculaResponseDTO matricula)
        {
            throw new System.NotImplementedException();
        }

        public void CadastrarAluno(MatriculaResponseDTO matricula)
        {
            throw new System.NotImplementedException();
        }

        public void CadastrarContrato(MatriculaResponseDTO matricula)
        {
            throw new System.NotImplementedException();
        }

        public void CadastrarPagamento(MatriculaResponseDTO matricula)
        {
            throw new System.NotImplementedException();
        }
    }
}