using PorjetoBackend_FITHUB.Models.DTO_s.Financeiro;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PorjetoBackend_FITHUB.Services.Interfaces.Financeiro
{
    public interface IPagamentoService
    {
        Task VerificaPagamentos();
        Task<List<PagamentoDTO>> PegarPagamentos();
        Task<PagamentoAlunoDTO> PegarPagamentosDoApartirDeId(int id);
    }
}
