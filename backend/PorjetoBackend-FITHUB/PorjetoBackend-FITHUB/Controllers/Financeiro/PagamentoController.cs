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
    [Route("api/pagamento/")]
    public class PagamentoController : ControllerBase
    {
        private readonly IPagamentoService _pagamentoService;

        public PagamentoController(IPagamentoService pagamentoService)
        {
            _pagamentoService = pagamentoService;
        }

        [HttpGet]
        public async Task<IActionResult> PegarPagamentos()
        {
            int? idSessao = HttpContext.Session.GetInt32("IdPessoa");

            if (idSessao == null)
                return Unauthorized();
            try
            {
                await _pagamentoService.VerificaPagamentos();
                List<PagamentoDTO> pagamentos = await _pagamentoService.PegarPagamentos();
                return Ok(pagamentos);
            }
            catch (SqlException)
            {
                return StatusCode(500, new { message = "Ocorreu um erro no consultar banco de dados" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu um erro interno no servidor" });
            }
        }

        [HttpGet("detalhes-aluno/{idAluno}")]
        public async Task<IActionResult> PegarDetalhesPagamentoAlunoId([FromRoute] int idAluno)
        {
            int? idSessao = HttpContext.Session.GetInt32("IdPessoa");

            if (idSessao == null)
                return Unauthorized();
            try
            {
                PagamentoAlunoDTO pagamentoAluno = await _pagamentoService.PegarPagamentosDoApartirDeId(idAluno);
                return Ok(pagamentoAluno);
            }
            catch (SqlException)
            {
                return StatusCode(500, new { message = "Ocorreu um erro no consultar banco de dados" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorreu um erro interno no servidor" });
            }
        }
    }
}
