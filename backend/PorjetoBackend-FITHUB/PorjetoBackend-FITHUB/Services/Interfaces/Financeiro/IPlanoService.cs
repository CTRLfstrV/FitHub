using System.Collections.Generic;
using System.Threading.Tasks;
using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Financeiro
{
    public interface IPlanoService
    {
        Task<List<PlanoDTO>> ListarPlanos();
        Task<int> QuntidadePlanos();
        Task AdicionarPlano(PlanoResponseDTO plano);
        Task DeletarPlano(int idPlano);
        Task AtualizarPlano(int idPlano, PlanoResponseDTO plano);
    }
}