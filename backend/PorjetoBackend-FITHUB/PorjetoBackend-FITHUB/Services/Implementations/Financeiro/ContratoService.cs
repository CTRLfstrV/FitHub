using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Models.Enums;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;

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
                .Select(c => new ContratoProximoFimDTO(c.Id, c.Aluno.Nome, c.Plano.Nome, c.Termino))
                .ToListAsync<ContratoProximoFimDTO>();

            return contratosProximosFim;
        }

        public async Task<List<ContratoPendenteDTO>> ContratosPendentes()
        {
            List<ContratoPendenteDTO> contratosPendentes = await _fitHub.TbContrato
                .Where(c => c.StatusContrato == Models.Enums.StatusContrato.PENDENTE)
                .Select(c => new ContratoPendenteDTO(c.Aluno.Id, c.Aluno.Nome, c.Aluno.Email, c.Id, c.Plano.Nome, c.Inicio))
                .ToListAsync<ContratoPendenteDTO>();

            return contratosPendentes;
        }

        public int QuantidadeContratosAtivos()
        {
            return _fitHub.TbContrato.Count(c => c.StatusContrato == StatusContrato.ATIVO);
        }

        public int QuantidadeContratosPendentes()
        {
            return _fitHub.TbContrato.Count(c => c.StatusContrato == StatusContrato.PENDENTE);  
        }

        public async Task AtualizarStatusContrato(int idAluno)
        {
            Contrato contrato = await _fitHub.TbContrato.FirstOrDefaultAsync<Contrato>(c => c.Aluno.Id == idAluno);
            if (contrato == null)
                throw new ContratoNaoEncontradoException("Esse aluno não foi encontrado");

            contrato.StatusContrato = StatusContrato.ATIVO;

            await _fitHub.SaveChangesAsync();
        }
    }
}
