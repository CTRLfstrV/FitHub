using System;
using System.ComponentModel.DataAnnotations;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Matricula
{
    public record PagamentoMatriculaResponseDTO
    {
        [Required]
        public FormaPagamento FormaPagamento { get; set; }
        [Required]
        public DateTime VencimentoPrimeiraParcela { get; set; }
    }
}