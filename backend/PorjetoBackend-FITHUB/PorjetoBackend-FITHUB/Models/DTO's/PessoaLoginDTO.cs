using System.ComponentModel.DataAnnotations;

namespace PorjetoBackend_FITHUB.Models.DTO_s
{
    public record PessoaLoginDTO
    {
        [Required(ErrorMessage = "O campo de cpf é obrigatório")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "A quantidade de caracteres do cpf está inválida")]
        public string Cpf { get; set; }
        [Required(ErrorMessage = "O campo de senha é obrigatório")]
        public string Senha { get; set; }
    }
}
