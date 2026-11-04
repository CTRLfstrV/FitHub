namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano
{
    public record PlanoDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public int QuantidadeMeses { get; set; }

        public PlanoDTO(Entities.Financeiro.Plano plano)
        {
            Id = plano.Id;
            Nome = plano.Nome;
            Valor = plano.Valor;
            QuantidadeMeses =  plano.QuantidadeMeses;
        }
    }
}