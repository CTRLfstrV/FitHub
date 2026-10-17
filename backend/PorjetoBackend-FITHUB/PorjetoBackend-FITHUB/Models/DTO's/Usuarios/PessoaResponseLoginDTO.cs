using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.DTO_s.Usuarios
{
    public record PessoaResponseLoginDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public TipoPessoa TipoPessoa { get; set; }

        public PessoaResponseLoginDTO(Pessoa pessoa)
        {
            Id = pessoa.Id;
            Nome = pessoa.Nome;
            TipoPessoa = pessoa.TipoPessoa;
        }
    }
}
