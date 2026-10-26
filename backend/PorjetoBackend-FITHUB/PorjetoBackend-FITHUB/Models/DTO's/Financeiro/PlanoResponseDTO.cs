using PorjetoBackend_FITHUB.Models.Entities.Financeiro;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record PlanoResponseDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }

        public PlanoResponseDTO(Plano plano)
        {
            Id = plano.Id;
            Nome = plano.Nome;
            Valor = plano.Valor;
        }
    }
}