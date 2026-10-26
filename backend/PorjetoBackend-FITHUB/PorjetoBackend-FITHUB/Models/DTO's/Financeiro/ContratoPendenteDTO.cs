using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro
{
    public record ContratoPendenteDTO
    {
        public int IdAluno { get; set; }
        public string NomeAluno { get; set; }
        public string EmailAluno { get; set; }
        public int IdContrato { get; set; }
        public string NomePlano { get; set; }
        public DateTime DataInicio { get; set; }

        public ContratoPendenteDTO(int idAluno, string nomeAluno, string emailAluno, int idContrato, string nomePlano,
            DateTime dataInicio)
        {
            IdAluno = idAluno;
            NomeAluno = nomeAluno;
            EmailAluno = emailAluno;
            IdContrato = idContrato;
            IdContrato = idContrato;
            NomePlano = nomePlano;
            DataInicio = dataInicio;
        }
    }
}