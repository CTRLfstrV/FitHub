using PorjetoBackend_FITHUB.Models.DTO_s;
using PorjetoBackend_FITHUB.Models.Enums;
using System;

namespace PorjetoBackend_FITHUB.Models.Entities.Usuarios
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Senha { get; set; }
        public int Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public int Rg { get; set; }
        public int Cep { get; set; }
        public int NumeroCasa { get; set; }
        public string Telefone { get; set; }
        public string TelefoneEmergencia { get; set; }
        public SexoPessoa Sexo { get; set; }
        public TipoPessoa TipoPessoa { get; set; }
        public string Email { get; set; }

        public Usuario() { }

        public Usuario(UsuarioLoginDTO usuarioLogin)
        {
            Cpf = usuarioLogin.Cpf;
            Senha = usuarioLogin.Senha;
        }
    }
}
