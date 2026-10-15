using PorjetoBackend_FITHUB.Models.Enums;
using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Financeiro
{
    public class Pagamento
    {
        public int Id { get;private set; }
        public Contrato Contrato { get; set; }
        public int NumeroDaParcela { get; set; }
        public decimal ValorParcela { get; set; }
        public DateTime VencimentoParcela { get; set; }
        public DateTime? DataDoPagamento { get; set; }
        public FormaPagamento FormaPagamento { get; set; }
        public StatusPagamento StatusPagamento { get; set; }

        public Pagamento() { }
    }
}
