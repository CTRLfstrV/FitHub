namespace PorjetoBackend_FITHUB.Models.DTO_s.Usuarios
{
    public record AlteracaoDadosResponseDTO
    {
        public string NovoNome { get; set; }
        public string NovoEmail { get; set; }
        public string NovoTelefone { get; set; }
    }
}