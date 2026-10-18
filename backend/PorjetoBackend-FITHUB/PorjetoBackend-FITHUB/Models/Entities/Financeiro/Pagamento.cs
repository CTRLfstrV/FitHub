using PorjetoBackend_FITHUB.Models.Enums;
using System;

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

        public Pagamento() { }
    }
}
