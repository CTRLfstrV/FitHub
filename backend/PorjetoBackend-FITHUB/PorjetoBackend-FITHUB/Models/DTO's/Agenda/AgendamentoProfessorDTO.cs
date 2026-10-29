using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Agenda
{
    public record AgendamentoProfessorDTO(
        int IdAgendamento,
        string NomeAluno,
        DateTime Inicio,
        DateTime Termino,
        string Status);
}
