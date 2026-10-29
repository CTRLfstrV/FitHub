using Microsoft.EntityFrameworkCore;
using PorjetoBackend_FITHUB.Data;
using PorjetoBackend_FITHUB.Models.DTO_s.Agenda;
using PorjetoBackend_FITHUB.Models.Enums;
using PorjetoBackend_FITHUB.Services.Interfaces.Agenda;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Services.Implementations.Agenda
{
    public class AgendamentoProfessorService : IAgendamentoProfessorService
    {
        private readonly FitHubDbContext _fitHub;

        public AgendamentoProfessorService(FitHubDbContext fitHub)
        {
            _fitHub = fitHub;
        }

        public Task<List<AgendamentoProfessorDTO>> ListarTreinosMarcados(int idProfessor)
        {
            DateTime agora = DateTime.Now;

            return _fitHub.TbAgendamento
                .AsNoTracking()
                .Where(agendamento =>
                    agendamento.Personal.Id == idProfessor &&
                    agendamento.StatusAgendamento == StatusAgendamento.AGENDADO &&
                    agendamento.Horario.Inicio >= agora)
                .OrderBy(agendamento => agendamento.Horario.Inicio)
                .Select(agendamento => new AgendamentoProfessorDTO(
                    agendamento.Id,
                    agendamento.Aluno.Nome,
                    agendamento.Horario.Inicio,
                    agendamento.Horario.Termino,
                    "Agendado"))
                .ToListAsync();
        }
    }
}
