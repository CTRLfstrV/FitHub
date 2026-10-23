using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;
using PorjetoBackend_FITHUB.Services.Interfaces.Matricula;

namespace PorjetoBackend_FITHUB.Controllers.Matricula
{
    [ApiController]
    [Route("api/matricula")]
    public class MatriculaController : ControllerBase
    {
        private readonly IMatriculaService _matriculaService;

        public MatriculaController(IMatriculaService matriculaService)
        {
            _matriculaService = matriculaService;
        }
        
        [HttpPost]
        public IActionResult Teste([FromBody] MatriculaResponseDTO matricula)
        {
            return null;
        }
    }
}