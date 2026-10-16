using Microsoft.AspNetCore.Mvc;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Controllers.Financeiro
{
    [ApiController]
    [Route("api/contrato")]
    public class ContratoController : ControllerBase
    {
        private readonly IContratoService _contratoService;

        public ContratoController(IContratoService contratoService)
        {
            _contratoService = contratoService;
        }

        [HttpGet("contratos-proximos-fim")]
        public async Task<IActionResult> ContratosProximosFim()
        {
            try
            {
                List<Contrato> contratosProximoFim = await _contratoService.ContratosProximosFim();
                IEnumerable<ContratoProximoFimDTO> contratosProximoFimDto = contratosProximoFim.Select(c => new ContratoProximoFimDTO(c));

                return Ok(contratosProximoFimDto);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Ocorru um erro interno de servidor" });
            }
        }
    }
}
