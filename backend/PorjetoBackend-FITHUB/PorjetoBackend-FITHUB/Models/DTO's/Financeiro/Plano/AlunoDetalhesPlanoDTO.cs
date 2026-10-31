namespace PorjetoBackend_FITHUB.Models.DTO_s.Financeiro.Plano
{
    public record AlunoDetalhesPlanoDTO
    {
        public string Nome { get; set; }
        public string Email { get; set; }

        public AlunoDetalhesPlanoDTO(string nome, string email)
        {
            Nome = nome;
            Email = email;
        }
    }
}