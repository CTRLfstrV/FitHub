using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Services.Interfaces.Usuarios;
using System;

namespace PorjetoBackend_FITHUB.Controllers.Usuarios
{
    [ApiController]
    [Route("api/aluno")]
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
            try
            {
                return Ok(_alunoService.QuantidadeAlunos());
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorru um erro interno de servidor" });
            }
        }
    }
}
