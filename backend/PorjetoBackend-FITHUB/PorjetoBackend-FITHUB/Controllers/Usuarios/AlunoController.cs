using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Services.Interfaces.Usuarios;

namespace PorjetoBackend_FITHUB.Controllers.Usuarios
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly IAlunoService _alunoService;

        public AlunoController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet("quantidade-alunos")]
        public IActionResult QuantidadeAlunos()
        {
            return Ok(_alunoService.QuantidadeAlunos());
        }
    }
}
