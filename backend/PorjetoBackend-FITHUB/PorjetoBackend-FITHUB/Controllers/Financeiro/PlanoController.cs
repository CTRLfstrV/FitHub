using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Exceptions.PlanoExceptions;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano;
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

        [HttpGet("{id}")]
        public async Task<IActionResult> DetalhesPlano([FromRoute] int id)
        {
            if (HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();
            try
            {
                return Ok(await _planoService.DetalhesPlano(id));
            }
            catch (IdPlanoInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (PlanoNaoEncontradoException ex)
            {
                return BadRequest(ex.Message);
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

        [HttpPost]
        public async Task<IActionResult> AdicionarPlano([FromBody] PlanoResponseDTO plano)
        {
            if (HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();
            
            try
            {
                await _planoService.AdicionarPlano(plano);
                return Ok();
            }
            catch (NomePlanoInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ValorPlanoInvalidoException ex)
            {
                return BadRequest(ex.Message);
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletarPlano([FromRoute] int id)
        {
            if (HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();

            try
            {
                await _planoService.DeletarPlano(id);
                
                return Ok();
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlEx && sqlEx.Number == 547)
                    return BadRequest("Há contratos vinculados com o plano");
                
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> AtualizarPlano([FromRoute] int id, [FromBody] PlanoResponseDTO plano)
        {
            if (HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();

            try
            {
                await _planoService.AtualizarPlano(id, plano);

                return Ok();
            }
            catch (NomePlanoInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ValorPlanoInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DbUpdateException ex) when (ex.InnerException is SqlException)
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
