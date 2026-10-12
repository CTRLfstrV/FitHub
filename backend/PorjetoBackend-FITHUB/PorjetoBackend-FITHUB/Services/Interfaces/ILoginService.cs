using PorjetoBackend_FITHUB.Models.DTO_s;

namespace PorjetoBackend_FITHUB.Services.Interfaces
{
    public interface ILoginService
    {
        void Login(PessoaLoginDTO usuario);
    }
}
