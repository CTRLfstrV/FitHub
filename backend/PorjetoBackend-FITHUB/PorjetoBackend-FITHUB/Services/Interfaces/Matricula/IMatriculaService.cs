using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Matricula
{
    public interface IMatriculaService
    {
        void MatricularAluno(MatriculaResponseDTO matricula);
        Task<Aluno> CadastrarPessoa(AlunoMatriculaResponseDTO alunoMatricula);
        void CadastrarAluno(Aluno aluno);
        Task<Contrato> CadastrarContrato(ContratoMatriculaResponseDTO contratoMatricula, Aluno aluno);
        void CadastrarPagamento(Contrato contrato);
    }
}