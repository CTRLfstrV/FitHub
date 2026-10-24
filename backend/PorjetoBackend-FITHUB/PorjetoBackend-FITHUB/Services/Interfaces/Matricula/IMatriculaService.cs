using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Models.DTO_s.Matricula;
using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Matricula
{
    public interface IMatriculaService
    {
        Task MatricularAluno(MatriculaResponseDTO matricula);
    }
}