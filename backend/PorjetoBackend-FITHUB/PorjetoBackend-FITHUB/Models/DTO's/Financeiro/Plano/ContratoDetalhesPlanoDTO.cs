using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano
{
    public record ContratoDetalhesPlanoDTO
    {
        public DateTime Incio { get; set; }
        public DateTime Termino { get; set; }
        public AlunoDetalhesPlanoDTO Aluno { get; set; }
        
        public ContratoDetalhesPlanoDTO(DateTime incio, DateTime termino, AlunoDetalhesPlanoDTO aluno)
        {
            Incio = incio;
            Termino = termino;
            Aluno = aluno;
        }
    }
}