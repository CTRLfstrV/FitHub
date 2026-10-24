using System;
using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Controllers.Financeiro
{
    [ApiController]
    [Route("api/forma-pagamento")]
    public class FomaPagamentoController : ControllerBase
    {
        [HttpGet]
        public IActionResult ListarFormaPagamento()
        {
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
                return StatusCode(500, new { message = "Ocorreu um erro interno de servidor" });
            }
        }
    }
}