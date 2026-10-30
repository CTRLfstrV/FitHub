using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;

namespace PorjetoBackend_FITHUB.Controllers.Financeiro
{
    [ApiController]
    [Route("api/plano")]
    public class PlanoController : ControllerBase
    {
        private readonly IPlanoService _planoService;

        public PlanoController(IPlanoService planoService)
        {
            _planoService = planoService;
        }
        
        [HttpGet]
        public async Task<IActionResult> ListarPlanos()
        {
            int? idPessoa = HttpContext.Session.GetInt32("IdPessoa");
            if (idPessoa == null)
                return Unauthorized();
            try
            {
                return Ok(await _planoService.ListarPlanos());
            }
            catch (SqlException)
            {
                return StatusCode(500, "Ocorreu um erro no consultar banco de dados");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }

        [HttpGet("quantidade")]
        public async Task<IActionResult> ListarQuantidadePlanos()
        {
            if(HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();

            try
            {
                return Ok(await _planoService.QuntidadePlanos());
            }
            catch (SqlException)
            {
                return StatusCode(500, "Ocorreu um erro no consultar banco de dados");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }
    }
}
