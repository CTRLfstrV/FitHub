using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
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

        public async void MatricularAluno(MatriculaResponseDTO matricula)
        {
            var aluno = await CadastrarPessoa(matricula.Aluno);
            CadastrarAluno(aluno);
            var contrato = await CadastrarContrato(matricula.Contrato, aluno);
            CadastrarPagamento(contrato);
        }

        public async Task<Aluno> CadastrarPessoa(AlunoMatriculaResponseDTO alunoMatricula)
        {
            Pessoa pessoa = new Aluno(alunoMatricula);
            _fitHub.TbPessoa.Add(pessoa);
            await _fitHub.SaveChangesAsync();
            var pessoaAluno = pessoa as Aluno;
            
            return pessoaAluno;
        }

        public async void CadastrarAluno(Aluno aluno)
        {
            _fitHub.TbAluno.Add(aluno);
            await _fitHub.SaveChangesAsync();
        }

        public async Task<Contrato> CadastrarContrato(ContratoMatriculaResponseDTO contratoMatricula, Aluno aluno)
        {
            throw new System.NotImplementedException();
        }


        public async void CadastrarPagamento(Contrato contrato)
        {
            throw new System.NotImplementedException();
        }
    }
}