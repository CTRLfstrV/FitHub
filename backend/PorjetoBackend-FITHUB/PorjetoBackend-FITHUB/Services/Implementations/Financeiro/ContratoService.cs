using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Exceptions;
using PorjetoBackend_FITHUB.Models.Enums;
using PorjetoBackend_FITHUB.Exceptions.ContratoExceptions;
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

        public async Task AtualizarStatusContrato(int idContrato, int novoStatus)
        {
            if (idContrato < 1)
                throw new ContratoNaoEncontradoException("O id informado é inválido");
            if (novoStatus < 0 ||  novoStatus > 2)
                throw new StatusContratoInvalidoException("O status do contrato está inválido");
            
            Contrato contrato = await _fitHub.TbContrato.FirstOrDefaultAsync<Contrato>(c => c.Id == idContrato);
            if (contrato == null)
                throw new ContratoNaoEncontradoException("Contrato não encontrado");
            
            contrato.StatusContrato = (StatusContrato)novoStatus;
            await _fitHub.SaveChangesAsync();
        }
    }
}
