using PorjetoBackend_FITHUB.Models.DTO_s.Agenda;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Agenda
{
    public interface IAgendamentoProfessorService
    {
        Task<List<AgendamentoProfessorDTO>> ListarTreinosMarcados(int idProfessor);
    }
}