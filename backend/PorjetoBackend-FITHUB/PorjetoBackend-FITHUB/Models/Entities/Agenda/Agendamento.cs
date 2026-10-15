using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.Entities.Agenda
{
    public class Agendamento
    {
        public int Id { get; private set; }
        public Aluno Aluno { get; set; }
        public Personal Personal { get; set; }
        public Horario Horario { get; set; }
        public StatusAgendamento StatusAgendamento { get; set; }

        public Agendamento() { }
    }
}
