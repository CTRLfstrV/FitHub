using System;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Matricula
{
    public record PagamentoMatriculaResponseDTO
    {
        public FormaPagamento FormaPagamento { get; set; }
        public DateTime VencimentoPrimeiraParcela { get; set; }
    }
}