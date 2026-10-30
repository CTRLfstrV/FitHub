using PorjetoBackend_FITHUB.Models.Entities.Financeiro;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record PlanoDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }

        public PlanoDTO(Plano plano)
        {
            Id = plano.Id;
            Nome = plano.Nome;
            Valor = plano.Valor;
        }
    }
}