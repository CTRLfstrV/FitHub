using PorjetoBackend_FITHUB.Models.Entities.Financeiro;
using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record ContratoProximoFimDTO
    {
        public int Id { get; set; }
        public string NomeAluno { get; set; }
        public string NomePlano { get; set; }
        public DateTime DataTermino { get; set; }

        public ContratoProximoFimDTO() { }

        public ContratoProximoFimDTO(int id, string nomeAluno, string nomePlano, DateTime dataTermino)
        {
            Id = id;
            NomeAluno = nomeAluno;
            NomePlano = nomePlano;
            DataTermino = dataTermino;
        }
    }
}
