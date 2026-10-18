using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Treinamento
{
    public class Sessao
    {
        public int Id { get; private set; }
        public Treino Treino { get; private set; }
        public DateTime Inicio { get; private set; }
        public DateTime? Termino { get; set; }

        public Sessao() { }
    }
}
