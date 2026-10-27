using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;
using PorjetoBackend_FITHUB.Services.Interfaces.Usuarios;

namespace PorjetoBackend_FITHUB.Services.Implementations.Usuarios
{
    public class PessoaService : IPessoaService
    {
        private readonly FitHubDbContext _fitHub;

        public PessoaService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }
        
        public async Task<PessoaDadosResponse> RetornaDadosPessoa(int idPessoa)
        {
            PessoaDadosResponse dadosPessoa = await _fitHub.TbPessoa.Select(p => new PessoaDadosResponse(p))
                .FirstOrDefaultAsync<PessoaDadosResponse>(p => p.Id == idPessoa);

            if (dadosPessoa == null)
                throw new PessoaNaoEncontradaException("Não foi possível pegar os dados dessa pessoa");
            
            return dadosPessoa;
        }
    }
}