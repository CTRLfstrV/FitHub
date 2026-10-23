using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Matricula
{
    public record ContratoMatriculaResponseDTO
    {
        public int IdPlano { get; set; }
        public DateTime Termino { get; set; }
        public int QuantidadeParcelas { get; set; }
    }
}