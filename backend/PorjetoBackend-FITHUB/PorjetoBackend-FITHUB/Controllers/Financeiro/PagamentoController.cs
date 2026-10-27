using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Models.Enums;

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
                return StatusCode(500, "Ocorreu um erro no consultar banco de dados");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }

        [HttpGet("detalhes")]
        public async Task<IActionResult> PegarDetalhesPagamentoAlunoId([FromQuery] int idAluno)
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
                return StatusCode(500, "Ocorreu um erro no consultar banco de dados");
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }

        [HttpGet("formas")]
        public IActionResult ListarFormaPagamento()
        {
            if(HttpContext.Session.GetInt32("IdPessoa") == null)
                return Unauthorized();
            try
            {
                var formasPagamento = new[]
                {
                    new { formaPagamento = FormaPagamento.DINHEIRO, descricao = "Pague com dinheiro à vista" },
                    new { formaPagamento = FormaPagamento.PIX, descricao = "Pague com PIX à vista" },
                    new
                    {
                        formaPagamento = FormaPagamento.CARTAO_CREDITO,
                        descricao = "Pague no cartão de crédito com prazo"
                    },
                    new
                    {
                        formaPagamento = FormaPagamento.CARTAO_DEBITO, descricao = "Pague no cartão de débito à vista"
                    }
                };
                return Ok(formasPagamento);
            }
            catch (Exception)
            {
                return StatusCode(500, "Ocorreu um erro interno de servidor");
            }
        }
    }
}
