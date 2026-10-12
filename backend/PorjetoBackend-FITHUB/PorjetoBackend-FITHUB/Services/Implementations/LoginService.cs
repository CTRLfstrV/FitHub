using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Services.Interfaces;
using System.Linq;

namespace PorjetoBackend_FITHUB.Services.Implementations
{
    public class LoginService : ILoginService
    {
        private readonly FitHubDbContext _fitHub;

        public LoginService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public void Login(PessoaLoginDTO usuario)
        {
            Pessoa pessoa = _fitHub.TbPessoa.FirstOrDefault(p => p.Cpf == usuario.Cpf);
        }
    }
}
