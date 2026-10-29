using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PorjetoBackend_FITHUB.Models.Enums;
using PorjetoBackend_FITHUB.Services.Interfaces.Agenda;
using System;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Controllers.Agenda
{
    [ApiController]
    [Route("api/agendamento")]
    public class AgendamentoProfessorController : ControllerBase
    {
        private readonly IAgendamentoProfessorService _agendamentoService;

        public AgendamentoProfessorController(IAgendamentoProfessorService agendamentoService)
        {
            _agendamentoService = agendamentoService;
        }

        [HttpGet("professor/treinos-marcados")]
        public async Task<IActionResult> ListarTreinosMarcados()
        {
            int? idPessoa = HttpContext.Session.GetInt32("IdPessoa");
            int? tipoPessoa = HttpContext.Session.GetInt32("TipoPessoa");

            if (idPessoa == null)
                return Unauthorized();

            if (tipoPessoa != (int)TipoPessoa.PROFESSOR)
                return Forbid();

            try
            {
                return Ok(await _agendamentoService.ListarTreinosMarcados(idPessoa.Value));
            }
            catch (SqlException)
            {
                return StatusCode(500, "Ocorreu um erro ao consultar o banco de dados");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }
    }
}