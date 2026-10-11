using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.BLL.Interfaces;
using PorjetoBackend_FITHUB.Models.DTO_s;

namespace PorjetoBackend_FITHUB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly ILoginBLL _loginService;
        public UsuarioController(ILoginBLL loginService) 
        {
            _loginService = loginService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] UsuarioLoginDTO usuario)
        {
            return Ok(_loginService.Login(usuario));
        }
    }
}
