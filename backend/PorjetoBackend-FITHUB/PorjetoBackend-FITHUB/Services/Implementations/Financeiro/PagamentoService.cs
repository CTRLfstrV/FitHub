using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
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

        public void VerificaPagamentos()
        {
            throw new System.NotImplementedException();
        }
    }
}
