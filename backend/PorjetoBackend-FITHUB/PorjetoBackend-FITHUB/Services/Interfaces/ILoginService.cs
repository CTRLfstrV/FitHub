using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;

namespace PorjetoBackend_FITHUB.Services.Interfaces
{
    public interface ILoginService
    {
        PessoaResponseLoginDTO Login(PessoaLoginDTO usuario);
    }
}
