using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.Entities.Agenda
{
    public class Agendamento
    {
        public int Id { get; private set; }
        public Aluno Aluno { get; private set; }
        public Personal Personal { get; private set; }
        public Horario Horario { get; private set; }
        public StatusAgendamento StatusAgendamento { get; set; }

        public Agendamento() { }
    }
}
