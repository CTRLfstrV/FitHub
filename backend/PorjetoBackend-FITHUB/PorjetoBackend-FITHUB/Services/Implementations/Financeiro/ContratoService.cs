using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Services.Implementations.Financeiro
{
    public class ContratoService : IContratoService
    {
        private readonly FitHubDbContext _fitHub;

        public ContratoService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public async Task<List<ContratoProximoFimDTO>> ContratosProximosFim()
        {
            DateTime hoje = DateTime.Today;
            DateTime limite = hoje.AddDays(15);

            List<ContratoProximoFimDTO> contratosProximosFim = await _fitHub.TbContrato
                .Where(
                    c =>
                    c.StatusContrato == Models.Enums.StatusContrato.ATIVO &&
                    c.Termino >= hoje && c.Termino < limite.AddDays(1)
                 )
                .Select(c => new ContratoProximoFimDTO(c.Aluno.Nome, c.Plano.Nome, c.Termino))
                .ToListAsync<ContratoProximoFimDTO>();

            return contratosProximosFim;
        }

        public int QuantidadeContratosAtivos()
        {
            return _fitHub.TbContrato.Where(c => c.StatusContrato == Models.Enums.StatusContrato.ATIVO).Count();
        }
    }
}
