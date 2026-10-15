namespace PorjetoBackend_FITHUB.Models.Entities.Treinamento
{
    public class ExercicioTreino
    {
        public int Id { get; private set; }
        public Treino Treino { get; set; }
        public Equipamento Equipamento { get; set; }
        public string Nome { get; set; }
        public int Ordem { get; set; }
        public int QuantidadeSeries { get; set; }
        public decimal QuantidadePeso { get; set; }
        public int QuantidadeRepeticoes { get; set; }

        public ExercicioTreino() { }
    }
}
