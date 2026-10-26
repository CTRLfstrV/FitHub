using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
            int? idSessao = HttpContext.Session.GetInt32("IdPessoa");

            if (idSessao == null)
                return Unauthorized();
            try
            {
                return Ok(_alunoService.QuantidadeAlunos());
            }
            catch (SqlException)
            {
                return StatusCode(500, new { message = "Ocorreu um erro no consultar banco de dados" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu um erro interno de servidor" });
            }
        }

        [HttpGet("quantidade-alunos-ativo")]
        public IActionResult QuantidadeAlunosAtivos()
        {
            try
            {
                return Ok(_alunoService.QuantidadeAlunosAtivos());
            }
            catch (SqlException)
            {
                return StatusCode(500, new { message = "Ocorreu um erro no consultar banco de dados" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu um erro interno de servidor" });
            }
        }
    }
}
