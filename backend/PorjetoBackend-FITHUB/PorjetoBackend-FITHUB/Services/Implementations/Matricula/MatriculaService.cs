using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions;
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

        public async Task MatricularAluno(MatriculaResponseDTO matricula)
        {
            Aluno aluno = await CadastrarAluno(matricula.Aluno);
            Contrato contrato = await CadastrarContrato(matricula.Contrato, aluno);
            await CadastrarPagamento(matricula.Pagamento, contrato);
        }

        public async Task<Aluno> CadastrarAluno(AlunoMatriculaResponseDTO alunoMatricula)
        {
            Pessoa pessoa = new Aluno(alunoMatricula);
            _fitHub.TbPessoa.Add(pessoa);
            await _fitHub.SaveChangesAsync();
            Aluno pessoaAluno = pessoa as Aluno;

            return pessoaAluno;
        }

        public async Task<Contrato> CadastrarContrato(ContratoMatriculaResponseDTO contratoMatricula, Aluno aluno)
        {
            Plano planoContrato = await _fitHub.TbPlano.FirstOrDefaultAsync(p => p.Id == contratoMatricula.IdPlano);
            if (planoContrato == null)
                throw new PlanoInvalidoException("Plano inválido");
            
            Contrato contrato = new Contrato(contratoMatricula, aluno, planoContrato);
            _fitHub.TbContrato.Add(contrato);
            await _fitHub.SaveChangesAsync();
            return contrato;
        }


        public async Task CadastrarPagamento(PagamentoMatriculaResponseDTO pagamentoMatricula, Contrato contrato)
        {
            for (int i = 1; i <= contrato.QuantidadeParcelas; i++)
            {
                Pagamento pagamento = new Pagamento(pagamentoMatricula, contrato, i);
                _fitHub.TbPagamento.Add(pagamento);
            }
            
            await _fitHub.SaveChangesAsync();
        }
    }
}