using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;
using PorjetoBackend_FITHUB.Services.Interfaces;
using System;
using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Models.Enums;
using PorjetoBackend_FITHUB.Services.Interfaces.Usuarios;

namespace PorjetoBackend_FITHUB.Controllers.Usuarios
{
    [ApiController]
    [Route("api/pessoa")]
    public class PessoaController : ControllerBase
    {
        private readonly ILoginService _loginService;
        private readonly IPessoaService _pessoaService;

        public PessoaController(ILoginService loginService, IPessoaService pessoaService)
        {
            _loginService = loginService;
            _pessoaService = pessoaService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] PessoaLoginDTO usuario)
        {
            try
            {
                PessoaResponseLoginDTO pessoaResponse = _loginService.Login(usuario);

                HttpContext.Session.SetInt32("IdPessoa", pessoaResponse.Id);
                HttpContext.Session.SetString("NomePessoa", pessoaResponse.Nome);
                HttpContext.Session.SetInt32("TipoPessoa", (int)pessoaResponse.TipoPessoa);

                return Ok(pessoaResponse.TipoPessoa);
            }
            catch (PessoaNaoEncontradaException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (SenhaInvalidaException ex)
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

        [HttpGet("sessao")]
        public IActionResult VerificaSessao()
        {
            int? idPessoa = HttpContext.Session.GetInt32("IdPessoa");

            if (idPessoa == null)
                return Unauthorized();

            return Ok();
        }

        [HttpGet("sessao/nome")]
        public IActionResult RetornaNomePessoa()
        {
            string nomePessoa = HttpContext.Session.GetString("NomePessoa");

            if (nomePessoa == null)
                return NotFound();

            return Ok(nomePessoa);
        }

        [HttpGet("sexo")]
        public IActionResult ListarSexo()
        {
            if (HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();
            try
            {
                var sexos = new[]
                {
                    new { sexo = SexoPessoa.MASCULINO, descricao = "Masculino" },
                    new { sexo = SexoPessoa.FEMININO, descricao = "Feminino" },
                };

                return Ok(sexos);
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }

        [HttpDelete]
        public IActionResult Logout()
        {
            try
            {
                HttpContext.Session.Clear();
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }

        [HttpGet("dados")]
        public async Task<IActionResult> RetornaDadosPessoa()
        {
            int? idPessoa = HttpContext.Session.GetInt32("IdPessoa");
            if (idPessoa == null)
                return Unauthorized();

            try
            {
                return Ok(await _pessoaService.RetornaDadosPessoa((int)idPessoa));
            }
            catch (PessoaNaoEncontradaException ex)
            {
                return NotFound(ex.Message);
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

        [HttpPut("alterar-senha")]
        public async Task<IActionResult> AlterarSenha([FromBody] AlteracaoSenhaDTO alteracaoSenha)
        {
            int? idPessoa = HttpContext.Session.GetInt32("IdPessoa");
            if (idPessoa == null)
                return Unauthorized();
            try
            {
                await _pessoaService.AlterarSenha((int)idPessoa, alteracaoSenha);
                return Ok();
            }
            catch (SenhaInvalidaException ex)
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
    }
}