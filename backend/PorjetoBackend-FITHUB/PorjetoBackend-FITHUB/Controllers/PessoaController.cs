using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Models.DTO_s;
using PorjetoBackend_FITHUB.Services.Interfaces;
using System;

namespace PorjetoBackend_FITHUB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly ILoginService _loginService;
        public PessoaController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] PessoaLoginDTO usuario)
        {
            try
            {
                PessoaResponseLoginDTO pessoaResponse = _loginService.Login(usuario);

                HttpContext.Session.SetInt32("IdPessoa", pessoaResponse.Id);
                HttpContext.Session.SetInt32("TipoPessoa", (int)pessoaResponse.TipoPessoa);

                return Ok(pessoaResponse);
            }
            catch (PessoaNaoEncontradaException ex)
            {
                return StatusCode(404, new { message = ex.Message });
            }
            catch (SenhaInvalidaException ex)
            {
                return StatusCode(400, new { message = ex.Message });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu erro interno de servidor" });
            }
        }
    }
}
