using PorjetoBackend_FITHUB.Models.DTO_s;

namespace PorjetoBackend_FITHUB.BLL.Interfaces
{
    public interface ILoginBLL
    {
        string Login(UsuarioLoginDTO usuario);
    }
}
