using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Controllers.Financeiro
{
    [ApiController]
    [Route("api/contrato")]
    public class ContratoController : ControllerBase
    {
        private readonly IContratoService _contratoService;

        public ContratoController(IContratoService contratoService)
        {
            _contratoService = contratoService;
        }

        [HttpGet("quantidade-ativos")]
        public IActionResult QuantidadeContratosAtivos()
        {
            int? idSessao = HttpContext.Session.GetInt32("IdPessoa");

            if (idSessao == null)
                return Unauthorized();

            try
            {
                return Ok(_contratoService.QuantidadeContratosAtivos());
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

        [HttpGet("vencimento-proximo")]
        public async Task<IActionResult> ContratosProximosFim()
        {
            int? idSessao = HttpContext.Session.GetInt32("IdPessoa");

            if (idSessao == null)
                return Unauthorized();
            try
            {
                return Ok(await _contratoService.ContratosProximosFim());
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

        [HttpGet("pendentes")]
        public async Task<IActionResult> ContratosPendentes()
        {/*
            if(HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();*/

            try
            {
                return Ok(await _contratoService.ContratosPendentes());
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
