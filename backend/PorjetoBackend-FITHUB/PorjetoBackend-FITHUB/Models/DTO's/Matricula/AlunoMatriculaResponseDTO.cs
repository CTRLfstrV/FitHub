using System;
using System.ComponentModel.DataAnnotations;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Matricula
{
    public record AlunoMatriculaResponseDTO
    {
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Senha { get; set; }
        [Required]
        public string Cpf { get; set; }
        [Required]
        public DateTime DataNascimento { get; set; }
        [Required]
        public string Cep { get; set; }
        public int NumeroCasa { get; set; }
        [Required]
        public string Telefone { get; set; }
        public string TelefoneEmergencia { get; set; }
        [Required]
        public SexoPessoa Sexo { get; set; }
        [Required]
        public string Email { get; set; }
    }
}