using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record PagamentoDTO
    {
        public int IdAluno { get; set; }
        public int IdPagamento { get; set; }
        public string NomeAluno { get; set; }
        public string EmailAluno { get; set; }
        public string NomePlano { get; set; }
        public int StatusPagamento { get; set; }
        public DateTime VencimentoParcela { get; set; }

        public PagamentoDTO(int idAluno, int idPagamento, string nomeAluno, string emailAluno, string nomePlano, int statusPagamento, DateTime vencimentoParcela)
        {
            IdAluno = idAluno;
            IdPagamento = idPagamento;
            NomeAluno = nomeAluno;
            EmailAluno = emailAluno;
            NomePlano = nomePlano;
            StatusPagamento = statusPagamento;
            VencimentoParcela = vencimentoParcela;
        }
    }
}
