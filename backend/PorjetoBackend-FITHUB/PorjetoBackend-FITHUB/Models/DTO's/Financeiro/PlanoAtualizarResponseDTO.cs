namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record PlanoAtualizarResponseDTO
    {
        public string Nome { get; set; }
        public decimal Valor { get; set; }
    }
}