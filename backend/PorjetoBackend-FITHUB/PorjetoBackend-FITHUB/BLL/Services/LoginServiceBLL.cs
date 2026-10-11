using PorjetoBackend_FITHUB.BLL.Interfaces;
using PorjetoBackend_FITHUB.Models.DTO_s;

namespace PorjetoBackend_FITHUB.BLL.Services
{
    public class LoginServiceBLL : ILoginBLL
    {
        public string Login(UsuarioLoginDTO usuario)
        {
            return usuario.Cpf;
        }
    }
}
