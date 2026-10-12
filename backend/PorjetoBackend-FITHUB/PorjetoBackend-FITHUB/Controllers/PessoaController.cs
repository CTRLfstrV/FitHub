using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.DTO_s;
using PorjetoBackend_FITHUB.Services.Interfaces;

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
            PessoaResponseLoginDTO pessoaResponse = _loginService.Login(usuario);

            HttpContext.Session.SetInt32("IdPessoa", pessoaResponse.Id);
            HttpContext.Session.SetInt32("TipoPessoa", (int)pessoaResponse.TipoPessoa);

            return Ok(pessoaResponse);
        }
    }
}
