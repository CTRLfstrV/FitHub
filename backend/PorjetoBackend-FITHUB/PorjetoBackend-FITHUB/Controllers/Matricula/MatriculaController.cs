using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Exceptions.MatriculaExceptions;
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
        public async Task<IActionResult> MatricularAluno([FromBody] MatriculaResponseDTO matricula)
        {
            int? idPessoa = HttpContext.Session.GetInt32("IdPessoa");
            if (idPessoa == null)
                return Unauthorized();
            try
            {
                await _matriculaService.MatricularAluno(matricula);
                return Ok();
            }
            catch (SenhaInvalidaException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (CepInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (CpfInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DataNascimentoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (EmailInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NumeroCelularException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (PlanoInvalidoException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (SqlException)
            {
                return StatusCode(500, new { message = "Ocorreu um erro ao acessar o banco de dados" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu um erro interno de servidor" });
            }
        }
    }
}