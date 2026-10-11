using Microsoft.AspNetCore.Mvc;

namespace PorjetoBackend_FITHUB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            return Ok("Tudo certo");
        }
    }
}
