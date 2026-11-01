using System;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano
{
    public record ContratoDetalhesPlanoDTO
    {
        public int Id { get; set; }
        public DateTime Inicio { get; set; }
        public DateTime Termino { get; set; }
        public AlunoDetalhesPlanoDTO Aluno { get; set; }
        
        public ContratoDetalhesPlanoDTO(int id, DateTime incio, DateTime termino, AlunoDetalhesPlanoDTO aluno)
        {
            Id = id;
            Inicio = incio;
            Termino = termino;
            Aluno = aluno;
        }
    }
}