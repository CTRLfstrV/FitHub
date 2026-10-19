using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Controllers.Financeiro
{
    [ApiController]
    [Route("api/pagamento")]
    public class PagamentoController : ControllerBase
    {
        private readonly IPagamentoService _pagamentoService;

        public PagamentoController(IPagamentoService pagamentoService)
        {
            _pagamentoService = pagamentoService;
        }

        [HttpGet("pagamentos")]
        public async Task<IActionResult> PegarPagamentos()
        {
            
                await _pagamentoService.VerificaPagamentos();
                List<PagamentoDTO> pagamentos = await _pagamentoService.PegarPagamentos();
                return Ok(pagamentos);
            
        }
    }
}
