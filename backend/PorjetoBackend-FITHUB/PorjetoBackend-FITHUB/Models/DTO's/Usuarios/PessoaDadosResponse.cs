using System;
using PorjetoBackend_FITHUB.Models.Entities.Usuarios;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Usuarios
{
    public record PessoaDadosResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public DateTime DataNascimento { get; set; }
        public int Sexo { get; set; }
        
        public PessoaDadosResponse(){}

        public PessoaDadosResponse(Pessoa pessoa)
        {
            Id = pessoa.Id;
            Nome = pessoa.Nome;
            Email = pessoa.Email;
            Telefone = pessoa.Telefone;
            DataNascimento = pessoa.DataNascimento;
            Sexo = (int)pessoa.Sexo;
        }
    }
}