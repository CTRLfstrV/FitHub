using System;
using System.ComponentModel.DataAnnotations;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Matricula
{
    public record ContratoMatriculaResponseDTO
    {
        [Required]
        public int IdPlano { get; set; }
        [Required]
        public string Termino { get; set; }
        [Required]
        public int QuantidadeParcelas { get; set; }
    }
}