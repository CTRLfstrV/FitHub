using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.DTO_s;

namespace PorjetoBackend_FITHUB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] UsuarioLoginDTO usuario)
        {
            return Ok(usuario.Cpf);
        }
    }
}
