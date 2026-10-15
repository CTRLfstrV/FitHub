using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using System;
using System.Collections.Generic;

namespace PorjetoBackend_FITHUB.Models.Entities.Treinamento
{
    public class Treino
    {
        public int Id { get; private set; }
        public Aluno Aluno { get; set; }
        public Personal Personal { get; set; }
        public string Nome { get; set; }
        public DateTime DataCriacao { get; set; }
        public List<ExercicioTreino> Exercicios { get; set; } = new List<ExercicioTreino>();

        public Treino() { }
    }
}
