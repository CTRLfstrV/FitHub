using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Agenda
{
    public class Horario
    {
        public int Id { get; private set; }
        public DateTime Inicio { get; private set; }
        public DateTime Termino { get; private set; }

        public Horario() { }
    }
}
