using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Exceptions.PlanoExceptions;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
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

        public async Task<List<PlanoDTO>> ListarPlanos()
        {
            List<PlanoDTO> planos = await _fitHub.TbPlano.OrderBy(p => p.Valor).Select(p => new PlanoDTO(p)).ToListAsync<PlanoDTO>();

            return planos;
        }

        public async Task<int> QuntidadePlanos()
        {
            int quantidadePlanos = await _fitHub.TbPlano.CountAsync();

            return quantidadePlanos;
        }

        public async Task<PlanoDetalhesDTO> DetalhesPlano(int id)
        {
            if (id <= 0)
                throw new IdPlanoInvalidoException("O id do plano está inválido");

            PlanoDetalhesDTO planoDetalhes = await _fitHub.TbPlano.Where(p => p.Id == id)
                .Select(p =>
                    new PlanoDetalhesDTO(p.Nome, p.Valor,
                        p.Contratos.Select(c =>
                                new ContratoDetalhesPlanoDTO(c.Inicio, c.Termino,
                                    new AlunoDetalhesPlanoDTO(c.Aluno.Nome, c.Aluno.Email)))
                            .ToList()
                    ))
                .FirstOrDefaultAsync<PlanoDetalhesDTO>();
            
            if (planoDetalhes == null)
                throw new PlanoNaoEncontradoException("Não foi possível encontrar os detalhes desse plano");
            
            return planoDetalhes;
        }

        public async Task AdicionarPlano(PlanoResponseDTO planoNovo)
        {
            Plano plano = new Plano(planoNovo);
            await _fitHub.TbPlano.AddAsync(plano);

            await _fitHub.SaveChangesAsync();
        }

        public async Task DeletarPlano(int idPlano)
        {
            Plano plano = await _fitHub.TbPlano.FirstOrDefaultAsync(p => p.Id == idPlano);
            _fitHub.TbPlano.Remove(plano);

            await _fitHub.SaveChangesAsync();
        }

        public async Task AtualizarPlano(int idPlano, PlanoResponseDTO planoAtualizado)
        {
            Plano plano = await _fitHub.TbPlano.FirstOrDefaultAsync(p => p.Id == idPlano);
            plano.Nome = planoAtualizado.Nome;
            plano.Valor = planoAtualizado.Valor;

            await _fitHub.SaveChangesAsync();
        }
    }
}