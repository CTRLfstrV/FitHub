namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record PagamentoDTO
    {
        public int Id { get; set; }
        public string NomeAluno { get; set; }
        public string EmailAluno { get; set; }
        public string NomePlano { get; set; }
        public int StatusPagamento { get; set; }

        public PagamentoDTO(int id, string nomeAluno, string emailAluno, string nomePlano, int statusPagamento)
        {
            Id = id;
            NomeAluno = nomeAluno;
            EmailAluno = emailAluno;
            NomePlano = nomePlano;
            StatusPagamento = statusPagamento;
        }
    }
}
