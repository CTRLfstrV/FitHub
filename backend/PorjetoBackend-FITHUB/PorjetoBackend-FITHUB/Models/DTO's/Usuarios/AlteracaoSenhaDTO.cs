namespace PorjetoBackend_FITHUB.Models.DTO_s.Usuarios
{
    public record AlteracaoSenhaDTO
    {
        public string Antiga { get; set; }
        public string Nova { get; set; }
    }
}