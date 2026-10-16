using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Services.Interfaces.Aluno;
using System.Linq;

namespace PorjetoBackend_FITHUB.Services.Implementations.Aluno
{
    public class AlunoService : IAlunoService
    {
        private readonly FitHubDbContext _fitHub;

        public AlunoService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public int QuantidadeAlunos()
        {
            return _fitHub.TbAluno.Count();
        }
    }
}
