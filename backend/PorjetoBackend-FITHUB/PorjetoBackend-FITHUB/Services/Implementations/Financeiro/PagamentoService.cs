using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using PorjetoBackend_FITHUB.Models.Enums;
using PorjetoBackend_FITHUB.Services.Interfaces.Financeiro;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<List<PagamentoDTO>> PegarPagamentos()
        {
            List<PagamentoDTO> pagamentos = await _fitHub.TbPagamento
                .Where(p => p.Contrato.StatusContrato == StatusContrato.ATIVO)
                .OrderBy(p => p.StatusPagamento)
                .Select(p => new PagamentoDTO(p.Contrato.Aluno.Id, p.Id, p.Contrato.Aluno.Nome, p.Contrato.Aluno.Email, p.Contrato.Plano.Nome, (int)p.StatusPagamento, p.VencimentoParcela.Date))
                .ToListAsync<PagamentoDTO>();

            return pagamentos;
        }

        public async Task<PagamentoAlunoDTO> PegarPagamentosDoApartirDeId(int id)
        {
            PagamentoAlunoDTO pagamentoAluno = await _fitHub.TbPagamento
                .Where(p => p.Contrato.Aluno.Id == id)
                .Select(p => new PagamentoAlunoDTO(p.Contrato.Aluno.Nome, p.Contrato.Plano.Nome, p.Contrato.Inicio, p.Contrato.Termino, p.Contrato.Valor,
                p.Contrato.Pagamentos.Select(
                    p => new PagamentoListagemDTO(p.Id, p.NumeroDaParcela, p.ValorParcela, p.VencimentoParcela, p.DataDoPagamento, (int)p.StatusPagamento)
                    ).ToList<PagamentoListagemDTO>()
                )).FirstAsync<PagamentoAlunoDTO>();

            return pagamentoAluno;
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
