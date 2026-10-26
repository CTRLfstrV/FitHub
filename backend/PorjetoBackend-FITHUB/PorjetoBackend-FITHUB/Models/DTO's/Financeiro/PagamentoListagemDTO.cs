using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public class PagamentoListagemDTO
    {
        public int Id { get; set; }
        public int NumeroParcela { get; set; }
        public decimal ValorParcela { get; set; }
        public DateTime VencimentoParcela { get; set; }
        public DateTime? DataPagamento { get; set; }
        public int StatusPagamento { get; set; }

        public PagamentoListagemDTO(int id, int numeroParcela, decimal valorParcela, DateTime vencimentoParcela, DateTime? dataPagamento, int statusPagamento)
        {
            Id = id;
            NumeroParcela = numeroParcela;
            ValorParcela = valorParcela;
            VencimentoParcela = vencimentoParcela;
            DataPagamento = dataPagamento;
            StatusPagamento = statusPagamento;
        }
    }
}
