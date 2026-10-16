using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Financeiro
{
    public interface IContratoService
    {
        Task<IEnumerable<Contrato>> ContratosProximosFim();
    }
}
