using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;

namespace PorjetoBackend_FITHUB.Services.Implementations.Financeiro
{
    public class PlanoService : IPlanoService
    {
        private readonly FitHubDbContext _fitHub;

        public PlanoService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }
        
        public async Task<List<PlanoResponseDTO>> ListarPlanos()
        {
            List<PlanoResponseDTO> planos= await _fitHub.TbPlano.Select(p => new PlanoResponseDTO(p)).ToListAsync<PlanoResponseDTO>();

            return planos;
        }
    }
}