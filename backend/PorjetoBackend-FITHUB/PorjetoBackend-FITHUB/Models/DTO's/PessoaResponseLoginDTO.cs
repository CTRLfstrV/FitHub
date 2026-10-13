using PorjetoBackend_FITHUB.Models.Entities.Usuarios;
using PorjetoBackend_FITHUB.Models.Enums;

namespace PorjetoBackend_FITHUB.Models.DTO_s
{
    public record PessoaResponseLoginDTO
    {
        public TipoPessoa TipoPessoa { get; set; }

        public PessoaResponseLoginDTO(Pessoa pessoa)
        {
            TipoPessoa = pessoa.TipoPessoa;
        }
    }
}
