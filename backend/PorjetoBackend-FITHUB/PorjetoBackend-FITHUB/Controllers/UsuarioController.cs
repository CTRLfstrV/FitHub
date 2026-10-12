using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.DTO_s;
using PorjetoBackend_FITHUB.Services.Interfaces;

namespace PorjetoBackend_FITHUB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly ILogin _loginService;
        public UsuarioController(ILogin loginService) 
        {
            _loginService = loginService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] PessoaLoginDTO usuario)
        {
            return Ok();
        }
    }
}
