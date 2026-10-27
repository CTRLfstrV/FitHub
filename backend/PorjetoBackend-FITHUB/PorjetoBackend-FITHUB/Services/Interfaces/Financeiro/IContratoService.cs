using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Financeiro
{
    public interface IContratoService
    {
        Task<List<ContratoProximoFimDTO>> ContratosProximosFim();
        Task<List<ContratoPendenteDTO>> ContratosPendentes();
        Task AtualizarStatusContrato(int idAluno);
        int QuantidadeContratosAtivos();
        int QuantidadeContratosPendentes();

    }
}
