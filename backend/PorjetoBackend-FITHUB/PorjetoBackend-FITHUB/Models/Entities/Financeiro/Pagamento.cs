using PorjetoBackend_FITHUB.Models.Enums;
using System;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;

namespace PorjetoBackend_FITHUB.Models.Entities.Financeiro
{
    public class Pagamento
    {
        public int Id { get; private set; }
        public Contrato Contrato { get; private set; }
        public int NumeroDaParcela { get; private set; }
        public decimal ValorParcela { get; private set; }
        public DateTime VencimentoParcela { get; private set; }
        public DateTime? DataDoPagamento { get; set; }
        public FormaPagamento FormaPagamento { get; set; }
        public StatusPagamento StatusPagamento { get; set; }

        public Pagamento()
        {
        }

        public Pagamento(PagamentoMatriculaResponseDTO pagamentoMatricula, Contrato contrato, int numeroDaParcela)
        {
            decimal valorBaseParcela = Math.Round(contrato.Valor / contrato.QuantidadeParcelas, 2,
                MidpointRounding.AwayFromZero);

            Contrato = contrato;
            NumeroDaParcela = numeroDaParcela;
            ValorParcela = numeroDaParcela < contrato.QuantidadeParcelas
                ? valorBaseParcela
                : contrato.Valor - valorBaseParcela * (contrato.QuantidadeParcelas - 1);

            VencimentoParcela = pagamentoMatricula.VencimentoPrimeiraParcela.AddMonths(numeroDaParcela - 1);
            FormaPagamento = pagamentoMatricula.FormaPagamento;
            StatusPagamento = StatusPagamento.PENDENTE;
        }
    }
}