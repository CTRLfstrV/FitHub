namespace PorjetoBackend_FITHUB.Models.Entities.Treinamento
{
    public class Equipamento
    {
        public int Id { get; private set; }
        public string Nome { get; set; }
        public int Quantidade { get; set; }
        public int QuantidadeDisponivel { get; set; }

        public Equipamento() { }
    }
}
