using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Models.Enums;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Services.Implementations.Financeiro
{
    public class PagamentoService : IPagamentoService
    {
        private readonly FitHubDbContext _fitHub;


        public PagamentoService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public Task<List<PagamentoDTO>> PegarPagamentos()
        {
            throw new System.NotImplementedException();
        }

        public async Task VerificaPagamentos()
        {
            foreach (var pagamento in _fitHub.TbPagamento)
            {
                if (pagamento.DataDoPagamento != null)
                    pagamento.StatusPagamento = StatusPagamento.PAGO;
                else if (pagamento.VencimentoParcela < DateTime.Today)
                    pagamento.StatusPagamento = StatusPagamento.NAO_PAGO;
                else
                    pagamento.StatusPagamento = StatusPagamento.PENDENTE;
            }

            await _fitHub.SaveChangesAsync();
        }
    }
}
