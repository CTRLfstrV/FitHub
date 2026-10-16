using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record ContratoProximoFimDTO
    {
        public string NomeAluno { get; set; }
        public string NomePlano { get; set; }
        public DateTime DataTermino { get; set; }

        public ContratoProximoFimDTO() { }

        public ContratoProximoFimDTO(string nomeAluno, string nomePlano, DateTime dataTermino)
        {
            NomeAluno = nomeAluno;
            NomePlano = nomePlano;
            DataTermino = dataTermino;
        }
    }
}
