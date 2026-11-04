namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano
{
    public record PlanoResponseDTO
    {
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public int QuantidadeMeses { get; set; }
    }
}