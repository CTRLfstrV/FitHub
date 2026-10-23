using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;

namespace PorjetoBackend_FITHUB.Controllers.Matricula
{
    [ApiController]
    [Route("api/matricula")]
    public class MatriculaController : ControllerBase
    {
        [HttpPost]
        public IActionResult Teste([FromBody] MatriculaResponseDTO matricula)
        {
            return null;
        }
    }
}