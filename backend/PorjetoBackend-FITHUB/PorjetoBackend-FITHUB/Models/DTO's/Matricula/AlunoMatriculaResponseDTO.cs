using System;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Matricula
{
    public record AlunoMatriculaResponseDTO
    {
        public string Nome { get; set; }
        public string Senha { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Rg { get; set; }
        public string Cep { get; set; }
        public int NumeroCasa { get; set; }
        public string Telefone { get; set; }
        public string TelefoneEmergencia { get; set; }
        public SexoPessoa Sexo { get; set; }
        public string Email { get; set; }
    }
}