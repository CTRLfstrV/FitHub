using PorjetoBackend_FITHUB.Models.DTO_s;

namespace PorjetoBackend_FITHUB.Services.Interfaces
{
    public interface ILogin
    {
        void Login(PessoaLoginDTO usuario);
    }
}
