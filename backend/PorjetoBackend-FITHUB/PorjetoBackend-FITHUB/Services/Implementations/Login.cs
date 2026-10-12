using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s;
using PorjetoBackend_FITHUB.Services.Interfaces;

namespace PorjetoBackend_FITHUB.Services.Implementations
{
    public class Login : ILogin
    {
        private readonly FitHubDbContext _fitHub;

        public Login(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        void ILogin.Login(PessoaLoginDTO usuario)
        {
            //Implementar lógica de acesso
        }
    }
}
