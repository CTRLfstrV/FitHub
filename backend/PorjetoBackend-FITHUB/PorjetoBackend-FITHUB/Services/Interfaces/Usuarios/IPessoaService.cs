using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Usuarios
{
    public interface IPessoaService
    {
        Task<PessoaDadosResponse>  RetornaDadosPessoa(int idPessoa);
        Task AlterarSenha(int idPessoa, AlteracaoSenhaDTO alteracaoSenha);
    }
}