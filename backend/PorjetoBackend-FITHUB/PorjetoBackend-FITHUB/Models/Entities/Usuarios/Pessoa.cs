using PorjetoBackend_FITHUB.Models.DTO_s.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;
using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Usuarios
{
    public abstract class Pessoa
    {
        public int Id { get; private set; }
        public string Nome { get; set; }
        public string Senha { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; private set; }
        public string Rg { get; set; }
        public string Cep { get; set; }
        public int NumeroCasa { get; set; }
        public string Telefone { get; set; }
        public string TelefoneEmergencia { get; set; }
        public SexoPessoa Sexo { get; private set; }
        public TipoPessoa TipoPessoa { get; private set; }
        public string Email { get; set; }

        public Pessoa() { }

        public Pessoa(PessoaLoginDTO usuarioLogin)
        {
            Cpf = usuarioLogin.Cpf;
            Senha = usuarioLogin.Senha;
        }
    }
}
